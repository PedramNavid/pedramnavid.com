---
title: "Deep Dive: What The Heck Is the Metrics Layer"
description: "also known as the semantic layer, previously known as the random queries in my BI tools"
tags:
  - data
  - analytics
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2022-09-14T19:36:06.334Z"
category: data
---

There has been a lot of buzz about the metrics layer. As always, we start with a little trip down memory lane:

In January 2021, Base Case (an investor in what was then the headless BI version Supergrain) explored the future of headless BI as a solution to unbundling metrics from BI. In April 2021, Benn Stencil [made a case for the metrics layer](https://benn.substack.com/p/metrics-layer). In October that year, Drew [opened an issue](https://github.com/dbt-labs/dbt-core/issues/4071) that generated more discussion. In December 2021, the Metrics Layer achieved [keynote status](https://www.youtube.com/watch?v=MdSMSbQxnO0&ab_channel=dbt) at dbt Coalesce (with a long journey through the history of standardization).

Since then, Supergrain pivoted from a headless BI to a marketing tool (ok, _a warehouse-native approach to customer engagement)._ Transform, which was a metrics engine, is shifting toward self-serve BI.

dbt continues development on the metrics layer, later renamed the [semantic layer](https://www.getdbt.com/blog/dbt-semantic-layer/). In October at Coalesce, we’re likely to hear more on the metrics layer, although we’ve [gotten the occasional update](https://docs.getdbt.com/blog/getting-started-with-the-dbt-semantic-layer).

To date, Amit Prakash has done the best job exploring [the metrics layer on Thoughtspot’s blog.](https://www.thoughtspot.com/blog/the-metrics-layer-has-growing-up-to-do) In it, he describes six classes of metrics and three solutions for what a proper semantic layer could look like. I won’t go into all the details since the post already does a great job, and his writing is clear and approachable.

Instead, we’ll go one step closer to code and look at three implementations of the metrics layer and what a world without it looks like.

## The Activation Metric

For the rest of this post, we’ll look at a metric that I think shows the true power of a well-defined metrics layer.

Pretend we’re a B2B SaaS, where users can sign up for our product and belong to one or more workspaces. Each workspace has one or more users. A workspace is active if they perform some activation event within 24 hours of workspace creation.

We’ll call the metric of interest _activation rate_, and we’ll define it as so:

> The _activation rate_ is the ratio of active workspaces to all workspaces over a certain period.

More concretely, every day, we have a list of all workspaces and a flag for whether that workspace was active on that day or not. The count of all workspaces on that day is the total number of workspaces. The count of all workspaces where the flag is _true_ is the count of active workspaces.

We may want to report on the activation rate daily, weekly, or monthly. In addition, we’ll want to know the change in the activation rate over time.

## First, in SQL

Let’s define everything in SQL to get a baseline. We’ll start with a basic table:

```
select reporting_day, workspace_id, is_active from workspace_details;

####

reporting_day | workspace_id | is_active
--------------|--------------|----------|
2022-07-04    | 100          | true
2022-07-04    | 101          | false
...
```

So far, so good. Now let’s count workspaces:

```
select

reporting_day,
count(distinct workspace_id) as n_workspaces,
sum(case when is_active then 1 else 0 end) as n_active_ws

from workspace_details
group by 1

####

reporting_day | n_workspaces | n_active_ws|
--------------|--------------|------------|
2022-07-04    |       2      |         1
...
```

Now, if we want to know the activation rate, we divide active over the total. For simplicity, we’ll pretend we’re using Snowflake, which allows us to refer to columns created in the same select statement.

```
select

reporting_day,
count(distinct workspace_id) as n_workspaces,
sum(case when is_active then 1 else 0 end) as n_active_ws,
n_active_ws / n_workspaces as activation_rate

from workspace_details
group by 1

####

reporting_day | n_workspaces | n_active_ws | activation_rate
--------------|--------------|-------------|---------------
2022-07-04    |       2      |         1   | 0.5
...
```

So far, so good. We could take this SQL, create a dbt model, and then use any reporting tool to visualize the activation rate over time. We can even start looking at change over time. But, first, let’s make the activation rates easier to read with some formatting.

```
select

reporting_day,
count(distinct workspace_id) as n_workspaces,
sum(case when is_active then 1 else 0 end) as n_active_ws,

round(100 * (n_active_ws / n_workspaces), 2) as activation_rate,

activation_rate - lag(activation_rate) over(order by reporting_day) as abs_change,
round(100 * abs_change / lag(activation_rate) over(order by reporting_day), 2) as pct_change


from workspace_details
group by 1
order by 1

####

reporting_day | n_ws | n_active | a_rate|abs_change|pct_chg
--------------|------|----------|-------|----------|-------
2022-07-04    |  2   |      1   | 50.   |    -     |   -     
2022-07-05    |  3   |      2   | 66.6  |  +16.6   | +33.3%   

...
```

We’ve made a ton of progress and haven’t needed to touch a metrics layer, so what’s the big deal? The real pain comes when your stakeholder now asks you for these numbers at a weekly, monthly, and quarterly aggregate. Pain is imminent.

What’s worse is if your end-users don’t understand how these measures are defined, they might start doing silly things like this:

```
select

date_trunc('month', reporting_day) as reporting_month,
avg(activation_rate) as avg_activation_rate

from...
```

Instead of finding the average over a period by adding the individual components and calculating the rate, they might average a ratio and end up with incorrect measures. We don’t want that.

Data Based is a reader-supported publication. To receive new posts and support my work, consider becoming a free or paid subscriber.

## Enter the Metrics Layer

A metrics layer solves these and other problems. Let’s look at how Looker approaches this.

### Looker

![Looker has a syntax-aware UI with a great reference built-in as you code, making the development experience smoother.](https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/e8a7b5b0-2c42-4f1b-b89c-67fb86dc0092_822x660.png)

In Looker, we define metrics in LookML files. We have a view, which represents a model of data, usually built from an existing table or view in the data warehouse. Here’s what that might look like:

```
view: workspace_activation {
  sql_table_name: "METRICS"."WORKSPACE_ACTIVATION"
    ;;

  dimension_group: date {
    type: time
    timeframes: [
      raw,
      time,
      date,
      week,
      month,
      quarter,
      year
    ]
    sql: ${TABLE}."REPORTING_DATE" ;;
  }

  dimension: is_active_workspace {
    type: yesno
    sql: ${TABLE}."IS_ACTIVE_WORKSPACE" ;;
  }

  dimension: workspace_id {
    type: string
    primary_key: yes
    sql: ${TABLE}."WORKSPACE_ID" ;;
  }

  measure: count_workspaces {
    type: count_distinct
    description: "# of Workspaces"
    sql:  ${workspace_id} ;; 
    filters: [workspace_name: "!='Demo Workspace'"]
  }

  measure: count_active_workspaces {
  type: count_distinct
  description: "# of Unique Workspaces Active within 1 Day"
  sql:  ${workspace_id} ;;
  filters:  [is_active_workspace: "yes"]
}


  measure: activation_rate {
  type:  number
  sql:  ${count_active_workspaces} / ${count_workspaces} ;;
  value_format_name: percent_1
}


}
```

A lot is going on here, but the thing to notice is that we are defining measures as formulas, not as fully-formed SQL tables. We also specify what formatting to use on measures, how to drill into the details when going from aggregate views to detailed views, how to aggregate measures, and all the ways we want to break down our reporting date.

From this code, Looker can dynamically generate the SQL needed without us having to worry about different granularities.

We could go further and start defining joins between this table and other tables, for example if we wanted to break down workspaces by paid vs. not-paid or attribution category.

Without a metrics layer, we’d have to anticipate and perform all these joins upfront. With a metrics layer, we can specify relationships between tables and let the BI tool join as needed, only on the columns the user requests. As a result, our users never need to consider what types of joins to use.

## dbt Metrics

Let’s try and do the same with the dbt metrics layer to understand better what we’ve got. The big caveat is that dbt metrics are not yet complete and are undergoing active development. So things may change, and rough edges might need time to polish.

We’ll first define our metrics in the dbt yml file:

```
metrics:
  - name: count_workspaces
    label: '# Workspaces'
    model: ref('active_workspace')
    type: count_distinct
    sql: workspace_id

    timestamp: reporting_day
    time_grains: [day, week, month]
    filters:
      - field: workspace_name
        operator: '!='
        value: 'Demo Workspace


  - name: count_active_workspaces
    label: 'Active Workspaces'
    model: ref('active_workspace')
    type: count_distinct
    sql: workspace_id

    timestamp: reporting_day
    time_grains: [day, week, month]

  - name: activation_rate
    label: 'Activation Rate'
    type: expression
    sql: " 100.0* {{ metric('count_active_workspaces') }} / {{ metric('count_workspaces') }} "
    
    timestamp: reporting_day
    time_grains: [day, week, month]
```

And we’ll create a model that allows us to select from these new metrics:

```
select * from 
  {{ metrics.calculate(
   [metric('count_workspaces'), metric('count_active_workspaces'), metric('activation_rate')], 
    grain='week',
  )}}
```

There are a few key things to note here. In the Looker model, the organizing principle was a View, which contained dimensions, measures, and time-grains all within one namespaced View object. dbt took a different approach: metrics are self-contained units. Each metric must specify which dbt model it should run against, the timestamp column, and which time grains to support.

This approach is already leading us to some duplicated code for the three metrics above.

Another point to consider is the expression metric. We can’t refer to a metric there but need to wrap it in jinja, leading to jinja in YAML, which can be a parsing nightmare without a good IDE. While Looker’s IDE can parse, highlight, and show errors within your LookML code and expression, we don’t have that level of tooling for dbt.

You’ll also note that I am defining how to query my metrics within dbt using the dbt\_metrics macro. For now, there’s no support for reading these metrics outside of dbt itself, although dbt has partnerships with BI tools, and I expect they’ll be announcing better ways to interact with dbt’s metrics layer soon enough.

Filtering is more clunky. In Looker, we provide an array of expressions to filter on, while in dbt we build our filters as yaml, explicitly defining what operator to use.

One final observation: there is no support for joins. In Looker, you can define relationships between different tables and explicitly define which related views should be available to a user within an Explore. Until support for joins arrives in dbt, it’s hard to see any value in an isolated semantic layer.

### Lightdash

![In Lightdash, the presentation layer is separate from the code. The UI is intuitive and easy to navigate, but changes to it require changing your dbt model code.](https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/9fbf4f60-22b9-4821-aa70-3a884c461415_1281x929.png)

Lightdash is a BI tool that is tightly integrated within the dbt ecosystem. It offers two ways of expressing metrics: the first uses the native dbt metrics layer we discussed above. But beyond that, it also has a metrics implementation that you can leverage, which has some added benefits, such as joins and formatting.

Like dbt, you add your metrics implementation directly in your dbt yml file. However, the structure is a little different. The metrics are specified in a meta tag underneath the column. You can define multiple metrics related to a column in-line, and there is no need to duplicate dimensions across metrics.

```
version: 2
models:
  - name: active_workspace
    columns:
      - name: reporting_day
        description: "Day of report"
        meta:
          dimension:
            type: date
      - name: workspace_id
        description: "The Id of the workspace"
        meta:
          metrics:
            count_workspaces:
              type: count_distinct
            count_active_workspaces:
              type: count_distinct
              sql: "case when is_active then workspace_id else null end"
            activation_rate:
              type: number
              sql: (1.0 * ${count_active_workspaces} / ${count_workspaces})
              round: 2
              format: percent
```

We also have convenient helpers for rounding and formatting numbers. The templating is simplified, and there’s no reliance on dbt ref macros. We can directly specify a metric using the `${metric_name}` format.

There are some downsides to the integration with dbt. Namely, any change to your metrics requires a full dbt refresh, which can be slow. There’s also the question of where a metric belongs: not all metrics should live under a particular dbt column definition; perhaps a separate metric definition file could be more maintainable long-term.

That said, the reporting is simplified quite a bit. It’s easy to query the metrics using the Lightdash UI, and there’s no need to write custom code to fetch a metric. But then, your metrics are only accessible within Lightdash, although this could be alleviated with APIs that make metrics more accessible beyond just Lightdash. Given the open nature of the product, I wouldn’t be surprised if metrics became more accessible over time.

## What it all means

All three tools have different trade-offs, and their strengths and weaknesses tell of the challenges a metrics layer faces. Looker deeply integrates its metrics layer within the Looker ecosystem. Dimensions and measures are defined within the same application, and Looker’s semantic understanding of LookML allows for a rich parsing and developer experience. Looker can write to Git for version control, but most development occurs within the Looker ecosystem.

Despite its strength, there are also pitfalls. Measures defined within Looker are not easily accessed. While Looker exposes an API, we haven’t seen it become a standard metrics layer across the data stack, perhaps because the high entry price makes it prohibitive for smaller companies.

That said, a well-configured Looker instance can reduce the burden on data teams. Providing access to views your end-users can query without relying on data teams whenever you need just one more column can be powerful. That power has led to increased interest in a universal metrics layer solution.

With dbt, it’s clear that they are trying to stake their place within the data ecosystem as a natural fit for a universal metrics layer. Much of the modern data stack already integrates with dbt, and dbt is widely adopted and available to nearly any data team. However, dbt is also moving toward a cloud-based and server-based model, and full adoption of the metrics layer will likely involve some subscription requirements.

Pricing aside, the real challenge with dbt is delivering an ergonomic and performant solution. The current jinja/yaml-based definition of metrics, the lack of any significant development tooling, and a gap in features that would make it broadly applicable are still outstanding questions. 

Since it’s been announced, there has been very little news, although there’s still active development. Just last week, dbt changed the API by renaming some fields. Unfortunately, this active development also makes it difficult to recommend. Without stability, data teams will not likely want to develop against it.

Lightdash is in an exciting place as well. In some ways, they are trying to integrate with dbt and find a way to develop their own metrics definitions apart from it. Too much reliance on dbt can bring challenges, especially as there’s no clear roadmap on where the metrics layer will be going. On the other hand, saving your metrics definition next to your dbt code can have a lot of ergonomic benefits. The outstanding question is whether other apps can leverage the metric definitions. If not, Lightdash may approach Looker-status, another BI silo for metrics.

So the real question I have is this: **Can a metrics layer be universal enough to gain applicability across the data stack yet still be designed in such a way to be relevant to BI tools?**

We are still ways off from having an answer to that question, but I’m excited to see how we get there.

Thank you for reading Pedram's Data Based. This post is public so feel free to share it.

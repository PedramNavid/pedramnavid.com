---
title: "The Future of Data"
description: "Everyone wants a piece of the pie; no one wants to bake "
tags:
  - data
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2023-05-21T20:53:02.083Z"
category: data
---

I’ve been thinking about a few things in the back of my head for a few months now, and I think it’s time to draw them out. I’ve been spending the last year doing a lot of data consulting and advisory work, whether it’s implementations, migrations, and modeling work; or, on the advisory side, working with data companies.

With this, I’ve started to develop three theories that I will share today on what I think the future holds for data: how ops will learn from data, the multiplication of semantic layers, and the single biggest problem data teams will continue to face.

Let’s dive in.

Pedram's Data Based is a reader-supported publication. To receive new posts and support my work, consider becoming a free or paid subscriber.

## Ops Teams Finally Get Some Love

For the past five or so years, Data Teams have proudly learned lessons from software engineering, much of this kicked off by dbt’s introduction to data teams. We’ve learned about version control, CI/CD, configuration as code, automation, commit checks, and more. As a result, data teams have become better at managing the complexity of operating on data. Great job, everyone. I’m so proud.

Now, it’s time for ops teams to learn from data. Unfortunately, I often think of ops as the forgotten stepchild of data. In many ways, ops teams are just data teams with worse tools and more chaos. Yet, in the best organizations, I’ve seen ops and data teams work closely together to enable each other.

Ops teams work across various functions, including marketing, sales, revenue, finance, and facilities. What they all have in common are workflows driven by data that are primarily manual, annoying, and slow. Work occurs predominantly in spreadsheets, extracts to CSVs, in the Salesforce UI, and manual uploads and overrides. None of it is validated, verified, or version-controlled.

This is starting to change. Emilie Schario is building [Turbine](https://www.helloturbine.com/about), which offers a fresh take on procurement, inventory, and supply chain management. [Savant Labs](https://www.savantlabs.io/) is creating a cloud-native automation platform for analysts. [Zamp](https://zamp.com/) is automating sales tax compliance. [Latern](https://withlantern.com/) is automating forecasting and churn reporting to enable CS teams to understand their customers better.

What these and other companies all have in common is a focus on bringing the best of data capabilities to teams that are traditionally underserved.

What’s clear to me is that now everyone is a data person. Whether it’s someone in success, marketing, finance, or sales: everyone is working with data, and so much of the data work in companies is happening outside data teams.

While data teams are still invaluable in building data assets and products, the work does not end there. Those data products become the fundamental building blocks on which other teams understand, forecast, and grow their business. I’m excited about what the future holds for these teams.

## One Semantic Layer to Rule Them All

Just kidding. That won’t happen. To be clear: I want one semantic layer, and conceptually I love the idea of a semantic layer living close to my transforms and only having to define revenue once, in one place.

A place where every downstream tool can ingest capital-T Truth and finally fulfill all my dreams: a single-source-of-truth and self-serve analytics.

I can sip margaritas on the beach knowing that my VP of Finance will never report a wrong number again.

While the dream is beautiful, we need to consider that the one product that cares the most about semantic information is not dbt but BI tools. Tools like Looker, Holistics, or Lightdash all have a semantic layer not because they want one but because they need one.

The unlock of a semantic layer is clear: you can scale out a data team by enabling self-serve analytics. The problem is that these tools, and other BI tools, depend on the semantic layer to build their product and roadmap.

While some tools may be happy to put their hat in the dbt Cloud Semantic Layer, I think there’s an obvious issue: 1) it limits their customers to only those who are on dbt Cloud and 2) it puts their product roadmap in the hands of another company.

If you had a BI solution and had to rely on another company approving a PR to ship a feature, would you be okay with that?

This is, I think, the fundamental problem of semantic layers.

There are, however, some interesting alternative approaches to this space. For example, [Honeydew](https://honeydew.ai/) is building a semantic layer middleware that can be consumed directly from the warehouse, obviating the need for integrations with another tool’s semantic layer. Any application that can read from the warehouse can read semantic information.

[Julian Hyde’s work on Apache Calcite](https://www.datacouncil.ai/talks/cubing-and-metrics-in-sql?hsLang=en) aims to bring metrics directly into SQL, with the long-term hope of standardizing how we express metrics and storing them in the warehouse outright. [Malloy](https://www.malloydata.dev/) is an alternate take, a new open-source language for expressive data modeling.

Will any of these solutions win? If I were to bet, even five years from now, they’ll all be around, along with other half-dozen new ideas, and we’ll be no closer to a single standard than we are today. Sorry.

## The Single Biggest Problem Data Teams Face Today

It does not know how to measure data teams. It’s not managing various vendor contract renewals and negotiating discounts. It’s not trying to figure out how to deploy that Python script. It’s certainly not something I’ve seen any solution or vendor offering in this space, but it’s pervasive, all-encompassing, and full of toil and dread.

It’s business logic.

![It’s one metric, Michael; how many tables could it need? Photo courtesy Taylor Murphy.](https://substack-post-media.s3.amazonaws.com/public/images/d3e786ec-5f0f-4dd0-b366-31c0ccc2e228_1642x1512.jpeg)

Maintaining and understanding is the most challenging part of any data pipeline. We attempt to document it in yaml or a data catalog, but the code is the only accurate documentation of business logic.

Take a concept as simple as ‘lead source.’ All you need to know is, for a lead, where did it come from. Well, first, we need to define a lead. Marketing might have one definition, and sales might have another. Once you have a lead, you need to identify its source. Again, the rules vary depending on who is asking.

Marketing might have rules based on priority and a rolling window. Did you get the email from an event, webinar, or ebook? What if they did two activities? Which one counts? Sales might have their questions: did it come from a partner? Was it part of an outbound email campaign? An SDR? A business card found on the ground that you cold-called?

The rules for how you classify this lead are constantly changing. In addition, the data you collect to classify it is never clean. They are removing Gmail accounts, cleaning up fake data, and stitching pieces together from various source systems. All these data flow issues are the core parts of data pipelines we seldom discuss.

They’re also the core models that drive all the metrics and measures downstream.

When someone asks you to explain how we calculate churn, you could direct them to documentation that explains how churn is calculated, but the true definition of churn isn’t in the documentation; it’s in the DAG of transforms, filters, conditions, aggregations and more that occur step-by-step to take a sequence of events, invoices, subscriptions, payments, and constants into a monthly view of reported churn.

This complexity is why column-level lineage demand and appeal are ever-growing. Understanding how this number came to me means understanding the web of inputs that led to it.

Over time the cruft adds up. There’s data from the previous migration, the random spreadsheet from an experiment that needs to be accounted for, test accounts, wrong ids, and corrections upon corrections.

What do we have to manage this complexity? At best, some modularity, but the fundamental complexity hasn’t been managed; it’s only been transformed.

Data mesh is, in some ways, the admission of defeat in the face of complexity. The demands of teams are so complex that we must break apart the whole thing into smaller, more manageable chunks. Sales get their metric, and Marketing gets theirs. When someone asks why the numbers don’t match, we tell them that they don’t match because they are different.

Reconciliation is impossible. The quantum theory of data states that you may not understand and measure a metric with perfect accuracy. You may understand but not measure, measure but not understand, or measure and sort of understand. These are the only states we know.

The other option is forcing stakeholders to make tough decisions about simplifying their requests; that’s a dream we can all have. We can stare into the abyss and demand that the pit of despair leave us be; that the dread and anguish of staring into 500 lines of SQL that somehow define what customer is be ridden from our lives. We may reject the Sisyphean rock-pushing of model-building for now, but the rock will remain steadfast in its place. We may decide to quit data altogether and see what those software engineers are up to—they seem much happier.

But we wake from our dream. The data remains a mess. The stakeholders remain impatient. The work never ends, and we press on—one reconciliation at a time. The numbers are different because they are not the same. The numbers are different because they are not the same—the numbers.

The numbers.

The horror.

![Apocalypse Now | National Review](https://substack-post-media.s3.amazonaws.com/public/images/6c898466-e99a-4661-8af2-c8bbfe054295_600x350.jpeg)

Until next time, happy model building.

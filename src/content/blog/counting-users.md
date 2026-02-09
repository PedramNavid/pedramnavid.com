---
title: "Counting Things: Counting Users Part 1"
description: "one of the easiest things to define"
tags:
  - data
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2022-07-23T22:45:16.720Z"
category: data
---

This is a new series as part of my promise to write more in-depth content for people who care about data. Every \[irregular interval\] I will cover a metric that we all know and love and go deep on it. The goal is not to just define metrics, but show the thought-process that can go into them. If you’re a data practitioner, I hope you’ll learn something new. If you work with data practitioners, I hope you learn the value that data teams can bring to an organization.

---

It’s a question as old as time: how many users we do we have? Well, that depends on what you mean by ‘users’, and ‘we’, and ‘have’.

If I were to press you to define them, you might have a few definitions for each. For example,

A user is:

-   Someone who visited our website, or
    
-   Someone who has logged in to our application
    
-   Any account or customer within our CRM
    

We might mean:

-   All the teams at our company
    
-   Anything that the marketing team is responsible for
    
-   Anyone that sales knows about
    

Have could mean:

-   The number of users we have today
    
-   The number of users we’ve ever had
    
-   The number of users we’ve had on a given day, at that point in time, and subsequently into the future
    

Let’s dig into the first one for now. We’ll return to the second one later.

## How many people visited our website?

Let’s take the first one: how do you know when someone visits our website? Well, we have event tracking, so our event tracker can tell us when someone views any of our pages. But what data does an event tracker provide? Let’s take [Rudderstack’s standard schema](https://www.rudderstack.com/docs/destinations/warehouse-destinations/warehouse-schema/#standard-rudderstack-properties) and explore it further. When you save their data to your warehouse, you get something like this:

-   anonymous\_id: The user’s anonymous ID
    
-   event: the name of the event
    
-   context\_ip: The IP address of the device
    
-   context\_<props>: Additional properties on the event
    
-   id: the event’s unique id
    
-   url / path: the URL and path where the event was captured
    
-   timestamps: various timestamps with slight nuances that don’t matter here
    

It seems we’re in the clear. If we want to know how many people visited our website, we can just[1](#footnote-1) count the distinct number of anonymous IDs. This data stuff is easier than you think!

But, let’s push our curiosity out a little more. What..is an anonymous id? Well, we don’t have to go very far to find out. Rudderstack is open-source so we can [find out for ourselves.](https://github.com/rudderlabs/rudder-sdk-js-autotrack/blob/0e249fc65b4f36646047dacf9462cf2fb65fd2b8/analytics.js)

![](https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/09cafd56-ce17-46db-9807-7b461bf54569_637x443.png)

In here, `storage` refers to the device’s local storage where cookies are saved. If the ID already exists, then your anonymous id is what it was previously. But if not, then [Rudderstack will generate one for you](https://github.com/rudderlabs/rudder-sdk-js/blob/480d37d3dc1119de42c13fbbb3e836f967236fc8/utils/utils.js#L37) and save it to your cookies.

Interesting, so if you clear your cookies, then you get a new anonymous id. If you use a different browser, you get a new anonymous id. If you use private mode, you get a new anonymous id. If you use a different device, like your laptop, your work laptop, or your phone, then you get a new anonymous id. And with the war on cookies from Safari and Firefox, this problem is getting worse. Turns out one person can have many different anonymous ids.

Well, what about the IP address? Couldn’t we just use that to dedupe? Let’s think a bit more about that one too. How do devices get an IP address? Let’s not dive too deep, but from a router. But multiple people connect to the same router. Especially at work, or at school, or at the airport, or on public wifi. We could have many, many different people all on the same IP address.

Wow, maybe counting things isn’t so easy after all?

So what do we do? _Well, in the absence of the right answer, we often have to make do with a good enough answer._ Let’s say that when we count visitors to our website, we will count the distinct anonymous ids, knowing full well that that number over-inflates the true number of people visiting our website.

Our final code might look something like this

```
select count(distinct anonymous_id) from events;
```

Liking what you read? Data Based is only possible because of the support of subscribers. To receive new posts and support my work, consider becoming a free or paid subscriber.

### How many net new people visited our website every week?

Okay, so we know how many ‘people’ visited our website. But that’s not actionable data. Is 20,000 good? Is 50,000 bad? What we almost always want with analytics is understanding change over time.

The first question to ask is what time-grain should we break down our data over time? We can count the number of users every minute, hour, day, week, month, or year.

Picking the right time-grain is context-dependent, but the choice revolves around having enough time for the noise to level off but not so much time that the results are not actionable. Also consider how often you will look at the data. Looking at data daily or more frequently than that is not healthy, or good for the soul, and I’m all about making sure you’re living a healthy, happy life.

Daily data is subject to fluctuations based on weekends and holidays. Monthly data is smoother, but it lacks immediacy. Do you want to wait 20 days to find out your website broke on the 10th? Let’s go with weekly, it smooths out the weekends and provides a nice balance.

The simple approach to counting people by week might look something like this:

```
select 

date_trunc('week', timestamp) as week, 
count(distinct anonymous_id) as visitors 

from events
group by 1
```

What we end up measuring here is the number of unique visitors to our website, every week. If Pedram and Claire both visit the website every week, but no one new shows up, well have a steady rate of 2 weekly users. Fine, but not exciting enough.

What we’re interested is how many new people are we bringing into our website. We want new people joining so we can create a healthy top-of-funnel pipeline to drive our marketing and sales motions. Without new people visiting, we’ll run out of sales, our company will die, and we will be sad forever. We’re all about happiness here.

So instead, let’s find out when we first saw a user:

```
select

date_trunc('week', timestamp) as week,
anonymous_id,
row_number() over(partition by anonymous_id order by timestamp) as event_date_index

from events;
```

This cute little row\_number function does nothing more than count from 1 all the way down until there are no more rows. But, the magic is in the partition. A partition is nothing more than a group, so we’re asking our little function to count the number of times every user visited our website, from the 1st time, to the last time (we ordered from oldest visit to newest, but could also have done it in descending order with `order by timestamp desc`)

Now we can do something fun. We can find the first time a user visited our website by filtering that previous query.

```
with numbered_events as (
  select

  date_trunc('week', timestamp) as week,
  anonymous_id,
  row_number() over(partition by anonymous_id order by timestamp) as event_date_index

  from events
)

select 

week, 
count(anonymous_id) as new_visitors

from numbered_events
where event_date_index = 1
group by 1
```

We use a CTE[2](#footnote-2) because we can’t filter on `row_number` using WHERE or HAVING[3](#footnote-3)

So we answered our first question and dug into it a little bit. We have a better sense of the limitations of the data, and why it’s hard, but that doesn’t mean it’s not useful. Every week we can keep an eye on our overall users and see how it is trending. We might even take our models further and use things like the referrer and UTM parameters to better understand not just how many users we have, but where they come from! On to our next question.

### Next Time: How Many People Use Our Product?

Now that we’ve solved the first question, in our next one we’ll dig into our product itself. There, our users have authenticated, so counting should be easier. But we might end up with some more interesting questions, like how many of them use our product every day?

Did you enjoy this post? Do you have ideas for future metrics to cover? Maybe you think Cohort Analysis is something you’ve always wanted to learn more, or you think there’s nothing hotter than a well-defined activation metrics. Well, leave a comment or [drop me an email!](mailto:pedram@pedramnavid.com)

Thank you for reading Data Based! If you enjoyed this post, it would mean a lot if you shared it!

[1](#footnote-anchor-1)

Whenever I use the world _just_ to show how easy something is, the thing I’m describing is actually really hard.

[2](#footnote-anchor-2)

A CTE, or Common Table Expression, is a way of taking a snippet of SQL, putting it in a little metaphorical box, and giving it a name so you can reuse it later.

[3](#footnote-anchor-3)

We can use QUALIFY in Snowflake, but not every database supports that function.

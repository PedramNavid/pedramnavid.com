---
title: "For SQL"
description: "or: Why I'm so over-protective of my data people"
tags:
  - data
  - sql
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2021-07-12T03:15:36.239Z"
category: data
---

It seems once again SQL is dead. Some of us remember when NoSQL promised to unchain us from the burdens of SQL. We saw MongoDB, Redis, DynamoDB and others emerge as SQL killers. People flocked to these solutions, but then soon realized that maybe they do care about things like [consistency, ACID-transactions, and not losing all your data.](https://twitter.com/MBeugnet/status/1253622755049734150) Perhaps SQL did not die then, but there will always be others who try to kill it. It seems this is one of those times.

So goes [Jamie Brandon’s manifesto against SQL](https://scattered-thoughts.net/writing/against-sql/). In it, he argues that SQL is bad and is so bad that it affects the entire industry. SQL’s problems boil down to its inexpressiveness, incompressibility, and non-porousness. My goal isn’t to refute his points, but if your concerns with SQL are that it lacks Union Types, and that pandas and Flink are models that we should strive toward and not run away from then at the very least, Jamie and I have very different views of the world in which SQL operates.

I don’t doubt that there is a world where

```
churn[['State','Score']].groupby('State').mean().sort_values(by='Score', ascending=False)
```

is more useful than

```
SELECT state, AVG(score) 
FROM churn 
GROUP BY state order by score;
```

But there are many worlds where the latter is more than just fine. Much of Jamie’s arguments are against parts of the language that almost no one interacts with, and the rest has some pretty great solutions in place already. I’ve never once cared that I could not write:

```
select x2 from foo group by x+1 as x2;
```

And while he makes some valid cases when it comes to composability, tools like dbt have helped bridge that gap bringing the power of jinja templating to SQL, while enabling the ever-loved DAGs that powers every warehouse worth its weight.

When I see these arguments against SQL, and they pop up now and again, they’re almost always from software engineers and from a strictly software engineering lens. My worries with articles like this are not, to be clear, that SQL will die. SQL will live on long after I am gone. My real fear is that it discourages people from learning SQL and that it makes those whose primary language is SQL feel inadequate.

There’s a persistent unspoken aura in software engineering around data in general. An almost class-divide between ‘Software Engineering’ and ‘Data People'. Data Engineers, Data Analysts, Data Scientists, Analytic Engineers: I’ve seen too often the othering and second-classing of these roles. A fact all the more troubling when you consider that us data people tend to be more diverse and less male-dominated (and generally more fun to be around). I also sense a serious anxiety in those in the field who haven’t come from traditional software engineering backgrounds; often second-guessing themselves and downplaying their own skills and capabilities. Imposter syndrome seems almost the dominant trait amongst everyone I talk to.

It doesn’t help when articles like this come out and rise to the top on Orange Sites. It perpetuates that myth that data analysis is a second-class skill, inferior to the real hard computer science of software engineering. I’ve seen these software engineers, and let me tell you, if they cared about their craft at least as much as data people cared about their analyses, we’d have better software.

The truth is data is hard. The ecosystem is hard. Data is messy. It’s hard to test. We haven’t figured out the right tooling, the right debugging, the right environments, or even the right way to teach it.

Getting something like dbt, a data warehouse, and python running isn’t trivial. There’s still no great interface for getting a volume of data into a warehouse. Even if you manage to get Docker and Postgres running locally, good luck creating tables and seeding a database just to start playing around.

Testing is still an unsolved problem. Tools like Great Expectations help, but they only really cover data after the fact. We still have ways to go when it comes to figuring out how to unit test smaller portions of our code, or how to properly test integrations without mocking half a library.

It’s all a massive work in progress and the work is not any less important than building a website, a backend application, or infrastructure. You only need to look in the dbt #jobs-posting slack to see how many companies are trying to fill roles for analysts and data engineers to help solve critical business problems related to data. The level of sophistication and tooling over the past few years has exploded, as has customer expectations of personalization. All driven by data.

The people who do the work are not any less skilled. And the tools and languages they use are not any less useful because they don’t have features of other languages. A good analyst is worth their weight in gold. They’re ruthless in their precision and excellent communicators. They’re empathetic to the business and have endless curiosity. Data people are some of the smartest, kindest people I’ve met.

So, while there might be people out there Against SQL, know that there are many of us who are very much For SQL. And the world is better for it.

**Thanks to our sponsor!**

**[Hightouch: Making Your Data Warehouse The Source of Truth for Customer Data](https://hightouch.com)**

Your data warehouse has all your data. Why stop at analytics? Hightouch operationalizes your data warehouse by empowering you to sync data to any SaaS tool with just SQL.

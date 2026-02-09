---
title: "Building The Modern Data Team"
description: "or: The Importance of Being Earnest"
tags:
  - data
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2021-05-24T05:36:25.146Z"
category: data
---

_edit: since writing this, there have been \*a lot\* of responses. The most important one is probably from [Jerco on the product vision](https://github.com/dbt-labs/dbt-core/blob/main/docs/roadmap/2022-05-dbt-a-core-story.md) and [this response by Tristan](https://roundup.getdbt.com/p/the-response-you-deserve)._

---

We have heard a lot of talk lately of the Modern Data Stack, it has gained a lot of buzz and attention as companies have begun a fundamental shift in how they think about analytics. Scalable, managed data warehouses have made it easy to get started with an analytical database, and tools like dbt have made it easy for analysts to manage the complexity of their business within a version-controlled environment using the power of SQL and templating languages. The number of job postings for analytic engineers continues to grow as companies demand more sophistication from their analysts. But while the architectural questions seem largely on their way to being answered, one question that remains open is how to build effective data teams.

### The Step After Structure

Emily Schario and Taylor Murphy argue that [data teams should be run like product teams.](https://locallyoptimistic.com/post/run-your-data-team-like-a-product-team/) This model suggests that if we can think of data as a product that we deliver then the teams that help build this product can think of themselves as a product team. There’s good advice on being user-centric, being empathetic, practicing effective communication, and perhaps more controversial advice on developing features by focusing on user stories. Pardis Noorzad made a similar argument for a [Product Data Science Model](https://djpardis.medium.com/models-for-integrating-data-science-teams-within-organizations-7c5afa032ebd), suggesting that the hybrid approach offers better accountability and speed by having the data scientists be embedded within the product teams, but reporting to a central data science management team.

The reality, however, is that even product teams can be highly dysfunctional. While I largely agree about how teams should be organized, there’s still the outstanding question of how to make these teams, however organized, effective.

A larger, more insidious problem is not how we organize our teams, but something more fundamental. How do we, as an organization, decide what to work on, how to prioritize work, and how do we describe that work to those that will do it? For the last decade or two we’ve answered this question with the vague pretense of something called Agile.

Admittedly, I would not be the first person to suggest that the root of all evil lies within Agile and Scrum, and that [together they should really be put to death.](https://siliconangle.com/2020/02/03/agile-software-development-dead-deal/) Agile purports simplicity when it reality it belies laziness. The myth that we have been sold is that complexity can be wrapped up in a two-week window, and the real hard work of thinking deliberately about a difficult problem can be summarized in a simple sentence beginning with the words: as a user…

### The Real Product Problem

The real problems facing organizations when it comes to dealing with the messy world of data is first, how do we decide what to work on? The Product Manager has often become the role de jure for answering this question. What this often looks like is a series of stakeholder meetings where different teams vie for the resources of the data team, negotiations take place, and a set of priorities emerge that are passed down to a data team to complete.

Another problem is deciding on what the actual work entails. Too often, gathering requirements beyond asking what someone wants and when they want it by is rarely done. Instead, those performing the work are expected to ‘scope out’ tickets: an exercise in pulling teeth. Attempting to ask for requirements upfront is not the Agile way — that’s the old way of doing things, the Waterfall way, and not even stodgy banks want to be associated with anything so ancient. The expectation lies on the engineers and analysts to figure out the details. This might work for changes in a website (although even that is debatable) but it rarely works for complex data-related tasks where ambiguities and nuances are the norm.

### _Happy data teams are all alike_; every unhappy data team is unhappy in its own way

The result? A team of unenthusiastic hapless analysts delivering faster horses: dashboards that sit unused, decision-driven report making, wider tables. This unsustainable effort eventually leads to attrition, at least for those highly-motivated, bright individuals who are looking for something more. Left behind are those who either can’t leave, or are fine with mediocrity. [This is also not a novel theory.](https://multithreaded.stitchfix.com/blog/2016/03/16/engineers-shouldnt-write-etl/)

What went wrong? I believe the core issues center around a lack of proper ownership and accountability. If you want a team of excellent engineers to stick around, you need to empower them to contribute. The best engineers I’ve worked with care deeply about the business and product, and nothing frustrates them more than being separated from the process that takes business outcomes and creates work.

To be clear, they’re rarely asking for veto rights over what to work on, and are not chasing pet projects for the sake of resume building. (If your data teams **do** look like that, the bigger question you need to ask yourself is what led you down a path of hiring that team? If you need help answering that question, start by looking at the diversity of your team. I bet you’ll find some insights quickly.)

What they are asking for is a seat at the table. This doesn’t mean every engineer needs to be involved in every planning meeting, but it does mean your engineers should be around when planning occurs. They may have concerns about feasibility, there may be significant drawbacks to a complex design that can be mitigated by a simple one, there may be competing priorities that have yet to be addressed, they may have better ways for solving the business problem than adding columns to an Excel spreadsheet, or they may just think we’re working on the wrong set of problems. They could also very well be wrong, but at least they are present, and engaged.

One might argue that this is the role of the engineering manager. But the reality is that good engineering managers are difficult enough to find, many team don’t have them, and others lose them as quickly as they can find them. Engineering Managers and Product Managers both should be there to help fill out the details, but their presence is no excuse for the exclusion of those ultimately responsible for delivering the work.

Apart from planning, the other elephant in the room is that no one wants to write requirements, but someone has to write the code. This means that the requirements gathering and building falls on the lap of the engineer. Stakeholders too often fail to sit down and do the hard work of writing down what they’re trying to accomplish, how they will measure it, and why they think it’s important. Instead, they’ll ask for a report on attribution and the analyst will need to spend the bulk of their time doing data discovery and requirements gathering.

How do we determine attribution? What level of accuracy are we comfortable with? What will we do with the data? How exactly will we analyze it? What does it mean for a sale to be attributed to a marketing campaign? How will the results of this analysis affect decisions that we hope to make? What is the fundamental value of delivering this product? These are the real questions we need answered, and the problem is the agile manifesto doesn’t allow for any real way of answering them up-front. Instead, we get: as a user, I want a report on marketing attribution so that I can know which channels are the most effective, followed by meetings to force those wanting the work done to participate in spec’ing out their work.

There is an alternative: first, do away with Agile altogether. It is a false prophet whose only real output is a measure of velocity that number-crunchers can use as a barometer of a team’s efficiency. Instead, take a lesson from frameworks such as Kanban: we already know teams have a certain capacity for work, we also know that priorities need to change. Good team are comfortable with both of these. As the need for new work arises, get the team involved early, have open discussions with them about the existing work, and how to prioritize new work against the existing backlog. Don’t accept new work without addressing the existing bottlenecks, and don’t accept new work without requirements. If a stakeholder is not able or not willing to answer the hard questions about why they want something done, then the work is either not clear enough or not important enough for a data team to work on.

Finally, sit down with your team and talk to them. Ask them how they would like to operate, and what they need to be successful. I’ve yet to hear anyone long for another sprint retro, or more grooming sessions. But you might be surprised by what you hear.

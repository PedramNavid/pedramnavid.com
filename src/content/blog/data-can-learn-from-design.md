---
title: "What Data Can Learn from Design"
description: "or what Pedram learned from Figma"
tags:
  - data
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2021-09-22T16:22:38.497Z"
category: data
---

We’ve seen an explosion of software engineering practices take over the data landscape. [We’ve started using version-control](https://docs.getdbt.com/docs/guides/best-practices), [we write tests against our models](https://github.com/calogica/dbt-expectations) to assert our expectations of behavior, [we use containers to help isolate our data products environments](https://discourse.getdbt.com/t/a-containerized-dbt-environment-for-your-team/2340), we’ve even discussed [running data teams like product teams.](https://locallyoptimistic.com/post/run-your-data-team-like-a-product-team/)

We’ve come a long way, but in many ways, I can’t help but feel something is still missing. It wasn’t until I read Kevin Kwok’s [excellent review of Figma’s success](https://kwokchain.com/2020/06/19/why-figma-wins/) that things started to click. We’ve spent a lot of time talking about what data needs to learn from engineering, but there’s also another discipline that we could benefit from: design.

To be clear, this isn’t an original thought. 40 years ago, in August of 2018, [Hilary](https://twitter.com/hspter) and [Roger](https://twitter.com/rdpeng) of [Not So Standard Deviation fame started reading](https://nssdeviations.com/63-book-club-part-1) [Nigel Cross’s book on Design Thinking.](https://www.amazon.com/Design-Thinking-Understanding-Designers-Think/dp/1847886361/ref=sr_1_1?ie=UTF8&qid=1534177880&sr=8-1&keywords=design+thinking+Nigel+cross) Her talks on [Design Thinking and Data Science](https://www.causeweb.org/cause/ecots/ecots20/keynotes/hilary-parker) are worth spending some time with.

In her talk, she discusses how we can start thinking systematically about the entire data process, rather than narrowly focusing on the ‘fun-part’ of data analysis. In thinking about the entire system we scale the impact we can achieve. Taking a systems-level views means looking at everything from the data generation process to the tooling choices we make that reduce error and friction making analysis a more seamless experience.

Figma provides a great example of this design-thinking mindset. They turned the idea of how product design works at a company around, from one that relied on synchronous, queued work and files passed to-and-fro into one that was collaborative, browser-native with seamless integration.

Kwok writes:

> The core insight of Figma is that design is larger than just designers. Design is all of the conversations between designers and PMs about what to build. It is the mocks and prototypes and the feedback on them. It is the handoff of specs and assets to engineers and how easy it is for them to implement them. Building for this entire process doesn’t take away the importance of designers—it gives them a seat at the table for the core decisions a company makes.

It doesn’t take much of a leap to see how this might extend to data. For all the talk about what type of [data product a data product is](https://roundup.getdbt.com/p/quasi-mystical-arts-of-data-and-the) or what the [Modern Data Stack is or isn’t (or feels like or doesn’t)](https://benn.substack.com/p/the-modern-data-experience) we haven’t spent much time considering whether data is fundamentally a collaborative design process rather than a tool, an analysis, or even a product.

If we look at data as a collaborative design process rather than the mere some of a spreadsheet and some charts and graphs, then I think we can start to build a framework for what the future of data might look like.

Data, much like design, isn’t just data analysts and engineers and scientists. Data is also a conversation between data practitioners and their stakeholders, whether they’re data PMs, or leaders in Sales, Marketing, Customer Success, Finance, or any other data-reliant department (which these days, is every department).

Yes, data is also the tables, and sheets, and CSVs, but it’s also the pipelines and integrations between systems, it’s the [Reverse ETL Platforms](https://hightouch.com/?utm_source=substack&utm_medium=email&utm_campaign=pedram) and [data catalogs](https://atlan.com/) and [observability](https://www.montecarlodata.com/) and [lineage](https://openlineage.io/). Data is about how the handoff between a stakeholder and a data PM is done, it’s about the analyst building out the product and the acceptance testing and the iterations and improvements all along the way. It’s not just tools, or outputs, but an entire system.

Data works best when the entire feedback loop from ideation to production is an iterative process. When Stitch Fix built the [Tinder for Clothes](https://qz.com/quartzy/1603872/how-stitch-fixs-style-shuffle-learns-your-style/) it was through a collaborative process of looking at the data they had, the results they wanted, and taking a step back and reinventing the data generation process to build a car instead of a faster horse. It wasn’t enough to ask users for more survey data, but to completely change the question and how users interacted with a service to give meaningful data that captured their emotion and not their rational thoughts.

> Tightening the feedback loop of collaboration allows for non-linear returns on the process. Design can be drafted _simultaneously_ with the product, allowing feedback to flow in both directions throughout the process.

The lack of a real feedback loop in building data assets, be it dashboards, dbt models, or answers to one-off questions, has been the main source of frustration for analysts. It’s not a tooling problem, but a design problem.

We gather requirements, pull the data, analyze it, make assumptions, build a view, and then stare at our stakeholders wondering why [they can’t use the seventeen filters we surreptitiously placed for them.](https://getdbt.slack.com/archives/C0VLNUUTZ/p1629156152197200)

We pull open our favorite tool, spend time trying to answer a question, and then opine about how self-serve is a myth.

What we’re missing is what Figma has solved for designers: bringing the collaboration process inline with the assets to allow for better handoffs and feedback.

This is where tools like Hex really start to shine and why my excitement about the product has people thinking I’m being paid off. (I’m not but I will accept shares).

Tools like [Hex](https://hex.tech), or [Hightouch’s Audiences](https://hightouch.icom/audiences/?utm_source=substack&utm_medium=email&utm_campaign=pedram), help bring non-data-practitioners into the data practice. With Hex, I’ve built internal tools quickly, with easy access to CSVs, Databases, and manually input data. It’s simple to build an app in the logic view and then work with a stakeholder in real-time as you iterate on the design and check your assumptions.

I can watch real-time as they struggle understanding a concept I thought was clear. I start to notice that even I don’t quite understand the logic behind some decision that seemed trivial when I was writing the analysis as I try explaining it out loud.The friction in making changes is fractions of what I’ve experienced in any other data product tool. Whether it’s building a simple dashboard in Superset, complex logic in Looker, or writing SQL and then exporting it into Google Sheets, all these tools have inherent barriers to iteration and collaboration.

At the risk of sounding like an ad, [Hightouch](https://hightouch.io/audiences/?utm_source=substack&utm_medium=email&utm_campaign=pedram)’s Audiences works in the same vein, removing the friction point between marketers who change their minds every five minutes and data analysts who like to spend time making sure they’re delivering something accurately.

![](https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/aabc769e-e94c-405f-8219-7f76de6c2dbb_1980x578.png)

These are still early days and we still haven’t reached consensus on whether BI tools and reporting/exploratory tools are really one and the same. [There’s certainly an argument to be made](https://benn.substack.com/p/is-bi-dead) that it reduces friction to have both mode’s of working in one tool. But it’s also hard to imagine a tool that’s equally good at the exploratory, creative work involved in analysis as it is in the more polished, static world of dashboards and reports.

Even Figma is only a design tool in the end. It doesn’t build websites, it doesn’t build apps, it only eases the work involved in designing products. As the data space matures, tools that help ease the work involved in the creative aspect of data analysis, from start to end, will help fill in the missing gap in data analysis. Whether the end is the acceptance of a design, specs for a dashboard, or the dashboard itself remains to be seen.

What’s clear is, as with design (and I’m borrowing heavily from Kwok’s writing here): Data decisions cannot be entirely abstracted from the rest of a business—they are as intertwined as the decisions made in product and engineering (and design).

It’s doubtful that anyone, save a few PMs, will pine for the days where data is meant to answer a question about a number. As this field matures, I think we’ll continue to see a push for looking at how data can be integrated within the the rest of the business, not to answer questions about numbers, but to understand the fundamental business problems being solved, and being an active and collaborative partner to helping solve those business problems through the appropriate application of data analysis where it makes sense.

While we’re still early days in the design of data, I imagine we will continue to see more tools fill this niche of enabling a systems-level view of data, and I’m looking forward to what the future may bring.

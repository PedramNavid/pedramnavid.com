---
title: "Doing Data The Hard Way: Intro"
description: "a preview of what's to come"
tags:
  - data
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2023-04-04T23:57:33.346Z"
category: data
---

I’m working on a 3-part series on Doing Data the Hard Way. In times of plenty, we often forget what life was like in times of scarcity. This series will take us back to basics, to a time before there were data vendors ready to sell shovels to anyone in search of gold.

What we’ve seen over the past few years has been a number of companies formed to help solve real problems data teams face. The first wave of companies solved broad, large problems where the value trade-off between engineering effort and vendor spending was clear: building and maintaining ETL pipelines can require a team of data engineers to handle ingesting, changing APIs, monitoring, logging, and the rest. But as the more obvious parts of the stack became dominated by one or two vendors, smaller and smaller pieces of the data pie were left for others to build against.

There was also an eagerness to believe that solving a problem at one company was a universal problem that could be easily solved at many companies. I’ve seen many attempts at bringing a well-designed solution at a larger tech company to market with the hopes that others could soon benefit from a scaled-out solution. Still, I think we are starting to see that large-company problems are often not the same as small-company problems and, even more so, that tech-company solutions don’t always work well for non-tech companies.

All this to say that it’s no surprise that we’re seeing some pushback against the complexity of the past few years.

Compounded by the unfortunate market reality that companies need money to survive. Yes, I understand this can come as a surprise, but it is a new reality we all try to navigate. With that, there’s a minimum bar for any vendor below which a customer is simply not worth acquiring. Conversely, for every company looking to buy a data product, there’s a bar above which the solution isn’t worth the cost.

I fear the gap between these two bars is increasing, which is perhaps causing an overdue re-examination of what we need and how we get there.

At the danger of waxing nostalgic, I’d like to take a look at how we solved data problems prior to having access to endless vendors eager to solve problems for us.

I’ll explore common tasks like ETL, orchestration, and moving data between systems. I’m not a purist here; some things are not worth doing yourself — BI comes to mind. And the goal isn’t to demonstrate the cheapest possible stack. We will still use cloud vendors, such as Google Cloud or AWS, but the emphasis will be on building in-house with an assortment of custom code and open-source tooling.

We will consider what it will take to go from proof-of-concept to development to production and discuss the key concerns we want to keep in mind as we build systems: from maintainability to reliability and performance.

If this sounds interesting to you, smash that subscribe button, and leave a comment about what part of the stack you’re most interested in learning about. The next post comes out in about a week’s time.

See you then.

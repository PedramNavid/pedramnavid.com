---
title: "The Last Thing I'll Ever Say About the Data Mesh"
description: "I hope"
tags:
  - data
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2021-08-14T04:38:31.403Z"
category: data
---

Boy, it has been an interesting week. I’m still not sure what started it all, but a concept has been pervasive over data twitter later: The Data Mesh. It may not have started here, but this tweet from [@sethrosen](https://twitter.com/sethrosen/status/1425093709541036048) was early days in the discussion.

From there, a Cambrian explosion of hot-takes, confusion, and derision ensued. I both defended it…

and attacked it..

but was mostly myself left confused.

Once the dust settled from the hot-takes, and the Data Mesh account unblocked me, I decided to read the original 2019 post by Zhamak on Martin Fowlers website carefully. I think it’s important to have a critical eye on these emerging trends, but to do from a place of openness and good faith. Here is my attempt to deconstruct the data mesh.

## A Brief Overview of Thoughtworks

Zhamak Dehghani wrote her article [introducing the Data Mesh concept](https://martinfowler.com/articles/data-monolith-to-mesh.html) in May of 2019, and I’ve tangentially heard about it here and there since. She works as a consultant at Thoughtworks, the same company that employs Martin Fowler.

For those who don’t know [Martin Fowler](https://twitter.com/martinfowler?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor), he is a prolific writer about design patterns. He was a signatory to the Agile Manifesto, and wrote Patterns of Enterprise Application Architecture, a very influenceable book that has caused countless fights within engineering departments far and wide. The book catalogs [many different design patterns](https://martinfowler.com/eaaCatalog/), some [quite useful](https://martinfowler.com/eaaCatalog/unitOfWork.html) and others more [questionable](https://martinfowler.com/eaaCatalog/dependentMapping.html).

I have worked with very good engineers who have never heard of him, and very good engineers who believe his patterns are gospel. I have seen projects benefit from some of the concepts described, and I have seen projects grind to a halt as someone attempts to pigeonhole a project into a particular pattern before even starting to write a single line of code. I believe it’s important to understand the background and context of where the data mesh emerged to fully appreciate it.

## DDD and Distributed Data

The main argument in Zhamak’s post is that we should move away from a monolithic, centralized domain-agnostic data platform and toward a distributed “data mesh” architecture. The underlying goal is to enable data-driven organizations to be more data-driven, whatever that means. The paper borrows heavily from other concepts such as [Domain Driven Design](https://www.domainlanguage.com/) or DDD, pioneered by Eric Evans, as well as Distributed Data Architectures, as described in [Designing Data Intensive Applications](https://dataintensive.net/) by Martin Kleppmann.

A short background on DDD: Domain Driven Design was introduced to address an issue around complexity. It is an approach to writing software that borrows from object-oriented design and suggests that software should be architected to mirror the underlying business domain. There are entities, value objects, events, aggregates, repositories, services, units of work, and other concepts that are brought together to build the field of domain-driven design. There are trade-offs to this approach, and Microsoft does a great job describing them:

> From [Microsoft](https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ee658117\(v=pandp.10\)?redirectedfrom=MSDN#DomainModelStyle): While Domain Driven Design provides many technical benefits, such as maintainability, it should be applied only to complex domains where the model and the linguistic processes provide clear benefits in the communication of complex information, and in the formulation of a common understanding of the domain.

This is an important point with DDD. It is hard to implement. It may make maintainability easier, but that comes at a great cost, and the cost/benefit must be assessed honestly before proceeding. Often, it makes more sense to implement DDD in response to a pressing and obvious need, the symptoms of which are a monolithic, inter-woven, poorly structured piece of software that is impossible to maintain or update.

Distributed Data Architectures, on the other hand, are used to solve a different problem: that of scale. In a perfect world, our data fits in a single database, and we don’t have to worry about things like multiple copies of data and read/write conflicts. As our data volume scales, we eventually exhaust the ability of a single computer to run that database, and so we take our data and put it on multiple computers. This is where the fundamental problems of distributed data begin. We have to carefully balance our need for [replicability, reliability, speed, and consistency.](https://en.wikipedia.org/wiki/CAP_theorem) (Often known as the CAP theorem)

These are important and well-understood concepts within distributed systems.

## The Failures of our Current Model

According to Zhamak, the current model (cloud-service providers, data warehouses, data lakes, and ETL pipelines) suffer from several issues:

1.  They are centralized and monolithic. I am not convinced this is an actual issue. Monolithic architectures are easier to reason about, and their edges are far less sharp than a distributed one. Zhamak says that this central model works well for smaller organizations, but fails larger ones. She believes that adding new sources is problematic under a centralized model, which I can believe. But it’s not clear to me that the solution reduces complexity in any meaningful way, and I fear it adds far more complexity than it addresses.
    
2.  The Ingest, Processing, and Serving of Data are tightly-coupled and cannot be broken down functionally. Scale is achieved by assigning more people to parts of the pipeline, which slows down delivery. I agree, this can be a real challenge at very large companies. They way I have seen this addressed is through a very strong platform team that provides the tools for other departments to use. Stitch Fix, for example, [designed a data integration platform to help meet the needs of their data scientists](https://multithreaded.stitchfix.com/blog/2018/09/05/datahighway/).
    
3.  Silos and hyper-specialization. This is probably the most relatable issue raised. She speaks to the difficulties data engineers face: _“They need to consume data from teams who have no incentive in providing meaningful, truthful and correct data. They have very little understanding of the source domains that generate the data and lack the domain expertise in their teams. They need to provide data for a diverse set of needs, operational or analytical, without a clear understanding of the application of the data and access to the consuming domain's experts.”_ This is a real problem I’ve seen, and I think important to address.
    

## The Solution

### Domain Confusion

This is where things get a little shaky. I found that Zhamak’s writing had been clear up to this point. It is when we come to the solution to these issues that jargon starts to appear and ideas appear more muddled.

For example, she states:

> Though we have adopted domain oriented decomposition and ownership when implementing operational capabilities, curiously we have disregarded the notion of business domains when it comes to data.

I don’t believe this is true at all. dbt has done an excellent job of helping us creating views that are [modelled around the business domain.](https://discourse.getdbt.com/t/how-we-structure-our-dbt-projects/355) In the How we structure our dbt projects post, Claire Carroll is very clear about how moving from source-based to business-based modeling is a core part of how they work in dbt, and many others have followed suite. Zhamak says that after data ingestion, the concept of domains is lost, but this is not something I’ve seen. It is often very clear who owns what schemas in a data warehouse, and the analysts are responsible for a very specific part of that pipeline.

She suggests that instead of pulling data, from say a warehouse, we should be querying data from these domains. This borrows heavily from how microservices are often designed, in that they contain their data and only expose it via an interface. While this may work for ad-hoc and transactional queries, I have trouble understanding how this will work across analytic systems that need to take disparate data from systems such as a backend database, Finance, and Salesforce and combine them to create a view of Customer ARR, without a world of pain. The Data Warehouse serves this very common workflow very well.

I am not clear that we need Domain Driven Design for managing a complexity that is simply not there, when we already have good models for exposing data in a warehouse in a way that is centered around business domains.

### Sources and Consumers

I admit from here I was completely lost. Some domains are centered around data origination. Others are centered around data consumption. Why this matters or is important escapes me. It appears that different use cases necessitate different access patterns or interfaces, but the writing loses a lot of the precision it had earlier on, so I am left confused.

### Distributed Pipelines

I believe the next argument Zhamak makes is that the full set of data cleansing, preparing, aggregating, and serving should be duplicated within each business domain. Additionally, each domain must include Service Level Objectives that define timeliness and error rates. This duplicated effort seems to me a burdensome level of complexity in order to address an issue I am not clear warrants it.

### Product Thinking

Next, we jump into product thinking. This is a fairly uncontroversial section, although it does seem odd to fit it in among the other concepts discussed. In short, she argues that teams should produce a good developer experience by making data discoverable, addressable, trustworthy, self-describing, inter-operable and secure. Sure, why not. These are all great ideals.

### Addressing Duplication of Effort

Here, with a little hand-wavedness, (“Luckily, building common infrastructure as a platform is a well understood and solved problem”), Zhamak says we can solve the duplication created by breaking apart a data platform into domains through “harvesting and extracting domain agnostic infrastructure capabilities”. Setting aside whether this is a well-understood or solved problem (I don’t believe it is), it is certainly not an easy problem. You would need quite a large team to do this effectively. This may be doable at Apple, Facebook, or Google. Perhaps it already exists there, but outside of a few companies, I don’t see this as an easy thing to replicate. And again, even if we could do this, what are the trade-offs? And what is it solving for?

## Conclusion

I think there are some really valid concepts here, and so I do not wish to dismiss everything. Giving smaller teams ownership over domain-centered parts of their data platform makes a lot of sense, but in a sense, we already do this, and there’s no indication to me that the monolithic infrastructure is a deterrent to enabling that. Having a strong, business-agnostic data platform team that builds a central infrastructure that other teams can leverage often makes a lot of sense. Having each team try to build out parts of that stack themselves seems impossibly complex. A hybrid-approach where a data platform team makes that infrastructure deployable at-will doesn’t seem to help either.

In my experience, the real pain points of analytics and the real stopper of data-driven decision making is not the monolithic nature of the data warehouse. It is the way teams are organized, it is who decided what work needs to get done, and what type of accountability and ownership data teams have. I think the fundamental problems teams face are not technical ones, which is what Zhamak seems to be trying to solve, but organizational ones. We haven’t figured out the best model for designing data teams, it’s rare that I’ve come across teams that were stuck because they couldn’t design a proper data model, or had trouble integrating a new data source.

From what I’ve read, much of Zhamek’s work is trying to solve issues with data at a service-level, issues that relate closely to DDD, Microservices, and Distributed Data. However these aren’t the issues data team are facing. Getting data out of systems, ingesting them, and reporting them is the easy stuff. The hard stuff is deciding what to do with that data, how to measure the effectiveness of the teams dealing with data, and what types of questions to ask and how best to answer them.

Admittedly, I do not have the same experiences as Zhamek, and it’s likely the problems and issues she’s seen are different than mine. But, without a better understanding and a clearer exposition of the problems, I’m left still wondering where data mesh is coming from, what its goals are, and where it’ll be going.

Looking forward to your thoughts.

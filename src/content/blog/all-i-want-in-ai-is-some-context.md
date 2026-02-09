---
title: "All I want in AI is some context and a chat window"
description: "Why curated context is the missing piece for enterprise AI adoption."
tags:
  - data
  - ai
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2025-05-22T16:40:20.328Z"
category: data
---

My personal AI journey has mirrored the Gartner hype cycle we all know and love. While I’ve started much of my AI work through the lens of coding and software engineering, thinking about how life has changed forever, what I’ve found more useful in my day-to-day leading marketing is other, simpler use-cases for AI.

I know some of you believe that AI will come for your jobs and replace you, and while I don’t share that view, I can see how, if you extrapolate the progress we’ve made over the past twenty years, it seems inescapable.

I am not great at that type of long-term vision, but I can see what might be around the corner in the short term. I [begged for dbt](https://databased.pedramnavid.com/p/we-need-to-talk-about-dbt) but better a few years back, and then dbt acquired SDF. I wrote about [the rise of Data Platform Engineering](https://databased.pedramnavid.com/p/the-rise-of-the-data-platform-engineer) and how it requires a framework approach to enable teams, and then the team at Dagster shipped [components](https://dagster.io/blog/accelerate-data-pipeline-development-with-dagster-components).

My barometer for the future is loosely based on what I need today that I don’t see great solutions for, rather than extrapolating a world fundamentally different from what we have today. In that vein, I’m going to achieve progress through more complaints.

### It’s the interface, stupid

First, I’ve seen firsthand the potential of LLMs to fill in the gaps of lower-priority work that never seems to get done. Work that often required a little technical and domain expertise, but not a lot. Work that was just annoying enough to defer until later, not important enough to prioritize strategically, but still valuable in its own right.

One of the most used things I’ve built is exceedingly simple: Help our sellers self-serve collateral for their sales calls using ChatGPT’s GPTs feature. I used to think the GPTs feature was a hokey thing with no real value, but I’ve realized that its superpower is its extremely simple and easy-to-use interface.

![](https://substack-post-media.s3.amazonaws.com/public/images/2fb0baf8-caf0-474b-b918-8ec11e39e923_1824x1222.png)

A chat interface in a web app remains the easiest way for less technical people to interact with AI tooling. Even Slack, which seems like a great way to chat, does not make a great interface for LLMs. The responses are too long, and the Canvas feature in ChatGPT and Claude is a necessity. Of course, you can build your own chatbot, or use Slack, or a terminal, or API calls, or a sidebar in your code editor, or create agents with Aider, or a million other possibilities, but ChatGPT’s interface remains the simplest way to work with an LLM.

![Even Slack, which is excellent for chat, doesn’t make for a great LLM interface today.](https://substack-post-media.s3.amazonaws.com/public/images/ae853af0-3e71-4af5-a26c-a2a9f8058120_986x1070.png)

### Context is king

The interface is half the equation. The other missing piece is providing relevant and curated context. ChatGPT’s GPTs feature fails miserably here, and very few tools I’ve used so far provide a good way to manage this.

For LLM adoption to really take root in organizations, people like me will try to build tooling for others. I’ve found that I need control over the context I feed into these tools for there to be any chance of success.

One of the first things I’ve built was our AskAI Slack bot, which Scout powers. It’s been a powerful tool for helping our community self-serve by feeding an otherwise useless LLM relevant context that completely changes how it operates.

Using a plain LLM to ask it a question about Dagster inevitably leads to wrong answers, hallucinations, and deprecated APIs. Feeding that same LLM our docs, GitHub Issues, and Discussions completely transforms it into a valid and sometimes correct assistant.

In this specific case, the context problem is fairly straightforward: scrape the website daily, run a daily job that fetches issues and discussions updated on the last day, and update the document store in Scout. Feed the 10 most relevant documents as context to the LLM and call it a day.

![](https://substack-post-media.s3.amazonaws.com/public/images/4c686d7f-8e95-47dd-93d3-39865a714397_1146x788.png)

Where this model doesn’t work as well is the rest of the knowledge created at companies. I have a positioning guide in Notion that I regularly update, we have case studies in a Google Drive folder, our website has the latest information on pricing and features, and there’s a Google Slides presentation someone once shared that I can never find that has our public-facing roadmap. And right next to all that helpful information is hoards of information I don’t want anything to do with.

I can upload PDFs to GPTs but this means I need to constantly remember to update them as I update our documentation. Apps like Slack and Notion and Zoom seem to promise to solve this, but most everything-apps end up being everything-sucks-apps.

Curating this knowledge meaningfully with tooling that can help me easily create interfaces to an LLM that everyone at a company can interact with seems simple, but remains unsolved.

The problem remains the N integrations that need to be built. I talked about documents and emails, but there’s also a repository of knowledge in systems of truth.

Imagine a sales rep wants to craft an email to a prospect who recently attended our event. I’d want to give that rep access to not only our differentiated messaging and positioning, but also context from Salesforce and Hubspot on the account, the campaigns and events, previous conversations, recent activity, and other internal knowledge. I might also want to run an enrichment against Common Room and Clay to understand better how this person interacted with us on GitHub, Slack, and LinkedIn, or to enrich their profile with relevant details from their company’s website or public filings.

Right now, I am stitching together a half-dozen pieces of tooling to make this work, and the interfaces I have are fairly poor. ChatGPT’s GPTs don’t work well with this model, so I am forced to use Slack bots and duct tape. I don’t want to build this from scratch, because every use case is slightly different.

I am sure that eventually, we’ll see AI workflow cloud platforms that bridge this gap. And when that happens, I’ll be sure to take credit for their success.

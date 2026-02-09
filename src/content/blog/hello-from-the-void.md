---
title: "Hello, from the void."
description: "a man, of letters"
tags:
  - data
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2023-11-07T06:25:45.254Z"
category: data
---

Hi friends,

It’s been a while. I’m afraid I haven’t had many thoughts to lead with, and so I’ve stopped writing for a few months, but I have missed you all.

A lot has happened since we last talked. I quit posting on the site formerly known as Twitter, although I occasionally open it to see if I’ve missed anything.

![](https://substack-post-media.s3.amazonaws.com/public/images/89c3ec73-e3ea-4937-bf92-7ea713c4eaac_594x325.png)

In some ways I have: whether it’s Charlie Marsh talking about another [Ruff milestone](https://x.com/charliermarsh/status/1721631786797523116?s=20), or Simon Willison posting about [prompt injections](https://x.com/simonw/status/1721599524576322018?s=20), there’s lots of really interesting work I’m missing, but at the same time, I just don’t have the heart for misinformation and the muskification of my internet. For what it’s worth, I’m on [Threads](https://www.threads.net/@pdrmnvd) posting to all 3 of you who read my content, and on [LinkedIn](https://www.linkedin.com/in/pedramnavid), trying more and more unhinged forms of posting to see what I can get away with.

But the real reason I left the site formerly known as Twitter is that it was a site that made me feel bad. I would scroll until I got upset, and then scroll some more, and then would feel worse after I was done. And once I stepped away from it, I realized, something that makes you feel bad all the time is probably bad for you. It’s good to listen to your feelings.

While something is lost, I’m hopeful that something new will emerge, and while we’ve tried three forms of recreating Twitter, all without success, maybe there will be some other place where we can all get together and share what we’re working on.

Until then, I’d like to ask you to do something for me. Send me an email with what you’re working on. I’d love to hear from all of you still out there. It can be about data, a project, a deal, a hobby, or even a home renovation project. Whatever it is, I’d like to hear about it, and let me know if you’re comfortable with me sharing it, because I’d like to start writing not just about what I work on, but on what you all do too.

While I no longer have the reach of millions of potential likes, retweets, quotes, and replies, I think we have something a little more intimate. I think there’s something to be said for writing slower, engaging more thoughtfully, and chasing a good connection over a hot take, so indulge me.

In that spirit, here’s what’s been going on in my life:

---

## Orchestrators Everywhere

If you haven’t been following me closely, you might have missed it, but I’ve also recently joined Dagster to do data things. It’s not every day you get to join a company that is building a tool purpose built for you, and I consider myself really lucky to be part of such a highly talented group of people.

Orchestrators are funny things. At first, they seem relatively simple: a scheduler, a task runner, a webserver, and some glue. And while orchestrators like Airflow and Dagster at first glance seem a natural place for data pipelines to run, when you look closer you start to see orchestrators everywhere.

Github Actions, CircleCI, Airbyte, Meltano, Fivetran, dbt Cloud, are all operating as orchestrators too. I’d argue not by desire, but by necessity.

Consider a simple extract-load pipeline where you fetch data from a database and load it into a data warehouse. Airbyte, Meltano and Fivetran all offer this capability. But being able to extract data from one system and load it into another alone isn’t sufficient to build a product.

You also need to schedule that task, you need to be able to monitor it for failures, retry when it doesn’t succeed, and look at logs to understand what went wrong. You may even need to create a dependency, allow for configurations, and different environments. Quickly what seems trivial becomes complex.

Part of what I’ve been thinking about and working on is wondering what a world might look like if we didn’t have to reinvent orchestrators for every job we wanted to accomplish? What if we had simple tools for extracting and loading data, or for all the other data concerns we seem to have: data quality, anomaly detection, cataloging?

Some of that work has resulted in a simple little idea I call `dagster-embedded-elt.` That’s what I’ve been up to over the past little while. I’d love to hear what you’ve been doing.

---

## Coalesce 2023

Last year at Coalesce, someone whose identity I will protect, made the claim that 2023 would be the last good year for that conference. I think what he was getting at is that dbt labs would be forced to grow up and start running conferences like real companies do: customer stories, product showcases, proof of enterprise-readiness.

While in some ways, that was always the point of Coalesce, it has definitely become more true this year than any prior year. Attendance seemed lower, probably due more to the economy than anything else, but production value remained high as was the bar for talks. Talking to practitioners, it seemed the general consensus was pretty positive, and so while we didn’t have the marching bands and parties and free rides of yesteryear, I didn’t get the impression that this year disappointed.

Personally, I was stuck in my hotel room for 3 days fighting a brutal bought of exhaustion, and must’ve slept 15 hours a day each, so for me, this was the most beautiful of all conferences ever. Never had I slept so much, so peacefully, so quietly. If you can pull it off, I highly recommend going to a conference to sleep for 3 days straight.

Next year, Colaesce goes to Vegas, completing dbt Labs’ transformation from small, scrappy startup to Enterprise-Ready (TM).

Did you go to Coalesce? If you didn’t sleep for three days straight, I’d love to know your thoughts.

---

## Everything Else

I’ve started therapy, once a week, for the past few months. I don’t know that I like it, or enjoy it, but I have to believe that it is good for me, given how much I am spending on it. I believe they call that cognitive dissonance in the biz.

After getting jealous of Taylor Murphy’s sim racing life, I decided I had to jump in. I got a wheel, pedals, and a stand. It’s equal parts fun and embarrassing.

I’ve been playing with LLMs non-stop, trying to better understand them. I’ve trained models on my desktop, built RAG pipelines using Llama Index, and am working on a support bot trained on Github Issues, Discussions, and Docs.

I am \[——\] this close to try NixOS. Something about it seems really interesting, but there’s also something really compelling about NOT spending three days setting up a new Linux environment.

I desperately need a new desk chair. This one from West Elm, is so squeaky it is driving me insane. Please give me chair recommendations

If you do any of the above, or anything else that’s fun, please write in and tell me how it’s going for you.

All the best,

Your Friend.

pedram

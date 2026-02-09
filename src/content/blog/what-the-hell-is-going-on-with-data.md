---
title: "What the hell is going on with data?"
description: "This used to be fun."
tags:
  - data
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2023-08-22T10:34:37.601Z"
category: data
---

In case you missed it, it’s been a hell of a few weeks. I barely know where to begin. First, dbt did an altogether boring and uninteresting thing, which was switch to consumption-based pricing. As you might expect with any pricing changes that cause the average cost of something to go up, consumers were upset.

![Photo by Girl with red hat on Unsplash](https://images.unsplash.com/photo-1615402020061-337a2a5a97ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMDAzMzh8MHwxfHNlYXJjaHwxMXx8bm9zdGFsZ2lhfGVufDB8fHx8MTY5MjcwMDM4OHww&ixlib=rb-4.0.3&q=80&w=1080)

The rollout was odd: no announcement, no email. Just a blog post quietly published that someone in the community saw, and posted in dbt’s Slack channel. A community that somehow, inconceivably, has 54,000 people. (If a Slack rep is looking for the deal of a lifetime, see if you can get dbt to start paying for that workspace, and drop me 1% of your commission.)

Even though this was only affecting new users, and existing users would have something like a year before this hits their pocketbooks, a minor revolt started. You know things are bad when the CRO has to step in to a Slack thread. Somewhere in the madness, people realized that you could avoid materializing views, and so quietly, without notice, dbt dropped the number of models included in their base package from 20,000 to 15,000. The people revolt, the CRO tries to calm down the peasants and pitchforks, time is a circle.

People are tossing around back of the napkin math. Costs are going up 300% for some. One person complained that they would have to pay a whopping $200 a month. Others would have been hit far worse. Smelling an opportunity, the blogposts and Twitter threads cropped up seemingly overnight.

-   Top 10 Sexiest Ways to Deploy Dbt (sic)
    
-   How One GitHub Action Made Me a Senior Analytics Engineer
    
-   PROOF SQL IS THE ACTUAL DEVIL
    

And so on. The knives were barely sharpened before they came out.

This isn’t a story about a botched pricing strategy, or one about the powerful lessons of price elasticity though.

I want to talk about something else that’s happening: Data just isn’t fun anymore.

## This Used to be Fun

There was a time, not too long ago, where the data community used to be really fun. There were many like-minded people, and I made friendships from that community. Real friendships.

People I meet in real life, who I text with on the phone, who refer me to their therapists and show me pics of their new dogs. Real people I truly love, and all through this weird thing known as the ‘data community’. I have group chats with the boys, I check-up on my friends after a California Hurricane (some light rain), I message some less regularly but still with them always in my heart and in my head.

The community used to be fun. We had the same job: “something to do with data” and we used some of the same tools and we all suffered the exact same problems: data problems that were actually people problems.

There was even an exciting open-source library released by a small consultancy shop that was solving a real problem real people had. We bonded over the shared trauma that was looking at Hadoop and Spark error logs, trying to decipher Java stack traces, looking each other in the eye and saying “No. Never again. We will not forget.”

We’d make tweets and some of them would go viral, usually the worst ones, because the plebs have horrible taste. We knew the best tweets got 12 likes, and the worst ones got 12,000. We tried to pretend we didn’t laugh at puns, but deep down we did. Because we were happy.

Because this used to be fun.

But this isn’t fun anymore. Maybe it’s being harassed, both publicly and privately. Maybe it’s just the trouble with becoming a public figure, in that people you don’t know suddenly feel entitled to the same closeness you reserve for those that’s you do know privately. Maybe it was the sudden infusion of billions of dollars in capital without due diligence that brought in so many people looking to make a quick buck on whatever the flavour of the day is.

But this used to be fun.

Now it’s knives out for a company that can’t figure out how to monetize something, after taking round after round of money without a clear path to a valuation that makes little sense once the drunkenness of ZIRP gives way to the ruinous sobriety of revenue streams and capital expenses.

Maybe it’s a narcissist with a weak ego that took over a platform that was once bad, but not _this type of bad._

It’s the death of dbt this, the death of the modern stack that, it’s gotchas and I-told-yous. It’s venomous toxicity, and the slow disappearance of people I used to know from a platform I used to love.

Did I mention, this used to be fun? A familiar feeling. Another platform I once loved was also destroyed.

I used to write a lot in a little place called Livejournal. There too I made friends, and we wrote for ourselves as much as for each other, while reading what others wrote for us and leaving comments. A social network before it had a name. A platform that brought people together, until eventually it drove us all apart. If it wasn’t the Russians buying the platform, it was the harassment from the same people who would later become neo-nazis.

This used to be fun.

## Everyone Wants a Piece of the Pie, Nobody Wants to Bake

In many ways, we have it better than ever before. dbt still exists, and it still remains open-source, for now. There are countless free and open-source tools that we would’ve killed for a decade ago. DuckDB is truly magical. Dagster, (a company I just joined) is a labor of love of from someone who just wanted to build something that not only fixed pain, but did so elegantly, although don’t worry, I recognize it is a VC-backed company too. There’s a wealth of tooling out there, and yes, some of it is of questionable quality, but much of it is great, and there’s so much we can do today that was difficult to do before.

And while we continue to get more than we will ever deserve from the good-hearted Dutch, we also benefit from the capital that venture-backed companies provide in order to hire the engineers that build the products that we use. The problem with good software is that it requires labor to build, maintain and improve, and there’s still no substitute for a bunch of people motivated by a common goal and passion in building anything of sufficient complexity.

But there is something about the data space that feels wrong, like something is missing. There’s a spirit that we once had of building and giving away that doesn’t seem so prevalent anymore. For all the millions of dollars you raised off the backs of the jinja, how much have you donated back? For all the hot takes and blog posts, how much time have you spent maintaining open-source projects? How much have you given away for all that you have taken?

Yes, data is dumb, and VCs ruin everything, and this company sucks and that one sucks too, yes it’s all a big scam, and everyone is a marketer, and the only person who has all the right answers charges you by the hour. These things are all true, but they are not fun truths. They are sad truths, and I don’t care for sad truths.

There’s plenty of good truths too. There are people who are still giving away knowledge because they believe knowledge should be shared, and there are people building things because they enjoy the act of building, and there are people solving problems not for profit, but for fun.

If you haven’t spent some time mentoring people and watching them grow over the months and years, if you haven’t spent too many thankless hours of your life trying to maintain and contribute to an open-source tool that everyone uses and no one cares to improve, if you don’t build things to solve a pain you’ve had in the hopes that it’ll solve someone else’s, if you don’t give away your hard work for free, then kindly, please, shut the fuck up.

Because this used to be fun.

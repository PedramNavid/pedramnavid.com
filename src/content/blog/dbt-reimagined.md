---
title: "dbt Reimagined"
description: "Living in a fantasy land where anything is possible."
tags:
  - data
  - dbt
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2023-03-09T04:42:09.991Z"
category: data
---

It was late one night, and I couldn’t sleep, so I started falling into a fantasy where constraints weren’t real and anything was possible. I started to think to myself: what would a future dbt look like?

Let’s explore the fantasy together.

## DSLs over Templated Code

One thing I really enjoy about using LookML is the ability to know when I made a mistake instantly. Because LookML is a [domain-specific language](https://en.wikipedia.org/wiki/Domain-specific_language), it has many nice features, such as type safety, validation, and autocomplete.

![](https://substack-post-media.s3.amazonaws.com/public/images/cacce723-f439-431b-8a61-ed39f9facbf5_1364x584.png)

There’s a richness to LookML that you instantly start to miss when you’re working in templated languages like yaml. While you can certainly provide a certain level of validation through [JSON Schemas](https://github.com/dbt-labs/dbt-jsonschema) which dbt does provide, there’s still something missing when you’re writing templated SQL or model configurations in yaml.

This bifurcated state of Jinja-templated-SQL on the one hand and yaml-configs on the other in two separate files becomes painful over time as model complexity grows.

In a world where we don’t care about backward compatibility, I’d like to see a whole new language that dbt uses to provide model metadata and describe the SQL model itself simultaneously. All in one file.

Maybe it would look something like this. It could come with its own [language server protocol](https://microsoft.github.io/language-server-protocol/) that would have a rich context-aware understanding of your source database schema to help with autocomplete and typos.

Notice how the code that describes the model and the SQL is contained in one file? This would reduce cognitive interruptions that frequently occur today when building models. How often have you updated a column in your model and not bothered to edit the schema file because it was too far away?

![](https://substack-post-media.s3.amazonaws.com/public/images/7334c300-7099-4fbf-8567-c3b71b6c0a51_1018x2022.png)

Language servers are very powerful tools that most programmers rely on when building software. They also work across various tools, so the same language server in VS Code would also work in Vim.

Imagine a world where you could rename a column in a base model. The language server could rename all symbols associated with that column in the model configuration and downstream models in one go.

You could also leverage code actions. For example, after explicitly naming your columns, a Code Action could generate boilerplate names and descriptions for all columns as part of your model config. You could even go so far as to have generative AI infer the column descriptions and tests. Why shouldn’t the computer already know that your id columns should be unique and not null?

## Debuggers

[Analytics Engineers can have nice things too](https://www.infoq.com/presentations/rust-systems-programmer/). In software engineering, debuggers can be essential. When something goes wrong, it can be nice to interrupt the flow of a program to understand the state of the system right before things go bad.

![](https://substack-post-media.s3.amazonaws.com/public/images/3001bce5-0e29-46fa-be1e-e4aa5b059c2c_1214x958.png)

In Python, you can drop into the python debugger by adding a \`breakpoint\` function call anywhere in your program. When running tests, you can ask pytest to fall into the Python debugger whenever a test fails, or even at the start of a test to trace through the program.

What if the same were possible when building SQL models? Suppose you had an incremental model that just wasn’t quite working properly. Maybe defined like so:

![](https://substack-post-media.s3.amazonaws.com/public/images/c149dd6b-60d2-452b-ac99-0e982f65e239_1644x2072.png)

I could imagine a _trace mode_, where dbt would first preview both the compiled SQL and the results of each CTE, starting with _sessions._ Next, _other\_sessions_ would preview, and finally the last statement.

What if you dropped into a live debugger that allowed you to run SQL against your warehouse and displayed the results right there in the editor where you work? No more jumping between editing code to your Snowflake UI and back.

```
(dbg) > ${events}
-> dim_events
> ${if incremental} 
-> true
> ${incremental_condition}
->  event_time > (select max(event_time) from dim_events
> ${sessions}
-> sql: select * from events where event_time > (select max(event_time) from dim_events
-> rows: [event_time, event_type, event_id]
         [2022-01-01, cart, 1234]
         [2022-01-02, cart, 2456]
... press m for <More Rows> or w to quit.
```

## Unit Tests

Imagine if simple unit tests were easy to write and run. One could imagine a world where you provide a small sample dataset to a query and ask dbt to run it, perhaps through an alternative adapter like DuckDB, in order to validate pieces of logic.

![](https://substack-post-media.s3.amazonaws.com/public/images/2ba97c44-edf6-44b9-8c0b-44683c50065e_1800x1062.png)

Now I recognize there are a million reasons why this wouldn’t work, but again, this is me dreaming. Why can’t analytics engineers have nice things too?

As I keep going down this path, more and more things seem possible now. With a proper language in place, column-level lineage is achievable. Code generation becomes easier too. Why should I ever have to write a base staging model when the database is _right there?_

dbt Packages, while decent enough, could be vastly improved if you could import specific modules from them. Today it feels cumbersome to pick and choose a few tables from a package or even to pass in variables to them. But what if you could import logic from packages instead?

Relationships can also be expressed independently of metrics. Downstream BI tools could leverage this for self-serve analytics. Who knows? Anything is possible.

![](https://substack-post-media.s3.amazonaws.com/public/images/3719a880-8678-432e-8a9e-f4fee8ae7820_688x368.png)

Anyway, a boy can dream.

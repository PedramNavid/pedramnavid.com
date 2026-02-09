---
title: "Doing Data The Hard Way Part 1: Extracting Data"
description: "It's one table Michael, how hard could it be?"
tags:
  - data
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2023-05-02T13:30:41.842Z"
category: data
---

In my last post, I promised you all a deep dive into doing data the hard way. In this post, I hope to deliver on that promise.

I’ll explore the first part of every data journey: getting data out of a system. The story is likely to be a familiar one to many of you. Data about something you care about exists in some system, and you want to extract that data and store it somewhere. How hard can it be?

I’m going to skip over the pleasantries of why you might want to do this and pretend that we all understand it’s something that needs to be done. There are many types of systems that have data that we might want, but for our example, we will cover a common use case: application databases.

You can’t extract data without also putting it somewhere so we’ll also discuss the merits of two different strategies: saving the data in some structured format like a CSV or a Parquet file, or writing the data directly into a Data Warehouse.

Let’s get started

## Querying Data

Given some source system, we will need to query that system to retrieve some subset of data. If our source system is a SQL database, then naturally, we’ll use SQL.

In the brute force method, we could extract all data from all tables that we’re interested in, ignoring system load and storage costs. This is a stateless process that is often overlooked but is rather simple. It might look something like this in Postgres:

```
\copy customers TO './customers.csv' CSV DELIMITER ','
```

We might soon realize while this is a simple method, it comes with some costs: namely it can be expensive to run. Our backend database may not appreciate the load. (You are running this against a replica, right?)

One solution is to only fetch data that has changed since your last run. This is known as an incremental data load.

We have two options:

1.  Use Change Data Capture: Subscribe to a log of all database events and fetch all events that occurred after our last load.
    
2.  Use a column that updates every time a row is updated, and only fetch records that have been updated since the last load.
    

The first option tends to be more accurate, but also a bigger pain to set up. It requires configuration of the database server, possibly even a restart. To really understand it, you’ll need to understand the WAL or write-ahead log in Postgres.

### A quick detour on databases

The WAL is a mysterious place within a database.

While on the surface, a database appears to be a collection of tables that mirror a spreadsheet with many tabs, under the hood what is going on are sequences of events. The WAL is the ledger that keeps track of these events. Anytime you insert, update, or delete a row, a record of that transaction is kept just like it would be in an accounting ledger.

The balance of all these transactions, much like the bank balance you have, is the collective sum of all these events. While the WAL is used to ensure that in the event a database goes down, a record of everything that happened since the last backup is persisted, the WAL can also be used to sync data other systems, such as a backup replica database, or even, your silly little ETL job.

A plugin, such as wal2json, can translate these events into something a little more manageable, as we see here.

```
{
        "change": [
                {
                        "kind": "insert",
                        "schema": "public",
                        "table": "inventory",
                        "columnnames": ["id", "item", "qty"],
                        "columntypes": ["integer", "character varying(30)", "integer"],
                        "columnvalues": [1, "apples", 100]
                }
        ]
}
{
        "change": [
                {
                        "kind": "update",
                        "schema": "public",
                        "table": "inventory",
                        "columnnames": ["id", "item", "qty"],
                        "columntypes": ["integer", "character varying(30)", "integer"],
                        "columnvalues": [1, "apples", 96],
                        "oldkeys": {
                                "keynames": ["id"],
                                "keytypes": ["integer"],
                                "keyvalues": [1]
                        }
                }
        ]
}
```

Every change to a database emits an event, and nearly every database has their own way of emitting these events. There is no single standard for CDC so it is up to the downstream implementations to handle the varying logic. Now that you know what a WAL is, let’s pick an option.

### Incremental Options

The WAL, while appealing, comes with many complexities. We’d have to store JSON data and process each row.

Instead, we’ll opt for using the updated\_at column.

These are typically maintained by the database and automatically update whenever a row changes. Be cautious, sometimes they don’t update, and this can cause inconsistencies.

This simplifies our future queries quite a bit. Now we can filter on data updated since our last sync.

```
select * from customers
// if incremental run
where updated_at >= {{last_sync_date}}
```

### Data Storage and Encoding

Once the data has been queried, it needs to be saved. The key decision here is whether to save the data in a binary or text format. You’re already familiar with text formats: CSV and JSON are the most popular. The benefits of text formats are that they are easy to read for humans, but this comes at the expense of efficiency and ambiguity around data types.

If you’ve ever had to parse the text “01-03-12” into a date format, you’ll appreciate the horrors of ambiguity. The structure of JSON also makes for large files as keys are repeated for every row.

Binary formats solve these issues by encoding data in a machine-readable format. Binary formats encode the data’s schema and types and offer more efficient storage of data. Parquet, for example, offers techniques like column-level compression and bit-packing. But nothing is every easy when it comes to data.

Parquet has a few well-defined standard types. Your typical types such as INT and FLOAT along with strings, dates, and timestamps are all well supported. The problem is your database may not have the same type system. For example, Postgres has the [inet and cidr](https://www.postgresql.org/docs/current/datatype-net-types.html) types which are ways of encoding network addresses.

Here you may wish to resort to trusty strings for unknown data types by default, allowing downstream to cast these as needed or simply use them as is.

To extract the data into parquet, you could use a wonderful little like [pg2parquet](https://github.com/exyi/pg2parquet) which can take either a table or a query and output a parquet file, or even take advantage of DuckDB’s [Postgres scanner.](https://duckdb.org/2022/09/30/postgres-scanner.html)

With pg2parquet, you can extract an entire table in a single line:

```
 pg2parquet export 
     --table businesses \
     -H $POSTGRES_HOST \
     -U $POSTGRES_USER \
     --password $POSTGRES_PASSWORD \
     -o ./businesses.parquet \
     --dbname can_i_haz_replica
```

You’ll want to save this to a persistent storage through your cloud provider, such as S3 or GCS for safe-keeping. Don’t let your hard work go to waste!

### Skipping Storage

Pedram, you might say, why store data twice? I could simply write each row to my data warehouse right away!

And you are correct, you could do this! In fact, if you think this is a good idea, I’d encourage you to try it. What you will eventually run into is a failure, and failures are never fun.

![](https://substack-post-media.s3.amazonaws.com/public/images/cb2e44ee-a025-47bf-9428-fbf73d6ae288_1424x656.png)

If you chose to write directly into the warehouse and something in the process failed, you’re left scratching your head. How do I debug this issue? What was the row that caused the issue? Can I even see what the data looked like? Why did I choose this career?

Instead, if you chose to write the data to an intermediate layer, you have some more options available to you. You can take the exact file that failed and inspect it, load it into a dev environment, scan for gremlins, and hopefully address them so that your pipeline becomes more robust to failures in the future. What a happy data engineer you’ve become!

## Loading Data

Loading data can be fraught with difficulties. You will need to insert new rows, updating existing rows, and delete removed rows. All of these actions require a primary key.

The MERGE DDL command allows you to perform all of the above in one go.

```
MERGE dataset.Inventory T
USING dataset.NewArrivals S
ON T.product = S.product
WHEN MATCHED THEN
  UPDATE SET quantity = T.quantity + S.quantity
WHEN NOT MATCHED THEN
  INSERT (product, quantity) VALUES(product, quantity)
```

Issues arise however whenever schemas change. New columns in your source data means tables must be altered before an insert. Even worse, if a source data type changes then you may have a bigger problem on your hands.

It can often be helpful to add helper columns as you load data, such as a timestamp of when the current batch was loaded, in case rollbacks are needed.

## Now do it all again

Let’s pretend this wonderful journey proceeded smoothly for you. The next question is, can you do it again tomorrow? Will you know if it ran successfully?

Doing a task once is much easier than doing a task every day. In my next post, we will look at orchestration and scheduling, and all the other bits that come with.

Until next time!

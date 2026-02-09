---
title: "Deep Dive: What the heck is Airflow"
description: "Deep Dive: What the heck is Airflow"
tags:
  - data
  - airflow
  - ai
author: Pedram Navid
authorTwitter: pdrmnvd
date: "2022-08-22T03:20:34.710Z"
category: data
---

This is the first installment in the Deep Dive series, where I go deep on a particular product or category. Some of these will be free, and some will be paid. This one is paid and was a special request by a paid subscriber. I hope you enjoy!

## A Short History of Orchestration

Apache Airflow is part of a class of tools called an orchestrator, but to understand what it is and why people use it, we need to travel back a little bit to its origin and Airbnb.

[Airflow was created in 2014](https://airflow.apache.org/docs/apache-airflow/stable/project.html) and released in 2015 at Airbnb. The original blog [announcing the release is still up](https://medium.com/airbnb-engineering/airflow-a-workflow-management-platform-46318b977fd8) and is a good resource for reminding ourselves of where Airflow came up and what the world was like then.

At Airbnb, data engineers used tools like [Apache Hive](https://medium.com/airbnb-engineering/data-infrastructure-at-airbnb-8adfb34f169c) as a data warehouse, with much of their infrastructure built on Hadoop and Spark. There were many problems to be solved and jobs to be done: data extraction, cleaning, quality checks, and long-term storage.

Airbnb was also performing a lot of computation. They needed to know everything from how guests felt about their accommodations to how their hosts felt about their guests. They needed to understand how well their recommendations were doing and whether their experiments were working well. They needed to compute sessions from all the clickstream data on both their app and the web.

Like what you’re reading? The rest of this article is only for paid subscribers.

All these different tasks need coordination and observability. Much like an Air Traffic Controller can direct planes, open and close runways, and work with ground crews to ensure air traffic flows smoothly, data systems need a Data Traffic Controller. This controller ensures all the various jobs that need to be done are completed in an organized and controlled manner. And when things go wrong, it’s important to be able to stop a flow, figure out what happened, and resume traffic when appropriate.

Let’s consider a typical pipeline of the time, such as metric analysis on the number of users who logged in daily through clickstream analysis.

1.  Sometime after 12:01 AM UTC we need to extract all the data for the prior day from our source system.
    
2.  We slice and dice this data a few ways, maybe by country, browser, device etc. For each aggregate, we count the unique visits and sessions.
    
3.  Then we take this data, save it somewhere and tell our systems that this new data is available and tell our downstream reporting systems to refresh using the latest data to update a dashboard.
    

Each step depends on the previous step completing successfully. For example, the typical way to accomplish a daily task might be using a [cron](https://en.wikipedia.org/wiki/Cron) and a [shell script](https://en.wikipedia.org/wiki/Shell_script). Maybe we have a dedicated machine whose sole job is to run this shell script every day sometime after midnight.

## When Everything Doesn’t Go Right

But what happens if step 1 fails? Maybe the extract failed because of a lost connection, or our machine ran out of storage? Our data engineer would notice the following day that the dashboards are still out-of-date after an analyst sends them a Slack message. So they SSH into the machine, look at the logs (you did save logs right?), find out what the issue was, fix it, and rerun the job manually.

What if step 1 fails and no one notices for two days? What if your shell script wasn’t idempotent? What if you failed at step 2, but your script always started from the beginning, making manual runs slow and expensive? What if you didn’t get a Slack notification but wanted an alert immediately? What if we now wanted to run two separate tasks after Step 1?

These and many other problems with our simplistic flow bred a breed of tools called orchestrators.

Whenever we have tasks that depend on each other in a directed, non-cyclic way, we have a DAG or a directed-acyclic-graph. A DAG workflow is a series of steps to follow in order based on the results of a previous step. There are no loops, so there’s always a place where we start and a place where we end.

![Apache Airflow - different components of Airflow work - Qubole](https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/dc8da285-6e61-4ab9-ae37-5ba139a96ea2_1021x481.jpeg)

Rather than define all these steps through a shell script, Airflow lets you define individual tasks within a single DAG. These tasks all have logs and status, so you can view what a particular job did, why it failed, and set rules around how many times to retry. You can also assign hooks to notify you if any task within a DAG fails.

What’s even nicer is that you can do all of this in Python, a programming language that gives you a lot of features shell scripting languages do not. You can start writing tests to ensure the logic in your DAGs is sound. You can configure your DAGs to run differently depending on their context and environment. Perhaps you have the same DAG running in staging and production environments but using different credentials.Airflow also comes with a web UI that allows you to visualize your pipelines, and monitor their progress day-by-day.

![_images/grid.png](https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/80659fcb-9ff2-46bb-a483-4c43cea4cc2e_2152x1944.png)

## Architecture

It can be helpful to understand the overall architecture of Airflow. There are a few components that are involved in a modern Airflow installation:

-   A Scheduler: this is a process that is responsible for making sure your DAGs run when scheduled, as well as ensuring the underlying Tasks within a DAG run
    
-   An Executor: this is the process responsible for running the actual tasks. In the most basic environments, your executor and scheduler run in the same environment, but it's common to split out execution and scheduling as execution often has higher resource requirements.
    
-   A webserver: this is the graphical UI that you visit that allows you to view your DAGs, their logs, and history, as to trigger manual runs
    
-   A metadata database: this is a database that stores information about your dags and tasks. The scheduler, executor, and web server use the metadata database to coordinate and communicate with each other.about your dags and tasks. It used by the scheduler, executor, and webserver.
    

To create a dag, you write a python file and save it into Airflow's DAGs folder.

```
with DAG('my_dag', start_date=some_day, schedule_interval=my_interval) as dag: 

  t1 = BashOperator(
    task_id='print_date',
    bash_command='date',
)

  t2 = BashOperator(
    task_id='sleep',
    depends_on_past=False,
    bash_command='sleep 5',
    retries=3,
)
```

Every minute, the scheduler reads all the files in your dag folder, parses the information, and decides whether the scheduler should trigger any tasks.

Schedules are one of the most confusing aspects of Airflow. For example, when creating a DAG with a `start_date` of January 1st, 2022, you might mistakenly believe that your dag will start on that date. The dag's actual run time is your `start_date + schedule_interval.`

If your dag is set to run every day, then the first time your dag will run will be January 2nd, 2022. The start\_date determines when the period starts, and the schedule\_interval determines how long the period is. The dag will only run after the period has ended.

If you think about the batch nature of the world Airflow lives in, this starts to make sense. You want to operate on all the data for January 1st, 2021, and after January 1st, 2021 is complete.

Executors determine where the processing of an Airflow job occurs. When Airbnb first created Airflow, the assumption was that the processing occurred elsewhere, and Airflow was just an orchestrator. For example, you would schedule data dumps to an S3 bucket or a remote Spark job to run and compile results. However, as Airflow gained adoption, more and more processing was being done within the Airflow environment itself.

It wasn't long until more executors were added that allowed you to execute processes elsewhere. The most common ones are the Celery and Kubernetes executors. These are both remote execution environments, Celery being a more traditional Pythonic way of invoking remote workers, while Kubernetes being a full-fledged cluster. With Kubernetes clusters, you have more fine-grained control over orchestration, like the ability to scale workers up and down as your processing needs change dynamically. Perhaps around midnight, you can spin up multiple nodes to handle the increased batch workloads while bringing those same nodes back down to 0 as processing stops during the day.

## Hooks, Operators, and Plugins

When developing Airflow DAGs, we need to understand a few core objects. The first is the Hook, a connection to a third-party system.

Classic examples of Hooks are the [HTTP Hook,](https://airflow.apache.org/docs/apache-airflow-providers-http/stable/_api/airflow/providers/http/hooks/http/index.html#module-airflow.providers.http.hooks.http) [Postgres Hook](https://airflow.apache.org/docs/apache-airflow-providers-postgres/stable/_api/airflow/providers/postgres/hooks/postgres/index.html#module-airflow.providers.postgres.hooks.postgres), and [S3 Hook](https://airflow.apache.org/docs/apache-airflow-providers-amazon/stable/_api/airflow/providers/amazon/aws/hooks/s3/index.html#module-airflow.providers.amazon.aws.hooks.s3). These all provide a connection to a backend system that is critical for many operations an Airflow task provides. Credentials are managed through the Airflow UI or via environment variables. They allow a safe and secure way of providing credentials without exposing them to the user or your Git repo.

The HTTP hook can call an HTTP endpoint with any standard HTTP method, for example, to call an API with a GET request.

The S3 Hook has many more possible methods, from fetching a list of keys in a bucket to loading objects to deleting and downloading files.

Operators are an abstraction around a Hook. Typically a task will use an operator to execute some operation. For example, an HTTP Operator may execute a call to an HTTP endpoint, but more complex operators might load data from [S3 to Redshift](https://airflow.apache.org/docs/apache-airflow-providers-amazon/stable/_api/airflow/providers/amazon/aws/transfers/s3_to_redshift/index.html#module-airflow.providers.amazon.aws.transfers.s3_to_redshift) using two Hooks.

Every Operator has a context that it can access, which Airflow passes to the Operator on runtime. When writing Airflow code, you can access it via Jinja templating and through the context object in the method. The [Template Reference](https://airflow.apache.org/docs/apache-airflow/stable/templates-ref.html) lists all these objects, and they offer everything from information on dates, parameters, and metadata about the DAG.

It’s common to find that a particular operation you need isn’t supported out of the box. If that is the case, you can write custom operators and hooks. It may be enough to add these within your code for narrow, focused development, but if you wish to distribute your code, you can create [Airflow Providers](https://airflow.apache.org/docs/apache-airflow-providers/), a new concept in Airflow 2.0.

You can see an example custom provider in the [Hightouch Airflow provider that I wrote.](https://github.com/hightouchio/airflow-provider-hightouch)

## Wrapping Up

As deep as this was, I felt I was only touching the surface of all Airflow can do. If you’re interested in learning more, I highly recommend reading through the [Airflow documentation](https://airflow.apache.org/docs/apache-airflow/stable/index.html) and [source code](https://airflow.apache.org/docs/apache-airflow/stable/_modules/airflow/models/baseoperator.html). The source code is surprisingly readable, and many issues you might encounter can be understood better by digging into how the code works.

You can also install Airflow locally. I recommend not using the Docker route if you’re starting but installing it using the [local install instructions](https://airflow.apache.org/docs/apache-airflow/stable/start/local.html). Try various methods for creating DAGs, including Bash and Python operators, to get a feel for how you can orchestrate tasks.

I hope this was helpful! If there’s anything else you want to deep dive on, [please reach out!](mailto:pedram@pedramnavid.com)

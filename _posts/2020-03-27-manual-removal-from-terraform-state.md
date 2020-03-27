---
layout: post
title: "Manual TFE state resource removal"
date: 2020-03-23 11:55:15
image: "/assets/img/"
description: Manually removing resources from remote TFE state
tags: [terraform, tfe]
categories:
twitter_text: Manually removing resources from remote TFE state
---

This post is generally aimed at needing to remove a resource from Terraform Enterprise remote state but can be applied to locally run Terraform just as easily.

I found an issue were a workspace which uses the Logzio Terraform provider had an alert in it's state that had been manually deleted from the Alert Definitions in Logz. Rather that repairing or deposing it, Terraform was throwing a 404 on the plan and wouldn't progress.

## Setting up the backend

{% include callout.html type="warning" content="Ensure that you are using the exact Terraform version as the remote state." %}

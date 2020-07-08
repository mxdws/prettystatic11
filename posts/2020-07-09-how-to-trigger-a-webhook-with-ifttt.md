---
title: How to Rebuild Your Website Everyday
excerpt: Using IFTTT with Netlify you can schedule a job to rebuild your website automatically.
date: 2020-07-09
permalink: /trigger-webhook-with-ifttt/
author: Martin Dawson
tags:
  - post
  - cron
  - webhook
  - static site generator
---

In this article I'm going to explain how to use IFTTT with Netlify to permform the same job as a CRON job might perform on a server. I've touched on the various ways of [deploying to Netlify](https://prettystatic.com/4-ways-to-deploy-your-static-site-with-netlify/) before, but this method is so simple and powerful, I thought I'd share how I use it.

For this blog, I make an effort to write multiple articles ahead of time so as there is a queue of them waiting to be published. I don't always succeed but the intention is there.

The idea is that if I have posts dated in the future, then when my site builds it will figure out what todays date is, and make that the latest post to be published, leaving all future posts unbuilt. 

This is how to set it up.

## Netlify

This blog is a static site and I host it on [Netlify](https://netlify.com). This means that Netlify grab my site code from Github, performs the build, produces a folder of static HTML pages and publishes those pages to their CDN, and all in a tiny amount of time.

To trigger a site build and deployment, you can login to Netlify, go to the Deploys section, and click the 'Trigger deploy' button. But even better, if you go in to 'Deploy Settings' there is a 'Build hooks' section, which give you a unique URL you can use to trigger a build. If you hit this URL, a build initiates for this site.

So all we have to do is hit this URL once a day, maybe early in the morning.

**Steps**

* Login to Netlify, go to your site, go ot the Deploys tab, and click on Deploy Settings
* Scroll down to the Build Hooks section, and click 'Add build hook'
* Give the build hook a name, choose which branch to build (in my case, master), and click 'Save'
* Copy the URL of your new Webhook
![Netlify Build Hook](/assets/img/trigger-webhook-with-ifttt/ifttt-11.png)

## IFTTT

The website [IFTTT](https://ifttt.com) is brilliant. IFTTT stands for If This Then That, and it couldn't be any more straight forward - when something happens, do something else.

In this case If it is 6am then call the build hook to build and deploy my site.

**Steps**
* Login to IFTTT, and in the top right-hand corner click 'Create'
![Login to IFTTT](/assets/img/trigger-webhook-with-ifttt/ifttt-1.png)
* You'll see a screen saying 'If This Then That'. Click on the '+This'.
![Click on This](/assets/img/trigger-webhook-with-ifttt/ifttt-2.png)
* Search for date, and you'll see a 'Date & Time' event. Click on that.
![Choose Date and Time](/assets/img/trigger-webhook-with-ifttt/ifttt-3.png)
* Now you'll see a selection of boxes to choose how often to run the job. We will choose 'Every day at'
![Choose Trigger](/assets/img/trigger-webhook-with-ifttt/ifttt-4.png)
* Next you need to choose the time in hours and minutes, then click Create Trigger.
![Choose Time](/assets/img/trigger-webhook-with-ifttt/ifttt-5.png)
* We have to choose what happens next. On the next screen click on the '+That' sign.
![Click That](/assets/img/trigger-webhook-with-ifttt/ifttt-6.png)
* Search for Webhooks, and select the Webhooks box, then select 'Make a web request'.
![Search for Webhooks](/assets/img/trigger-webhook-with-ifttt/ifttt-7.png)
* Paste the URL you copied from your Netlify Build Hook in the URL box.
![Paste the build hook URL](/assets/img/trigger-webhook-with-ifttt/ifttt-12.png)
* The Method we need to use is 'POST'.
* Click 'Create Action'.
![Finished](/assets/img/trigger-webhook-with-ifttt/ifttt-14.png)

## Conclusion

The beauty of this is that both Netlify and IFTTT are free to start with and their free tiers are very generous. If you start to build lots of sites very regularly then you might start running up a bill on both services, but in this case for a blog or two to be updated once or twice a day, you are probably going to be fine.

You used to have to set up a server for this, and there are still many advantages of having a server to do some of this stuff, but if you don't want to start getting waist deep in Linux then this combination will get you very far. 

This is just one use of both these services. There are so many more to explore so it's worth checking them out in more detail to see what other automation you can employ.








---
title: Static Sites Are Great!
excerpt: Why I am such an advocate for statically generated websites.
date: 2020-06-28
permalink: /static-websites-are-great/
author: Martin Dawson
tags:
  - post
  - static
---

This website is a static site, and it is generated using a Static Site Generator, called [Jekyll](https://jekyllrb.com/). I touched upon this [in another post I wrote about Jekyll](https://prettystatic.com/getting-started-with-jekyll/) but I really think static websites are both brilliant and underestimated, and I would like to spend the remainder of this post trying to say why.

## Definition

A static website is, in essence, a collection of documents written in HTML, CSS and Javascript, and stored somewhere that is publicly accessible like a web server, content delivery network (CDN), or a cloud service like Amazon Web Services (AWS). When you type in the address of that document, it is delivered as it was saved with no (or at least minimal) changes. It's a bit like going to your file manager on your computer, and opening a file.

It differs from, say, a dynamic website (like a Wordpress site) because when you want to view a webpage, the server gets a template, and some data from a database, and builds the page for you everytime you request it. Simply, the webpage does not exist at the point of request and instead it must be built for you, each and every time.

Both approaches have merit. Static sites are good for showing information that does not change that often, like your local bakerys address and phone number, where as a dynamic site can show information that updates frequently, like share prices and news.

## Dynamic Is Not Wrong

This post should not be interpretted as 'Static is right and Dynamic is wrong'. A dynamic website is a fine choice when considering how to build and host a website. The point of this post is to show how far static sites have come and the advantages of them, in my opinion. I am not building a wall and asking people to assemble either side of it.

This is my story, and why static sites appeal to me.

## Static Is More Flexible These Days

My first encounter with static site generators was in 2014 when [I was watching a video from DevTips on Youtube](https://www.youtube.com/watch?v=iWowJBRMtpc&t=2s). In it, the host [Travis Neilson](http://travisneilson.com/) talked about making his own website and that he used Jekyll to do so. He listed the advantages of this, and two in particular caught my attention - security and hosting.

### Security

A dynamic site has a webserver, a database, an admin page - there are lots of places to seek a vulnerability.

A static site generator takes markup and templates and turns them in to static webpages. This folder of webpages can be uploaded to a wide variety of places to be hosted. The original markup and templates stay where they are and do not need to be uploaded to the host at the same time. So if someone hacks the website, there is little they can do, because they are nowhere near the source files. 

Even if someone did hack your HTML, there is little that can be done, and if you deploy the site regularly, it will just overwrite anything the hackers did. Potentially you can regenerate yur site every hour, or even more frequently, at which point your site becomes completely refreshed.

A static website is a very secure choice.

### Hosting

To deploy a dynamic site, and I'm going to use [Wordpress](https://wordpress.org) as an example, you defnititely need a web server and on that server you need a database amongst other things. You need to get your hands dirty, and all of these things come at a cost. You will see lots of companies offering cheap hosting packages and servers, but you get what you pay for and these bargain basement priced hosts may well not be all they seem and there are numerous stories of these sites falling over when they get any sizeable traffic.

A static site, as I've mentioned many times already is a collection of files, and whilst you can pop these on a server, there are many other places you can put them; AWS S3 bucket, Github Pages, Netlify, Zeit, Firebase... even Dropbox. As a bonus, all of these options will host the files for free, and as all they are doing is serving files, if your site gets a spike in traffic then that volume should easily get accommodated with no performance sapping database requests to worry about.

Cheap, secure, robust and scalable - this is what caught my attention!

## Generators

So now I had found out the advantages of static sites, the next piece of the puzzle was the Static Site Generators (SSGs). All of the good things I have described above can be achieved with HTML files written in Notepad by hand, but the concept of the SSGs was to make this process more efficient. Specifically, the tutorial was focussed on Jekyll. By writing content in Markdown, and applying HTML templates using Shopify's Liquid Templating, it was easy to see the power of these generators and how they could supercharge the process of creating a website with multiple pages.

After installing Jekyll, you can then create a new site that throws out some placeholder content and a starter template that has a default theme. This post is not an in depth guide to Jekyll, but simply to demonstrate that you could get going so quickly from nothing, to hosting a smart looking blog very quickly. 

There was so much more; third-party themes and plugins easier, compilation of Sass and code minification as standard, and also support for data files in JSON, CSV or YAML format, which opens up worlds of possibilities.

For me, it felt like some of the barriers had been knocked down to owning and publishing content. And that was just the start.

## The JAMStack and Netlify

Around the same sort of time, a word kept on cropping up, again and again. JAMStack where 'JAM' was an acronym for Javascript, APIs and Markup. The point of the JAMStack seemed to be to deliver HTML statically, but then to use Javascript in the browser to enrich the HTML by calling APIs and fetching data. Another word, Serverless, was also appearing and this went hand in hand with the concept of static sites and the JAMStack. 

I set up an account with a static hosting company that seemed to be doing something very interesting. The company, [Netlify](https://netlify.com) allowed you to create a static site by taking your Git repository, and cloning it in a container that has been instantiated briefly. Once in the container, Netlify runs a build command that you have specified, e.g. jekyll build, and then publishes the static files generated to a CDN. It then lets you link a custom domain and set up SSL encryption with a single click of a button. To someone who had set up Apache or NGiNX configurations on a web server but still found it a faff, this company seemed to have made it also blissfully easy. As time has gone on, Netlify have added more support for things like user authentication, forms, analytics, and lambda functions.

It has not just been Netlify. There is another company doing something similar called [Zeit](https://zeit.co), and they offer a different flavour of serverless hosting. I will cover them in another post in the future because I really like what they do. 

All-in-all, the state of static was looking pretty good.

## A Podcast That Changed Everything

There is a podcast I listen to regularly called [Shop Talk](https://shoptalkshow.com/) where [Chris Coyier](https://chriscoyier.net/) and [Dave Rupert](https://daverupert.com/), two people whom I think have a great perspective on front-end web development, chat either amongst themselves or they chat to a guest. In 2018 I listened to [Episode 303](https://shoptalkshow.com/episodes/303-jam-stack-phil-hawksworth/) where they chatted to [Phil Hawksworth](https://www.hawksworx.com/) from Netlify, and he was talking about static sites and the JAMStack generally. The good thing about this episode was that the questions being asked were done so respectfully, but were very cleverly asking about common issues that people perceive how appropriate static sites are. This for me was an epiphany. There seemed to be a point at which the hosts had a genuine awakening that there is a great deal of power that static sites can offer, and plenty of complexity that can be taken away from the process. I too had the same realisation, and it just changed the way I think about potential projects that had been cooking away in my head. I would recommend you listen to it, and whilst I do not expect everyone to have the same realisation I did, it is certailnly revealing in what can be achieved and what is possible. 

## Conclusion

Static sites and their generators have made a difference to me. They have taken away some of the barriers that stood in the way of making websites. It is worth pointing out that this is in the context of what I do, and I am not trying to speak for everyone. I am a hobbyist web developer, and I enjoy coding, so a static site generator allows me to scratch that itch. I also make websites for friends and family, because I know that by using static sites, it is almost free. I am not an enterprise development team, or a creative agency, I do not run an e-commerce business, or a multi-authored digital publication. And I am not the founder of a startup. However, I believe that if I was any of those things, the evolution of static sites would allow me to do so by adopting serverless principles and the JAMStack.

But for someone like me who fits this kind of thing in between a day job, family, and exercise, having tools that are cheap and easy to get off the ground, mean I can spend more of my time creating stuff without worrying about the complexities of supporting infrastructure.


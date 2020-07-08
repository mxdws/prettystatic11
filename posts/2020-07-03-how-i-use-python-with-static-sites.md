---
title: Why I Use Python With Static Sites
excerpt: How I landed on Python to assist with generating sites after stumbling with Javascript and Bash
date: 2020-07-03
permalink: /python-with-static-sites/
author: Martin Dawson
tags:
  - post
  - python
  - static site generators
---

At the moment, my favourite language is Python. It just clicks for me, and it feels like a nice multi-tool of server side languages that ticks most of the boxes I need, so as I can achieve success in the projects I want to pursue. 

## Javascript

I have been coding for years... actually, decades, however my releationship with Python only started in the last year. You might call the relationship something of a rebound, following a slightly turbulent affair with Javascript. We - that's me and Javascript - still talk to each other, but it's complicated.

I turned to Python whilst exploring how to hydrate one of my websites with data. I had originally started trying to do this using Javascript, and had some success, but I reached a bit of a dead end. What I was trying to do was have a script that fetched data from an API endpoint and then saved it to a local file. Using Javascript I was able to do this, however when I needed to loop through a selection of endpoints, I ran into trouble because the of the synchronous nature of the language, and I got in a very messy situation. It was frustrating, and at the time, I wasn't able to get round it due to my own failings and quite frankly I didn't have the patience to persist. 

So I gave up on it. I didn't have the patience becuase I lacked time. I was coding 'on the side' and wanted to progress so I decided to abandon Javascript, but just for that project. I knew I would probably overcome the issues I had, and actually I have learned from my mistakes and persisted with Javascript on other projects. Let's face it, if you want to make websites, you will probably need to write some Javascript at somepoint, and to declare that you will never use it again would be unwise. Leaving it a while and revisiting it with fresh eyes turned out to be a valuable exercise.

## Bash 

I quickly came up with an alternative: bash. I realised I could just do a 'curl' or a 'wget' to fetch data from an endpoint and then save it locally. Bingo!

The context of this was that I had a [Jekyll](https://jekyllrb.com) site, and prior to generating the site, I needed to get data to store in the '_data' folder so that Jekyll could build the site. I had tried Javascript because I figured that I could use Gulp as the build tool for my site. But as I mentioned previously, that plan had come unstuck.

So why bash instead? Well, I had been pinging the API endpoints from the command line using curl, and seeing as I was hosting my site with [Netlify](https://netlify.com), I concluded that a bash script could run on a [Netlify](https://netlify.com) container as the base image was Ubuntu. So that's what I did, but it wasn't as elegant a solution as I wanted, mainly because:

* bash is great, but it wasn't what I was after to manipulate and transform the data after I had fetched it
* everytime I committed to git, it was a bit of a nuisance to change the script to be executable once added. It was only an extra line of code in the commit, but I still found ti awkward
* the added cumbersome nature of using bash just made me short of patience, because all the time I was wanting to make the site, I instead found that I was hacking at something that just was never going to deliver what I wanted

I'm happy that I know enough about bash and how to use it, for it to be useful in other projects, but this wasn't the project for me to use it on. So I banked that knowledge and moved on to my next language, Python, based on something a friend said to me - 'As soon as I started learning it, I didn't have to think about it.'

## Python

And the rest is history. I love Python. I found the 'requests' module and used that to hit the APIs I needed - job done. But then I could manipulate that data so easily, and transform it in to the shape I needed for my website. Following on from that, I could move some of the complex logic that I had been using within the Jekyll templates with the Liquid templating language, and let Python churn through that before offering it up to Jekyll to render a lot quicker. The things I like about Python are:

* If you've got Linux, you've got Python. I do not have to worry about installation.
* I do not need to make Python scripts executable. They will just run.
* Python can do anything! Everything I've needed to do - manipulating data, strings, file management, http requests - Python has been able to do it, and do it fast. I know there are plenty of people that will say other languages are quicker, which is true, but for what I need, Python will rip through anything I throw at it.
* Probably one of the most important things for me - I'm fast in Python. The syntax feels friendly and make sense to my brain, and so all I have to do to realise my goals is to just find the time and code the solution.
* To run it on [Netlify](https://netlify.com), I just need a requirements.txt file in the root with my dependencies, a runtime.txt file stating the version I'm using, and then set the build command to 'python3 myscript.py && jekyll build'. It might sound a bit over the top but I effectively wrote my own build tool. All my Python script was doing was the same jobs as what I wanted my Gulp script to do, had I succeeded with my Javascript.

As I iterated over that project, I abandoned Jekyll completely, and wrote my own custom Static Site Generator that is specific to the task I had. That might sound like over engineering, but if you think about the fact that most Static Site Generators are designed to be configurable to serve so many differentt requirements, a custom solution can be much more lean and, for me at least, much faster. And Python is well placed to write such a tool with comparative ease. 

## Conclusion

This conclusion is not going to advocate that anybody reading this article should drop whatever language they are using and start writing Python. The main lesson of this experience is that there are a lot of tools and languages out there, and you can iterate throught them to see what is right for you and for the job. I've had projects since this experience where I've used Javascript because that is the right tool for the job. I've managed servers where I have bash scripts doing automated tasks for me. 

No experience is wasted, and nothing lasts forever, so don't be afraid to try other things.







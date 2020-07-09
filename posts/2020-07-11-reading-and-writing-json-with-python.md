---
title: Reading and Writing JSON Files with Python
excerpt: Grabbing data in JSON format from an API and storing it in files can be very useful, and here is the Python code that will do it. 
date: 2020-07-11
permalink: /reading-and-writing-json-with-python/
author: Martin Dawson
tags:
  - post
  - python
  - json
  - api
---

## Introduction

Something that has always drawn me to Static websites is the ability to combine HTML templates with structured data to generate web pages quickly and easily. It means that as long as I can find an API to call as a data source, I can fetch the data once, and build the website using the data. This is different to calling an API from a browser everytime a user hits a URL.

For example, if I build a website showing some football scores and standings, and 100,000 people visit it, a website where an API is called every time a user goes to the URL will make 100,000 calls to the API. However, with a static site, I'll only call the API once and then make the static site available, which is less resource intensive on the browser.

There are pros and cons to this, for example it's not going to help if you have user specific information, and require authorization. Nor is it helpful if you have fast changing data, like football scores, where a site might have to be built every minute or even more often. But depending on what you want to do, it is definitely something to consider.

When I build websites like this, I split the build process in two. First, I fetch the data and save it, and then I build the site. I could do this all at once, but I feel safer splitting it in two, especially when I selectively request data. In my example where I have a football scores website, if there are 38 games in a season, and it is game week 38, I only need to request the most current games. It would be too much to start with no data, and fetch all games - including the data for the majority of games that have completed already.

## Objectives

In this article I'm going to assume you have fetched your data in JSON format, and I'll just explain how to:

* write JSON to a file
* open a file and read the JSON from it

Whenever I fetch data I use the Python programming language to do it, so Python (to be more precise Python 3.8) is what I will use in this article.

## Writing JSON to a File

We need some dummy data to work with, so we can make a list called `myData`:

  myData = [
    {
      "country": "England",
      "capital": "London"
    },
    {
      "country": "France",
      "capital": "Paris"
    },
    {
      "country": "Sweden",
      "capital": "Stockholm"
    },
  ]

In order to deal with JSON in Python, the first thing to do is import the `json` module from the Python Standard Library.

  import json

Within the `json` module, I am going to use `json.dump` which will quite literally dump the JSON in a file that I've opened. It looks like this.

  with open("data.json", "w", encoding='utf8') as f:
    json.dump(myData, f, ensure_ascii=False)

Notice that I've specified the encoding as UTF-8 and also set `ensure_ascii=False` which, for me at least, sorts out some of the funny characters you get sometimes. 

In my experience, it's always worth running this and seeing what the data looks like, to satisfy yourself that the data you're fetching has been transported safely. You might need to make some tweaks depending on what you are trying to fetch.

## Reading JSON from a File

Now we've saved some JSON to a file, and it was all pretty painless. Reading it is going to be even easier.

We are still using the `json` module, but instead of dumping the json, we are loading it.

  with open('data.json') as f:
    loadedData = json.load(f)

And that's it. We have loaded our data again and it is ready to use.

## Conclusion

This might seem like a very basic, unsophisticated example, but it can be seriously powerful. If you combine this with fetching data from an API, then very quickly you can have lots of lovely, lovely data at your fingertips and you can concentrate on how to present it on your website.

Even better, you can trigger all of these steps with [webhooks](https://prettystatic.com/trigger-webhook-with-ifttt/) or cloud functions and you can have your data-rich website refreshing every hour, every day, every week, without you having to do much at all, leaving you to work on something else... or sleep. Whatever floats your boat!







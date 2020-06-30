---
title: Scraping Spotify using Python
excerpt: How to use the Beautiful Soup package to extract data items from a website
date: 2019-11-01
slug: scraping-spotify-using-python
author: Martin Dawson
---

### This article is also posted on a website I created called [foalio.xyz](https://foalio.xyz) - it is my thinking around how and why I wanted to make that website

My sister posted that she was keen on [Foals](https://foals.co.uk) new album. 

Knowing that if she likes them, then I probably would too, I went to [Spotify](https://open.spotify.com/playlist/4TH8QdZAVk1FrqPSwhcgie) to see the Discography of Foals. I liked the look of their album covers, but Spotify (like other sites) has so much stuff going on, it all felt crowded. So I thought it would be nice to try and put them in a grid, and see what they looked like. And Voila!

![Foal's Discography on Spotify](/assets/img/2019-11-01-scraping-spotify-using-python/spotify-foals.png)

My real motivation was to do all this quickly, by writing a Python script to go to the page, get all the images from the HTML and then make the site statically using [Eleventy](https://11ty.io).

## The Foals Goal

Spotify has an API - an Application Program Interface - which means that they sort of share their data in a way that people other than Spotify can use, to make third-party applications for example. But in order to use it, you have to sign up and register for a key, and all sorts. All I wanted was the album art work and I figured that is on the Spotify website, so I just had to find it.

## View Source

My investigations started by looking at the source code. Somehow the good people as Spotify probably do not want you to do this, and where as on most websites you can right-click on the screen to find the pafge source, they've made it so as it is not that easy on theirs.

Not to worry! I was looking to do this all programatically anyway, so heading over to the Terminal on my Mac, I simply typed...

    curl https://open.spotify.com/artist/6FQqZYVfTNQ1pCqfkwVFEa > foals.html

... and we're off to the races.

![Spotify websites source code](/assets/img/2019-11-01-scraping-spotify-using-python/spotify-source.png)

## Extracting the data

So I've got the source code, and somehere in there is an image tag with the source address of the album cover art. I need to find it, extract the data I need, and dump that in a data file to use later.

To do this, I turned to Python to do the job. There is a Python package called Beautiful Soup, which parses a web page and allows you to navigate your way through the page in a sturctured logical way, assuming the website has been developed in a structured logical way. 

If you do not already know, website code is written in a nested fashion, and the code - HMTL - should be written in such a way that there is a logic to the structure, so my assumption is that the Albums will be:

* Their own section which has an identifying characteristic,
* Be in some kind of list, and 
* each album will have their own item in the list

Sure enough, the albums are in a section under an **h3** tag, but they are not nested in that tag. There is a skewy way to get the data required though. In Python, you have to use Beautiful Soup to:

* Find the `h3` tag which has a text attribute of 'Albums'
* Find the **parent** of that element which is a **section** tag
* That section tag contains a list element and within that are individual list item elements for each album
* Those albums then contain data like url, album name, and importantly, the link to the album to play on Spotify. I want to make my website as a mini project, but if anybody ever visits the site, they can click the album and be taken straight to the source on Spotify.
* Download the picture and save it for later

If you are interested in the Python code, this is what it looks like.

    import json
    import requests
    from bs4 import BeautifulSoup

    # Open the Spotify source code file
    with open("foals.html") as fp:
        soup = BeautifulSoup(fp,features="html.parser")

    # Find the h3 tag with text of Albums
    albumHeading = soup.find("h3", string="Albums")

    # Get the h3 tags parent section
    albumSection = albumHeading.find_parent("section")

    # Find all list items in the album section
    albums = albumSection.findAll("li")

    # Iterate through each album and get the data needed
    albumObj = []
    for album in albums:
        atag = album.find("a")
        href = f"{atag['href']}"
        albumName = atag['alt']
        albumSlug = albumName.replace(" ","-").lower()
        albumData = atag.find("div", {"class": "grid-item-image"})
        albumImage = albumData['data-src']
        albumDetails = {
            "albumName": albumName,
            "albumLink": href,
            "albumSlug": albumSlug,
            "albumImageUrl": albumImage
        }

        albumObj.append(albumDetails)

        print(albumName, albumImage, href)

        # Download the image at the image URL and save it in an images folder
        pic = requests.get(f"http:{albumImage}")
        if pic.status_code == 200:
            with open(f"./assets/img/{albumSlug}.jpg", 'wb') as f:
                f.write(pic.content)

    # Store all the data collected for use later on
    with open('./_data/albums.json','w') as f:
        data = json.dump(albumObj, f)

I hope that makes sense.

## Building the website

So now I've got all the data, I want to create a website which just shows the artwork in a grid for the time being. To do this I decided to use a Static Site Generator called [Eleventy](https://11ty.io). In the past [I've written about how to use Jekyll](https://prettystatic.com/2019/09/20/getting-started-with-jekyll/) on my [development blog](https://prettystatic.com), but I wanted to branch out a bit and where as Jekyll is written in Ruby, Eleventy is written in Javascript and I needed a little project to take it for a spin. I'll briefly describe what Eleventy does for me.

A Static Site Generator just takes a load of input, like structured data or text, runs it through a load of templates and then spits out a website. The downside is you have to write the templates in a templating language called Liquid, the HTML and CSS, but I've got some boilerplates to kick things off for small sites like this.

## Deploy the site

The last thing is to deploy it. I use Static Site Generators because they are easy and cheap to deploy, and I tend to just use a company called [Netlify](https://netlify.com). They are a static host, and [provide a number of ways to deploy your site](https://prettystatic.com/2019/10/03/4-ways-to-deploy-your-static-site-with-netlify-copy/). 

In this case I just dragged my static files to their website and they did the rest.

And to make it official, I bought a cheap domain name and hooked it up - [foalio.xyz](https://foalio.xyz). Overkill? Maybe, but it's a low cost project, and the domain cost me less than one pound, so I've made my peace with it.

![Foalio home page](/assets/img/2019-11-01-scraping-spotify-using-python/foalio-home.png)

## Conclusion

I didn't do this because I'm particularly 'into' this band. I did it more because I wanted a little project to try out a few things I'd been looking at recently. I've never used beautiful soup before, so this seemed like a nice way to take it for a spin. It's pretty powerful and I'll use it again probably now I know how versatile it is and how to apply it to a situation.

I doubt anyone will really see this website, but I'm glad I made it, and that's really all that matters. If, by chance, anyone does see it, I hope you enjoyed it :-)

Here is the video I made about it:

<iframe width="560" height="315" src="https://www.youtube.com/embed/RrQQEhlFt5E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

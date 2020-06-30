---
title: Automate the Spotify API With Python
excerpt: Using the Python Requests library, let's see how you might go about fetching some data from Spotify
date: 2020-06-30
slug: automate-the-spotify-api-with-python
author: Martin Dawson
---

## Automate the Spotify API With Python

I made a [previous post](https://prettystatic.com/blog/2019-11-01-scraping-spotify-using-python/) and a [video to explain how to scrape the Spotify website by using the Beautiful Soup library with Python]((https://www.youtube.com/watch?v=RrQQEhlFt5E&t=114s)) so as I could return some pieces of information about a band. When I posted it to Reddit, someone made a comment asking why didn’t I just use Spotify’s API, which is a valid point.

So I’m going to try and explain how you can use Spotify’s API with the Python Requests library, to fetch data.

## API vs Scraping
First, why might we want to use the API to harvest data, rather than scraping the website? 

First, it’s more official. Sometimes scraping is a grey area, and if someone provides an API, they would rather you use it than scraping. Then they are able to control who can access it, monitor usage and make sure they have the capacity to support the usage and keep the system up and running.

Also, you’re likely to get access to more data, and in a more structured way, so you might think that you only want an album name and cover art, but if you decide you want to expand, it’s just a new API endpoint that you need to call and use the data accordingly.

For me the main reason is that the API is much more reliable. I’ve actually scraped the Spotify website for a few projects over the last year, and the way that the website HTML is written has changed, meaning that what worked once might not work again. I wrote an article about scraping Spotify in October of 2019, 6 months before I made the video about the same process. And in that time, some of the key items have changed. For example the Albums heading was an h2 tag, and now it’s in an h3 tag. If you were relying on that structure, you’d be a bit frustrated when it changed without warning.

When a company like Spotify provide an API, the structure is much more reliable and the chances of it changing dramatically are very low. Spotify themselves use this API for their website, and other third parties pay for the service so if any significant changes are coming down the line, there will at least be some notice.

Ultimately if you have the choice between an API and scraping to gather data, the API is easily your best bet. Unless, like me you had an itch that you wanted to scratch by scraping.

## Objective
The aim of this tutorial is to show you how to use the Spotify API using the Client Credentials authorisation flow. This is on the Spotify website as one of the four ways that you can authenticate. Once we’ve authenticated, we can call one of the API endpoints to return some data.

# What's The Plan?
Here's how we're aiming to get data from the Spotify API:
- Look at the documentation to see how authentication works
- Setup a Spotify Account and use it to create a new App for our website
- Get the Client Id and Client Secret
- Use Python Requests to obtain authorisation token
- Use Authorisation Token to retrieve information from endpoints

## Documentation
The first thing to look at before I do anything, is to look at the documentation, and this can be found at [https://developer.spotify.com](https://developer.spotify.com)

This might sound dull, but if a company provide an API then they probably provide documentation to show how to use it. This should include information on authentication and endpoints which is what we’ll be interested in.

There are a number of ways to obtain authentication, but I’m going to use the Client Credentials Flow, which is like a server to server authentication. It means I will not be able to update private user data, and I can only access tracks, artists, playlists, etc. But this is fine for what I want to do here.

My use case is that once I’ve got the data, I’d probably use it to create a static website, so I’ll just be making one or two calls when the site is built, and that’s it. This is unlike the Web API which requires user authentication, and this will hit the API every time the page is loaded, so would be significantly higher volume of API calls. 

The way this works is that you create an App in your dashboard, and that App has a Client Id and Client Secret. When you want to make API calls, firstly you encode your Client Id and Secret as Base64 and post it to Spotify with some other information. If everything is ok, they will send you back an Access Token. Then, using this Access Token as authentication, you can request information from the API endpoints.

So first things first, we need to login to your Spotify Account at the [Spotify for Developers website](https://developer.spotify.com), head to your dashboard, and once we’ve done that we can create an App. 

I created an App called Pretty Playlists and it has a Client Id and Client Secret. It’s handy that they have an option for resetting your secret just in case you, for example, make a YouTube video and reveal the secret. 

The next step is to obtain the Access Token. 

If we look at the documentation it says we need to make a Post request to the endpoint https://accounts.spotify.com/api/token and as part of that request we need to send an Authorization Header Parameter, and a Request Body parameter for the Grant Type.

It’s at this point we can actually start writing some Python.

In order to make the API requests, there is a library called Requests that we have to install that makes this very easy. It’s not part of the Standard Library, so we’ll install it by typing the following at the command line:

	pip3 install requests

And at the top of my Python code, I’ll import that.
	import requests

So when you make a request, you need to send a number of parameters.
First, the URL endpoint you are calling. Secondly, you might need to send headers, that will send information like Access Tokens, amongst other things. Also, you can send and data that needs to be part of the payload. 

In the documentation it has shown an example cURL request that has -h and -d arguments which represent the headers and data respectively of the Post request so we’ll use that to help us.

I’m then going to create three variables.

* url which I’m going to set to `[https://accounts.spotify.com/api/token]`
* headers and data which are both going to be empty dictionaries for the moment

And this is what they look like:

	url = 'https//accounts.spotify.com/api/token
	headers = {}
	data = {}

The header has to be the Authorisation and the documentation says it needs to be a Base64 encoded string that contains the client id and client secret.

Now, I didn’t know how to do this, so a quick Google meant I found [this article](https://stackabuse.com/encoding-and-decoding-base64-strings-in-python/) which informed me that in order to encode something as Base64 you need to use the Base64 module that is part of the Standard Library.

	import base64

The reason it is Base64 encoded is because it’s a popular way to encode binary data to ASCII characters, but the article I found has a much much better explanation of it.

It also says how you do it, and I shamelessly copied that.

First you take the string you want to encode. In this instance, it’s the client ID and client secret. 

For security if I’ve got any sensitive information like this, whilst I’m developing code, I just store them as variables in a separate file and I import them to my code. In this case, I’ve made a file called secrets.py, with my secrets in, and I’ll import the variables to this code.

My secrets.py file has the following lines:

	clientId = "myClientID"
	clientSecret = "myClientSecret"

And I imported this to my python code by adding the following line at the top:

	from secrets import *

Ok, back to the encoding. So the message to encode will be:

	message = f"{clientId}:{clientSecret}"
	
Then you take that message and convert it to bytes

	messageBytes = message.encode('ascii')

Next, we Base64 encode it:

	base64Bytes = base64.b64encode(messageBytes)

And then we convert those bytes back to a string

	base64Message = base64Bytes.decode('ascii')

That’s the nasty bit done, and we can plug that in to our header dictionary.

Our data dictionary needs to have a key value pair of grant_type = client_credentials

So the last thing we need to do is to put this all in to a Post request.

	r = requests.post(url, headers=headers, data=data)

To interpret the response we’ll need the json module too, so let’s make sure that has been imported.

	import json

And we’ll print out the response to see what that returns. If it errors, we’ll know, or if the response is 401 or something like that we will know that something has gone a bit wrong because it that HTTP status code is to do with user permissions.

	print(json.dumps(r.json(), indent=2))

Excellent!! We have been sent back an Access Token, so now we can use that to request some information.

We can extract the Access Token from the json by typing:

	token = r.json()['access_token']

Ok, so the last thing we need to do now is use that Access Token to call the API and return playlist information, so let’s do that. 

If we look at the documentation, we can see that to get playlist information we need to use the URL endpoint for playlists, and specify the playlist id when making the call. The end point looks like this:

	https://api.spotify.com/v1/playlists/{playlistId}

I created a playlist and got the ID from the the sharing link and have plugged this in to my code.

This time the call is going to be a GET request rather than a POST, and the Authorisation is Bearer rather than Basic which we need to incorporate in to the headers object. We don’t need to send any data this time.

	playlistId = "myPlaylistId"
	playlistUrl = f"https://api.spotify.com/v1/playlists/{playlistId}"
	
	headers = {
	    "Authorization": "Bearer " + token
	}
	
	res = requests.get(url=playlistUrl, headers=headers)

And printing it out, should give us all the data that is associated with that playlist:

	print(json.dumps(res.json(), indent=2))

## Conclusion

I love API’s because they are so powerful and you can create nice websites from the data that is fetched.

I’m going to use this playlist data to create a static website with list of tracks on it, but you could go as far as creating a third-party app for Spotify with their API. 

The same principles can be applied to most APIs of this nature, and in my experience, if you choose one and make a little project, you can see just what potential this simple concept has.

Here is all the code:

	import requests
	import base64
	import json
	from secrets import *
	
	# Step 1 - Authorization 
	url = "https://accounts.spotify.com/api/token"
	headers = {}
	data = {}
	
	# Encode as Base64
	message = f"{clientId}:{clientSecret}"
	messageBytes = message.encode('ascii')
	base64Bytes = base64.b64encode(messageBytes)
	base64Message = base64Bytes.decode('ascii')
	
	
	headers['Authorization'] = f"Basic {base64Message}"
	data['grant_type'] = "client_credentials"
	
	r = requests.post(url, headers=headers, data=data)
	
	token = r.json()['access_token']
	
	# Step 2 - Use Access Token to call playlist endpoint
	
	playlistId = "myPlaylistId"
	playlistUrl = f"https://api.spotify.com/v1/playlists/{playlistId}"
	headers = {
	    "Authorization": "Bearer " + token
	}
	
	res = requests.get(url=playlistUrl, headers=headers)
	
	print(json.dumps(res.json(), indent=2))
	

Here is the video I made about it:

<iframe width="560" height="315" src="https://www.youtube.com/embed/9mKAAWRheTA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
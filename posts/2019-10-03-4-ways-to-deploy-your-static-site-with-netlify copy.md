---
title: 4 Ways To Deploy Your Static Site with Netlify
excerpt: Some different approaches to get your website live with Netlify
date: 2019-10-03
slug: 4-ways-to-deploy-your-static-site-with-netlify
author: Martin Dawson
---

For me, [Netlify](https://netlify.com) is brilliant. If you like building static sites and store your code on Github, then the it is a piece of cake to deploy to Netlify. As I've used it more, I've realised I needed to bend and stretch things a little, and throw in a bit of Python, to get what I want, and I figured it would be useful to demonstrate what can be done. 

## Under the hood

The way I approached some of these solutions was really to not think of Netlify as a service that you use via their dashboard, but rather to treat it as a Linux box on which I can do all kinds of things. Linux is versatile, and if you can type in a command on an Ubuntu distribution, then that command should be understood by the container that Netlify uses to build your website. This is part of the reason for using Python, because it comes as standard within Linux, so no extra intallations to do. Plus, it's such a lovely language to work with, in my opinion.

## 1. Drag and Drop

You can't get more quick and dirty than drag and drop. But who cares?! It works. I've demonstrated sites to friends, colleagues and clients using this method because it gets the job done... fast. Just navigate to the Sites tab of your dashboard and drag a folder of files on to it, and away you go. Netlify does it's thing, and you've got a website live. If you get anything wrong, you can update it by going to that site's Deploy tab and dragging the folder in there again, after corrections, obviously.

## 2. Connect to your Git repository

This method is arguably the one that has gained notoriety for being a game changer. 

Within the Sites tab, click the big 'New site from Git' button, and you'll then be asked to connect to Github, Gitlab or Bitbucket and then choose the repository that you want to link to. Following that you will be asked which branch you wish to deploy from, what your build command is and your publish directory, and you're good to go. Click 'Deploy Site' and the magic will begin.

For example, if you (like me) have a Jekyll site, then your build command will be 'jekyll build' and your publish directory to be '_site'. After entering this information and clicking 'Deploy Site', a deployment will begin where Netlify takes an Ubuntu build image, and installs everything that is required, clones your git repository, runs the build command and then whatever ends up in the publish directory will be published and available on a URL, that you will see on the 'Deploys' tab of your dashboard.

One of the brilliant things about this method, is that if you make any changes that get committed to your repository, then this will trigger a fresh deploy on Netlify and the site will be built again, from sratch and deployed to the same URL. 

Magic!

## 3. From the Command Line

In the terminal, it is possible to install Netlify command line tools. Once these are installed, you can login to your account and make deployments from within the terminal window. How do you do this? Let's see.

Install the tools by running:

    npm install netlify-cli -g

Next, login to your account:

    netlify login

Navigate to your website folder and run a manual deploy:

    # The default command will deploy a draft of the site
    netlify deploy

    # To deploy a live version, specify the prod flag
    netlify deploy --prod

    # Specify a particular site to deploy to
    netlify deploy --site={siteId}

    # Specify a folder to deploy from
    netlify deploy --dir=_site --prod

Netlify has its own [documentation](https://www.netlify.com/docs/cli/) that goes into more depth, and it is worth having a play with this to see if it could be useful for your workflow.

It's worth noting that I found the command line tools a little buggy, which really knocked my confidence of using this method consistently. I didn't get too bogged down in the bugs, and instead quickly moved on to other things. But try it out for yourself and make your own judgement.

## 4. Use the Netlify API

Netlify has an API, and it works well. In fact, it is used to power your dashboard that you will see when logged in to Netlify's website.

My only problem with it is that I could not really use the [documentation](https://www.netlify.com/docs/api/) very well, leaving me a little bit puzzled of the way to use the API. It is not to say the documentation is bad, but just that I struggled with it. Another person might breeze through it.

But I found a way to get what I wanted.

The most efficient way to deploy via the API is to send a digest of every file in your deploy, and then upload any files that Netlify does not already have. This is the one I struggled with. I have not given up on it, but I found I was getting nowhere.

The other way to deploy is to zip up the website, post it to Netlify who will then just unzip it and deploy. This is what I went with. The feasibility of this will depend on the size of your site, and as mine is not too massive, this works for me.

I decided to do this with a Python script. All I need is:

* Authorisation token. You can get this from your account dashboard, by clicking on your user and creating a Personal Access Token
* Site ID. Again this is available in the dashboard within your Site settings
* Zipped file of your deployment folder

So starting to create this in Python 3.7, I assigned those details to variables:

    siteId = 'this-is-the-site-id-from-the-dashboard'
    token = 'this-is-a-64-digit-string-from-the-dashboard'

I'm going to use Pythons requests library, so I'll set up the headers of the request:

    headers = { 
        "Content-Type": "application/zip",
        "Authorization": "Bearer " + token
    }

Then I need to zip my folder up. It is easy in Python, by using the 'shutil' module from Python's Standard Library:

    # make_archive makes a zip file of a folder
    shutil.make_archive('_site', 'zip', './_site')

Finally, open up that file, read the contents and then make a POST request to the Netlify REST Endpoint, specifying the headers and data to send:

    # Open the zip file just created, and read the binary contents
    data = open('_site.zip','rb').read()

    # The api URL to post the zip file to
    url = f"https://api.netlify.com/api/v1/sites/{siteId}/deploys"

    # Using requests library, post the binary data
    r = requests.request('POST', url, headers=headers, data=data)

To clean up, I used Python to remove the zip file, seeing as it is no longer needed post-deployment:

    # Finally, delete the zip file
    os.remove('_site.zip')

And your deployment is done.

## Conclusion

There is so much more to all of these options - settings can be tweaked, parameters can be set - but it is not possible to go into every nook and cranny as part of this article. 

I find that for blogs, the second option directly linking to the repo works really well.

The final option is one that I have found to be very powerful. In a 'best of both worlds' situation, I have a number of websites on a server that fetches data regularly and builds static pages off the back of those fetches, but it feels too heavy handed to have those in a repo being built from scratch all the time. I would easily exceed my already generous free quotas from Netlify, so having a cheap server doing the heavy lifting and storing some persistent data that is updated periodically, followed by a quick deployment of the zipped up static files, gives me a good solution. 

You won't read about that sort of solution in the official documentation, so that is why I've tried to get that message over as part of this article. Think a bit outside the box and change the way you look at the tools at your disposal. 




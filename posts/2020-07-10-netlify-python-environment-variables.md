---
title: Using Environment Variables with Python in Netlify
excerpt: Netlify has well documented examples of using their environment variables functionality with Javascript, but not much information for the other languages supported. Here is my experience of using Netlify environment variables with Python.
date: 2020-07-10
permalink: /python-environment-variables-with-netlify/
author: Martin Dawson
tags:
  - post
  - python
  - netlify
---

## Introduction

I have [mentioned in previous posts](https://prettystatic.com/4-ways-to-deploy-your-static-site-with-netlify/) that I use Netlify to host my static sites, and I make no secret of the fact that I am a big fan of the company. Most of the blog posts, tutorials and articles that I stumble across, talk about how brilliant it is when used in conjunction with Javascript and indeed a lot of the well publicised examples show deployments of websites made using React, Vue and Gatsby, utilising Netlify Functions (i.e. neatly wrapped [AWS Lambda](https://aws.amazon.com/lambda/) functions written in Javascript) too.

But in the few years I've been using Netlify, my programming language of choice has been Python, and whilst the documentation is thin on the ground, Python is supported by Netlify (although not in the Netlify Functions). You just have to be a bit more creative with how you use it.

## Objectives

In this article I'm going to explain how to set up Environment Variables in Netlify, and then reference them in Python code, and also why you might want to do that.

## Why use Environment Variables

In a nutshell, you can keep secrets in them. Do you have an API token that is unique and allows only you to access your data source? Store it in an Environment Variable. Does your code make a call that uses a username and password of your social media account? Store it in an Environment Variable.

You will only want to use environment variables if you have Continuous Deployment setup to pull your code from a repository in your Git provider of choice (e.g. Github) and the code in that repository is dependant on one of these secret pieces of information. But whilst you might not mind sharing your code with the world in your public repository, you do not want to share these secrets. 

It's worth pointing out at this stafe that you should never commit secret keys, tokens or passwords to your Git repository and you should structure your code and .gitignore file accordingly.

When Netlify builds your site, it creates an Ubuntu container and clones your code from your Github (or Gitlab or Bitbucket) repo. In addition to this, Netlify will ensure any Environment Variables you've set up in your account settings, that only you can see, are configured in that container, and any dependencies are installed from your `package.json` file (for Javascript) or your `requirements.txt` file (for Python).

So the code remains public, and it references the environment variables, which remain secret.

## Netlify Environment Variables

The Environment Variables section of Netlify can be found in your sites dashboard by navigating to Deploys, then to Deploy Settings, then in the Environment section of the settings, Environment Variables are the first panel.

They are easy enough to setup. You click on 'Edit Variables', then click 'New Variable' and you will then be given two boxes - the first is to enter the Key (or variable name) and the second box is where to enter the Value. Click 'Save' and you're good to go.

Let's say we set one up with a key of 'NAME' and value of 'Hedwig'.
![Netlify Environment Variables](/assets/img/python-environment-variables-with-netlify/netlify-env.png)

## Referencing Environment Variables in Python

In your code, you want to be able to reference this, and to do so you need to use the standard library module `os`, which is the swiss army knife of operating system utilities. First import this.

    import os

Then in order to access the variable, it is a list value in the list `os.environ`, so we can type:

    owlName = os.environ['NAME']

Voila!

Now when you deploy your code and it is built by Netlify, your owl's name can remain a secret, but you can still show potential employers your Python code!

## Conclusion

I really struggled to get this working when I first did it and could not believe how easy it was when I found the answer. It is also possible that people do not write much Python build code with Netlify because there is much less coverage of the possibilities.

I hope you found this useful.









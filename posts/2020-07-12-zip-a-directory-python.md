---
title: Creating a Zip File of a Directory With Python
excerpt: Sometimes, automation of website deployments require you to post a zipped up directory containing your website to an API. Python makes this easy!
date: 2020-07-12
permalink: /zip-a-directory-python/
author: Martin Dawson
tags:
  - post
  - python
  - automation
---

## Introduction

There are some static site hosting companies that I have used that allow you to deploy your website by sending your it all zipped up to an API and then the hosting company unzips and publishes the pages on its CDN.

This is a great way to deploy your website programmatically, and so I thought I would try it out. In order to do this, I had to zip up my website folder and send it in a payload to the API. I thought that was going to present a problem for me, but actually it was so easy using Python.

## Objectives

In this article I'm going to explain how to use Python to create a zip file of a folder on your local drive.

## `shutil`

To create a zip file, it's just one line! One line!! That's why I love Python. Most of the time, it makes it very easy to do most tasks (sweeping generalisation).

Ok, maybe it's two lines, because the first thing to do is to import the `shutil` module from the Python Standard Library.

    import shutil

The `shutil` module covers high-level file operations, and this includes archiving operations. The operation we will need is [make_archive](https://docs.python.org/3/library/shutil.html#shutil.make_archive).

    shutil.make_archive(archived_directory, archive_format, directory_to_archive)

So let's say we have a directory called 'site' that we want to zip, and it will be called 'zippedSite' when we've finished. We include the following line in our code:

    shutil.make_archive('zippedSite', 'zip', './site')

We don't need to include an extension on 'zippedSite', because we've told it in the second argument that the archive format is 'zip'. Python can figure the rest out. Also the directories to be used are relative to the current directory.

Incidentally, there are other formats you can use, aside from zipping (e.g. the tar format).

## Conclusion

Once again, Python gives us a clean and simple way of making a zip file of a directory. This can help in my use case of sending it as a payload for deployment, but there are other use cases. For example, you might want to run a job every week, or month to archive files or photos. A quick script in Python and this can become an automated activity.


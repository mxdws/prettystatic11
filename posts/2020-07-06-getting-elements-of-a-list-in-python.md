---
title: Getting Elements Of A List In Python
excerpt: A quick guide to accessing various elements of a list in Python
date: 2020-07-06
permalink: /getting-elements-of-a-list-in-python/
author: Martin Dawson
tags:
  - post
  - python
  - lists
---

This is not a difficult thing to type in to Google, but as it's something I do search for quite a lot, I thought I'd write down some of the pieces of code in Python that slip out of my mind. One of these is accessing elements of list in Python. 

The problem for me is not that I do not know how to access the elements of a list in Python. In fact, I use lists quite a lot because of their versatility, speed and generaly usefulness. I just do not always get it right first time.

The list I'm going to use as an example is shown below:

    kittens = ["Fluffy", "Patch", "Mog", "Ruby", "Mittens"]

So, given this list, how do you find the first element of it? That's easy

    kittens[0]

What about the last element of the list?

    kittens[-1]

The penultimate element of the list?

    kittens[-2]

First three elements of the list?

    kittens[:3]

Last three elements of the list?

    kittens[-3:]


## Slicing Lists

The process of referencing items in a list in Python is called Slicing. And the general syntax for referencing items in a list is:

    list[start:stop:step]

`start` is the element to start from,
`stop` is where you want your fetching to end
`step` indicates the increment between each item to be sliced

I say referencing items because using slices not only allows you to retrieve elements from a list, but it also allows you to change elements in a list.

In our example list, I can say:

    kittens[:2] = ["Claws", "Slinky"]

This will change the first and second elements in the list.









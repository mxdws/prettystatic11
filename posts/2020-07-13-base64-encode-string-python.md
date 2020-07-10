---
title: Base64 Encode a String with Python
excerpt: It is a quite a niche thing, but if you need to Base64 Encode
date: 2020-07-13
permalink: /base64-encode-string-python/
author: Martin Dawson
tags:
  - post
  - python
  - automation
  - api
---

## Introduction

There are lots of reasons to send data these days, and lots of types of data that you might need to send. Occaisionally, you might need to Base64 encode some of that data. Generally this is required when you might have data that needs be stored and transferred over media that are designed to deal with text, and Base64 encoding ensures the data is transported without modifcation en route.

The only times I've needed to do this is when it has been stipulated by the receiver to whom I'm sending a request, e.g. Authorization tokens.

## Objectives

In this article I'm going to show you how to take a string and Base64 encode it.

This is mainly for my benefit, so as I can easily find how to do it, next time I need to. It's not exactly an everyday activity, so I tend to forget.

## `base64` Module

First, we need to import the base64 module from the Python Standard Library

	import base64


I'm going to encode a string called 'encodeThis'

	encodeThis = "Please Encode Me"
	
Next, we will convert it to bytes

	encodeThisBytes = encodeThis.encode('ascii')

Next, we Base64 encode the bytes:

	base64EncodedBytes = base64.b64encode(encodeThisBytes)

And then we convert those bytes back to a string

	base64EncodedThis = base64EncodedBytes.decode('ascii')

Done!

## Thanks

I've mentioned in this blog before that I didn't know how to do this, so thanks to this article](https://stackabuse.com/encoding-and-decoding-base64-strings-in-python/) for showing me the way.




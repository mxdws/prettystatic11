---
title: Ultimate Guide to the HEAD Element
excerpt: You may not see most of what goes into the HEAD tag in your sites HTML, but it can have a big impact on how other people might see your webpage.
date: 2020-07-07
permalink: /ultimate-guide-to-the-head-element/
author: Martin Dawson
tags:
  - post
  - html
  - seo
---

## What's the big deal?

I started this website a while ago, but I concentrated moste of my effort on the font and layout of the site, rather than what goes on under the hood. This is not unusual for me, and it is not because I'm lazy. The fact is that many of the websites that I set up are either temporary, or for specific audiences, like my family, and so I don't need to concentrate on social sharing images, seo, or any other part of web design that is intended to serve large audeinces who want to consume and share my blog posts.

But, the time has come when I need to roll my sleeves up and focus on those often overlooked areas, and the first is the `HEAD` tag. 


Why, you may ask, do I want to dedicate an entire post to this subject? There is a lot of important stuff that is crammed into the HEAD tag that I do not currently include, and this is why I think I should spend time rectifying it:

1. It might aid my sites ability to be ranked within Google search
2. Adding metadata means I can provide more information to whoever stumbles across my pages they do appear in search results.
3. I can add analytics which will enable me to see if anyone reads my blog posts.

Another reason why I should do it is that because my site is statically generated, if I spend time on the `HEAD` tag now, then I probably will not have to spend any addtional time on it when writing my blog posts, because most of the information will already be there - I just have to include it.

## What is the `HEAD` element?

The `HEAD` element in HTML appears before the <body> element, and it acts as a container for metadata. This metadata is not displayed, but it does define aspects of the HTML page that it is a part of, like styles, language, character set, and also provides descriptions of the HTML page to serve search engines and social media.

## What meta tags to include

To start with, there we can define the character set, which most of the time will be UTF-8 

    <meta charset="utf-8">

Next, we can use the viewport meta tag to ensure the page is mobile-optimised. The viewport is the part of the browser that can be seen, and so this meta tag tells the HTML to set the content width to the width of the device on which it is being viewed. With the `initial-scale` set to 1, there is no zoom on the content either.

    <meta name="viewport" content="width=device-width, initial-scale=1">
    
And there is the title of the page that will appear as the main link in Google search results and will also show as the name of the tab or window in which you are viewing the page.

    <title>Ultimate Guide to the HEAD Element | Pretty Static</title>

Meta descripton tag comes next, and this is a brief explanation of what your page is about. This will appear under the headline in Google search results so it is worth using this as an opportunity to describe in 160 words or less, why the user might want to click on this search result.

In terms of our static site generator, if you start the article with a decent summarised description of what the article is and why people should read on, then this will be able to appear in the article and serve as the meta description too.

    <meta name="description" content="This is probably the best article ever written and you would be stupid not to click on the link!">

If you want your page to refresh every minute, you can include this:

    <meta http-equiv="refresh" content="60">

## Canconical Link

If you are publishing content that has been published elsewhere before, it's good practise to put the source in the canonical link. Then Google knows which version is the original and can register the source with whatever recognition it deserves.

    <link rel=“canonical” href=“https://example.com/sample-page/” />

This is a very poor explanation of what can be a rather large and nuanced subject, so take a look elsewhere to find more information.

## Analytics

Let's say for example you want to include Google Analytics, you will need to include the code snippet somewhere near the top of your `HEAD` element. It should be included before any other script, CSS, or link tags, so if that's what you want to use, add it after the meta tags.

## Link to Style Sheets

We can link to a stylesheet by using a link tag. This defines a link to another document and the relationship between the page and the linked document. I would imagine the most used relationship is to link to a style sheet:

    <link rel="stylesheet" href="styles.css">

But if you don't want to link to a style sheet, the next heading might suit you.

## Styles

If you want your styles to load in the page, you can put them in a set of `STYLE` tags, like so:

    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
        }
    </style>

## Social Sharing

The Open Graph meta tags help determine how the page looks when shared on social media.

The meta tag has a property that is preceded by 'og:' and the property can define the pages title, type, social sharing image, and description, amongst other things. 

    <meta property="og:title" content="Ultimate Guide to HEAD Element" />
    <meta property="og:description" content="Best darn article you are ever gonna read" />
    <meta property="og:url" content="https://prettystatic.com/ultimate-guide-to-the-head-element/" />
    <meta property="og:image" content="https://prettystatic.com/social.png" />

It's not essential but if you want to share pages on social media then this will make those links look better.

Twitter has it's own tagss, but if it can't find any then it falls back to the Open Graph tags. The exceptions are that the you might need to tell Twitter that you want the card displayed as a Large Summary Card, and you could also link to the associated Twitter name:

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@username">

## Favicons

Favicons are the little square images that appear in the tab of your browser showing a logo of your site. I generated mine at the site [favicon.io/](https://favicon.io/) who give you the code to include, in addition to the downloadable image files that you need to store somewhere.

    <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicons/favicon-16x16.png">
    <link rel="manifest" href="site.webmanifest">

## Conclusion

This guide has helped me get my blog into decent shape, and now whenever I look at it on a browser, in search results, or share it to social media, it looks how everyone elses posts and results look. My concern previously was that if I didn't have the necessary meta, script, or link tags as part of the `HEAD` element then my website might look a little bit amateur when I tried to show it to someone else, and with a little bit of effort, you can make it look a lot more accomplished. 














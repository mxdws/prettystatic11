---
title: Making a Euro2020 Sweepstake With Python
excerpt: The next big football championship is nearly here, and here is how we can do a digital sweepstake with Python.
date: 2021-06-10
permalink: /euro2020-sweepstake-with-python/
author: Martin Dawson
tags:
  - post
  - python
---

The Euro2020 Championships are almost here, and with most major sporting events like this, I usually take part in a Sweepstake. But this year, it is a bit harder to pull a piece of paper out of a hat, so I thought I'd write a little bit of Python to simulate the drawing of the names.

## Video

I made a video about this too. Check it out:

<iframe width="560" height="315" src="https://www.youtube.com/embed/jlmLKL4i698" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Code

The premise of this is very easy. I started with two lists; one for the 24 teams in the Competition, and one for the names of the 24 participants of the sweepstake.

Then I simply zipped these together and converted them in to a list of tuples.

    sweep = list(zip(teams,names))

Before I did this, I just shuffled the lists, using the `shuffle` method in the `random` Standard Library module.

    random.shuffle(names)
    random.shuffle(names)

And finally I looped through the list and revealed the pairs with a time-delay of one second every time a pair is drawn.

    for s in sweep:
        print(s[0] + '-->' + s[1])
        time.sleep(1)

## Conclusion

To spruce this up, I have turned it in to a static site with some CSS animations to reveal the pairs one at a time, but I'll save that for another time before sharing on this blog.


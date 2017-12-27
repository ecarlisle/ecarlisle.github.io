---
layout: default
category: posts
title: A Tale of Two Characters - My Code Indentation Autobiography
author: Eric Carlisle
date: 2016-06-06 9:00:00
slug: my-code-indentation-autobiography
tags:
  - programming
  - whitespace
  - indentation
  - tab space
description: This is a personal history of code indention over the last 20 years.
image:
  src: /img/blog/code-indention.png
  alt: Two spaces? Four Spaces? A Tab?
  class: article-image
---

The type and number of characters we use for code indention have and probably will always be a source of contention for programmers. Should we use tabs or spaces and how many of either? Some will consider this a tired argument, others find it comical, and some have very strong opinions on what's the right way to indent.<!--more--> These are all fair. What interests me is how different indention stylistics are more than mere preferences or opinions. They can make that person more efficient and less distracted. It's both a quandary of both Computer Science and Human Factors.

This post is not to evangelize indentation styling, though in the end I'll let you know what I use and why. Also consider this a narrative of why I chose to indent the way I do. The topic can get try and lead to heated opinions, so we'll keep it short and use brevity.

##Chapter 1. - College : Tabs as a Source of Beer Money

It was the mid-nineties, I was an undergrad, and learned that HTML was lucrative. I learned markup by looking at other websites. I used what I saw the most- tabs. I wasn't a CompSci major and didn't realize that indention was something to dwell on. In retrospect, HTML at the time was much simpler and readability wasn't really a hurdle.

##Chapter 2. - The Age of Y2K : I Can Still Use Tabs, Right?

Though my undergrad degree was in Sound Recording, I gravitated towards a web career. I learned other languages, how to work with data, and things got generally more complicated. I also started seeing different code styles and with that, enter spaced indention. I was hesistent. Why use multiple characters when I could KISS and indent with a single character? ~~editors~~ IDEs also didn't have the groovy indention preferences available today. Spaces were awkward, made me slower, and make the file bigger. I sallied forth with tabs.

##Chapter 3. - The Aughts : Kneel Before ~~Zod~~ The Space!

At one point it seemed like *poof*, "Dude, you need to use spaces." At this time I started working with larger teams, projects became to be more distributed with source control systems, and consistency became more important.  I started using either a team or project standard and most of the time that ended up using 2 or 4 spaces.  I was able to tweak ~~editors~~ IDEs to make things a little more manageable, but spaces still a pain for me.

##Chapter 4. - Present Day : TabMan becomes TwoSpace!

Current day - I indent with two-spaces whenever possible. My rationale is:

1. _For me_, shallow indention is generally more readable.<sup>[1](#a)</sup>
2. It's easier <em>for me</em> to tell if the number of indents may suggest a need to refactor.
3. _I_ can better eyeball where I open and close code. I know editors have helped with this for a long time, but I don't like depending on that.
4. Diffs are easier _for me_ to review in GitHub, BitBucket, Stash, and other source control systems with web interfaces.
5. Editors like Sublime Text are now much better at making two spaces feel like a tab.
6. _I_ **still* want to use less characters.

<a name="footnote1" style="font-size: 11px">_1. Caveat: I dig bigger indents with Python._</a>

##Chapter 5. : Will Chewie Ever Get His Medal?

Do I still want to use a single character to indent?  Yes I do, but there's also the need to abide by project and team styling requirements. I wonder if tooling is out there for having and eating cake. I'd love it if:

1. My editor indented at a two monospace character depth with a single keystroke.
2. I could configure my editor to save files to comply with any required standard - 2-spaces, 4-spaces, or anything else deemed "the right way."
3. I could reopen these files and my code is shown as per my preferences in #1.
4. Here's an example of this idealism:

<!--
  Please do not count pipes as indentation.
  They are included to make the example more readable.
-->
{% highlight html %}
12|<p>
1234|I want my editor to always use this intent.
1234|When I press tab, I'll get a 2-character shallow indent.
1234|That's how I to best read code. At this point
1234|don't think of tab as a single character that's four
1234|spaces long. I hit tab and I get an indent that's the
1234|length of two monospace characters.
12|</p>

1234|<p>
12345678|When I save this file, I want each tab to be saved as
12345678|whatever the project requires. As an example, here's
12345678|a 4-space indent that the editor saves out.
1234</p>

12|<p>
1234|I reopen the file and get back my preferred indentation.
12|</p>
{% endhighlight %}

Should someone speak out and to say _"There are 10 editors that do EXACTLY that! What rock have you been living under?"_, please do so! You'll be my hero!

Bottom line - my choice of indentation is a combination of personal preference, what I feel makes me more productive, and the most manageable compromise with existing standards. Do you feel another way? I dig that! Happy coding!

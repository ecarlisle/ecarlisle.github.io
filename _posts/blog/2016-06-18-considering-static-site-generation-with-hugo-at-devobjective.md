---
layout: default
category: posts
title: Considering Static Site Generation with HUGO at dev.Objective()
author: Eric Carlisle
publishdate: 2016-06-18 0:06:00
tags:
  - HUGO
  - static site generation
  - devObjective
slug: static-sites-with-hugo-at-devobjective
description: Having the opportunity to speak on static site generation with HUGO was an inspiring means of considering approaches to web production.
image:
  src: /img/blog/hugo-logo.png
  alt: Hugo Logo
  class: article-image
---

I recently attended this year's [dev.Objective()](http://www.devobjective.com) web conference and was given an opportunity to present **Static Site Generation with HUGO**. Dev.Objective() always brings in heavy-duty brain power so I was very excited to geek out, get questions and in this case, **challenge comfort zones**.
<!--more-->

After all, static site generation can potentally be a comfort zone stresser for any web producer. The general idea of the Static Site Generator (SSG) approach is to simplify web production by greatly reducing technical dependencies. Databases and server-side platforms like PHP, Coldfusion, or ASP.NET aren't used to generate content dynamically. Instead, an SSG residing in the development environment uses templates to build all content into a volume of static assets (HTML, JS, CSS, fonts, images, etc...). These static assets are then uploaded to the production server environment.

Instead of using a web application platform to generate content dynamically from a single page...

{% highlight text %}
/content/pages.php?id=1
{% endhighlight %}

... We'll have all content prebuilt and available statically.

{% highlight text %}
/content/page1.html
/content/page2.html
/content/page3.html
...
/content/page5000.html
{% endhighlight %}


**Note**: there are many ways to optimizing URLs with both dynamic systems and SSGs. Please disregard naming conventions in the above example.

The main benefits of the SSG approach are to simplify web production while also potentially improving site performance, security, and portability. The trade-off is not having the functionality that a dynamic content generation approach would have.

I chose to present on the [HUGO](http://gohugo.io) SSG because it stood out to be in the following ways:

1. HUGO makes content a first-class citizen. Site design, creation, and maintenance are all centered on choices made with content strategy.

2. HUGO takes the simplification game a step further. It is a compiled binary written in [Go](https://golang.org/). This allows HUGO tremendous speed compared to other SSGs like [Jekyll](https://jekyllrb.com/) (also an awesome SSG) that depend on a runtime. Google designed Go to create powerful software with a simple, expressive, concise, and clean approach. HUGO's goals are aligned with its underlying technology to delivery web content.

These are some of the great questions I was asked by dev.Objective() attendees, speakers, organizers, and sponsors.

<hr/>

### "Is HUGO a niche tool? Is it only for developers?"

HUGO and most any other SSG do require more technical prowess when compared to CMS applications with WYSIWYG editors like (Wordpress)[https://wordpress.org/). Content is usually authored in markup or markdown in an editor like Sublime Text, Atom, or VIM. Updates to a live site are made via some type of file transfer or submission to a source control system like [Github](https://github.com/). These aren't layman tasks. If you're a web developer using an SSG for a client site, you may find yourself making content edits for the client.

<hr/>

### "Should I even consider HUGO or another SSG for client sites?"

Depending on the project goal, I say "Yes." Some projects are obvious great fits. Many microsites act as brochures, conveying information with limited need for user interaction or content updates. A CMS or dynamic content platform could easily be overkill. Using an SSG could reduce production time while encouraging organization and maintainability.

Other projects may be the opposite. HUGO is strong in managing text content but not media. Photo blogs or video repositories may benefit less from HUGO, though stronger media management in undergoing consideration in future HUGO versions.

I posit, however, that consideration for HUGO or other SSDs can be beneficial as a project's "best fit" isn't always obvious or may change with time. Commiting a project to a dynamic framework can be expensive, even if not at first. Using an SSD may provide an inexpensive initial approach while needs may be collected over time. As enough requirement data is collected over time, it may be determined that a dynamic CMS is a good fit. It may also be possible that an SSD will be the best bit for a long-term solution.

<hr/>

### "Won't I be losing functionality that enrich the experience of a site?"

Not necessarily and not as often as you would think. Consider a comment thread appended to a blog post. This funtionality is usually native to a dynamic CMS. However the same functionality may be added to a static page via a [Disqus](https://disqus.com/) integration. Such service APIs are available for several purposes and many are free to use. Some dynamic CMS features are merely wrappers for such APIs.

<hr/>

### "What about scalability? Will static generation eventually not be time permissive?

Maybe. Check out this [benchmarking video[(https://www.youtube.com/watch?v=CdiDYZ51a2o) in which a 5000 page HUGO static site is completely generated using different storage mediums. Complete regeneration occured in about six seconds. Mileage will probably vary for different sites but most likely by trivial amounts of time.

Also bear in mind that you won't always be completely regenerating your site.  If you're adding a content page, such regeneration is unneeded. That would only be required when making changes to templates or other site-wide configurations.

Additionally, HUGO recently published [version 0.16](https://github.com/spf13/hugo/releases/tag/v0.16) which includes "Partial Builds." HUGO will now detect and rebuild files requiring changes. "Incremental Regeneration" capability was also recently added in [Jekyll 3.0](https://jekyllrb.com/news/2015/10/26/jekyll-3-0-released/).

<hr/>

### "HUGO" looks like it's made to accept content as markdown, not markup. Won't I lose control in styling my content?

No. HUGO will accept HTML files as content because it uses the [Blackfriday markdown processor](https://github.com/russross/blackfriday"). Blackfriday (BF) will allow markup to be placed in a markdown file. Upon processing, BF will ignore existing markup and create markup from all other markdown content. A BF .md file may even contain 100% markup.

Additionally, HUGO has a [Shortcode feature](https://gohugo.io/extras/shortcodes/) similar to the [Shortcode feature in Wordpress](https://en.support.wordpress.com/shortcodes/) These may be used as hooks to inject CSS styling when necessary.

It's true that neither one of these approaches are as graceful as the [kramdown markdown processor's](http://kramdown.gettalong.org) ability to [insert CSS IDs and classes](http://kramdown.gettalong.org/quickref.html#block-attributes) directly in the markdown. However, this may cause us to consider the value of inline content styling when compared to the content itself.

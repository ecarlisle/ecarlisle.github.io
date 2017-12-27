---
layout: default
category: posts
title: Optimizing Jekyll Templates with Liquid variables for DRY, Readable Markup
author: Eric Carlisle
date: 2017-10-02 09:00:00
slug: jekyll-liquid-templates-for-dry-markup
tags:
  -- Jekyll
  -- Liquid Templates
  -- Optimized Markup
description: This article giveas an example of how Liquid may be optimized to keep Jekyll templates DRY and intuitive.
image:
  src: /img/blog/jekyll-logo.svg
  alt: Jekyll Logo
  class: article-image
---

If you've yet to check out [Jekyll](https://jekyllrb.com/), I'd strongly suggest doing so. It's a very powerful static site generator and a compelling tool for re-discovering strengths of a static website. I use it for [this website](https://github.com/ecarlisle/ecarlisle.github.io). It's a huge time saver for me, allowing me to devote more time to content creation. Its integraton with [Github Pages](https://help.github.com/articles/using-jekyll-with-pages/) also makes content publication a snap.

For those already already working with Jekyll, you've probably been working with the [Liquid template language](http://liquidmarkup.org/) for optimizing templates. Liquid is a quick learn and great tool for Jekyll templating. I recently used with Liquid to customize Jekyll's [head.html include](https://github.com/jekyll/jekyll/blob/master/lib/site_template/_includes/head.html) to optimize social channel metatags.
<!--more-->

I created this [Gist](https://gist.github.com/ecarlisle/6a92bffc12b1a8b07961) to illustrate my approach.

To use the Gist as-is, you'll need to add the following mappings to Jekyll's site configuration file, [_config.yaml](https://github.com/jekyll/jekyll/blob/master/lib/site_template/_config.yml).

{% highlight yaml %}
facebook_username: "flash.gordon"
facebook_app_id: "12345"
facebook_admins_id: "67890"
{% endhighlight %}

Im optimizting this partial, I found that Liquid templating can quickly become verbose and less readable when all logic is placed directly in the markup. To mitigate this issue and make the include DRY, I created a handful of Liquid variables at the top of the include.

The following example shows the Jekyll default means of making a link tag for a canonical URL.

{% highlight handlebars %}
{% raw %}
<link rel="alternate"
      type="application/rss+xml"
      title="{{ site.title }}"
      href="{{ "/feed.xml" | prepend: site.baseurl | prepend: site.url }}">
{% endraw %}
{% endhighlight %}

While this approach works, it is optimizable. We can shorten the logic by:

1. Making a variable for the full URL (site.url + base.url).
2. perhaps use the _prepend_ function in variable creation, but not within the markup.

{% highlight handlebars %}
{% raw %}
{% capture full_url %}{{ site.url | prepend: site.baseurl }}{% endcapture %}

<link rel="alternate"
      type="application/rss+xml"
      title="{{ site.title }}"
      href="{{ full_url }}/feed.xml">
{% endraw %}
{% endhighlight %}

While the gain in this example may be trivial, Liquid logic can easily add up in other cases. With Jekyll it's not unusual to look for the same content in multiple places and select a certain one. Let's say we need content for page meta description and have decided to take the folowing fallback approach:

1. Use a description mapping placed in the page's front matter YAML.
2. Use a page excerpt, using all page content until a &lt;!--more--&gt; comment is found.
3. Use the site description mapping as set in the site's _config.yaml file.

If placed within the markup, the logic for the meta tag would probably look somethis like this:

{% highlight handlebars %}
{% raw %}
<meta name="description"
      content="{% if page.description %}
                 {{ page.description | strip | strip_newlines | truncate: 160}}
               {% else if page.excerpt %}
                 {{ page.excerpt | strip | strip_newlines | truncate: 160}}
               {% else %}
                 {{ site.description | strip | strip_newlines | truncate: 160 }}
               {% endif %}">
{% endraw %}
{% endhighlight %}

That's not something we don't want in the markup. Let's abstract that out!

{% highlight html %}
{% raw %}
{% capture page_description %}
{% if page.description %}
    {{ page.description }}
  {% else if page.excerpt %}
    {{ page.excerpt}}
  {% else %}
    {{ site.description }}
  {% endif %}
{% endcapture %}
{% assign page_description = page_description | strip | strip_newlines | truncate: 160 %}

<meta name="description" content="{{ page_description }}">
{% endraw %}
{% endhighlight %}

Now, our markup is much more readable and the variable is page_description is reusable.

{% highlight html %}
{% raw %}
<meta name="description" content="{{ page_description }}">
<meta property="og:description" content="{{ page_description }}" />
<meta name="twitter:description" content="{{ page_description }}" />
{% endraw %}
{% endhighlight %}

Also notice that we're using two different Liquid tags for variable assignment. The `capture` tag allows conditional logic to be used when setting a variable. The `assign` tag is then used to clean up the variable's initial assignment.

#### PLEASE NOTE:
When using the `capture` tag to create a Liquid variable, any indention whitespace is placed in that variable. While the `strip_newlines` function will take out linebreaks, we're left with surrounding whitespace that cannot even be removed by other string functions such as `strip`, `lstrip`, and `rstrip`. When the `{% raw %}{{ page_description }}{% endraw %}` variable is placed in the markup, we'll see something like this:

{% highlight html %}
<meta name="description" content="   This is my page description   ">
{% endhighlight %}

This is definitely not acceptable, but we have some options. We could just not use indentation when creating the `page_description` variable.

{% highlight html %}
{% raw %}
{% capture page_description %}{% if page.description %}{{ page.description }}{% else if page.excerpt %}{{ page.excerpt}}{% else %}{{ site.description }}{% endif %}{% endcapture %}{% assign page_description = page_description | strip | strip_newlines | truncate: 160 %}{% endraw %}
{% endhighlight %}

This prevents the indentation whitespace but is no fun to read.  There's also a Ruby [plugin](https://github.com/aucor/jekyll-plugins) that can remove indentation whitespace, but such plugins aren't compatible with Jekyll's integration with Github Pages. I want to maintain readability and integration with Github Pages.

The best solution I've found thus far is not intuitive but gets the job done. You can use Liquid's array functions to split and rejoin a string using `" "` as a delimiter. So we'll include this with other string manipulation happening in the `assign` tag.


{% highlight html %}
{% raw %}
{% assign page_description = page_description | strip_newlines | split: ' ' | join: ' ' | truncate: 160 %}
{% endraw %}
{% endhighlight %}

Now get the set of characters that we're looking for!

{% highlight html %}
<meta name="description" content="This is my page description">
{% endhighlight %}

Thank you [Moritz »mo.« Sauer](http://moritz.sauer.io/) and [M. Appelman](http://huphtur.nl) for feedback to improve this post and respective [Gist](https://gist.github.com/ecarlisle/6a92bffc12b1a8b07961)!

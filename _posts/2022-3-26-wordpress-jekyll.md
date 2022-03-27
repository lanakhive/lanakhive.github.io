---
layout: post
title:  "Migrating WordPress to Jekyll"
date:   2022-03-26 04:15:12 -0600
categories: software
header_image: /assets/header/wordpressjekyll.png
---
Welcome to the new lanak hive blog! After my previous [host](https://lowendbox.com/blog/no-support-linux-hosting-hacked-shuts-down/) suddenly shut down without warning, this blog went offline for several months. After some thought, I have decided to move it to GitHub Pages, and port the site infrastructure to Jekyll.

[GitHub Pages](https://pages.github.com/) provides basic free site hosting for users and projects on GitHub as you're probably aware. While it's possible to drop in an HTML or Markdown file, it also supports building and hosting sites using Jekyll. [Jekyll](https://jekyllrb.com/) is a static site generator built in Ruby. The site is described using a series of templates, which are then combined with human readable posts using a bit of ruby code. The site is built in advance to the final HTML/CSS/JS files which are hosted. By hosting the project in GitHub Pages this process can be automated as the build is fed from a git repository. Static sites have limitations, namely server side scripting isn't included, but there are advantages such as the straightforward layout and ease of caching.

![Screenshot comparison of blog](/assets/posts/wordpressjekyll1.jpg)

This original blog was built using the [WordPress](https://wordpress.org/) content management system. Since WordPress uses server side scripting in PHP along with storing all its data in a SQL database, we cannot simply copy the site onto GitHub pages. Jekyll does provide an [importer](https://import.jekyllrb.com/docs/wordpress/) for site migrations from WordPress (along with ones for many other blogging systems), however I decided to perform the migration manually since this blog doesn't have that much content and it provides a good opportunity to better reorganize the posts content. Overall it was very straightforward, the pages and blog posts were copy and pasted into corresponding markdown files, with the images and scripts nicely organized in an assets folder. The blog theme was easily recreated by modifying the included minima theme. I did have to add a few additions for supporting post header images and the logo image. Jekyll uses the [Liquid](https://shopify.github.io/liquid/) templating language to render content from ruby code. But overall the amount of code required as minimal. Compared to the Wordpress approach of having the posts text in a database table and the images in a nested folder of year/months, this is much cleaner to deal with.

I'm glad to have the blog up again and pleased with the migration result. Now that everything is on GitHub I'll probably be posting more code here as well.

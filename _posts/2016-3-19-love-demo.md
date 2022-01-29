---
layout: post
title:  "LÖVE Demos on the Web with love.js/Emscripten"
date:   2016-3-19 6:03:00 -0600
categories: software
header_image: /assets/header/line1.png
---
In the past I've built some small graphical demos and games in Lua using the great [LÖVE framework](https://love2d.org/LÖVE) framework. LÖVE is aimed at making games but is actually good for any kind of multimedia applications, providing a rich API for drawing graphics, playing audio, receiving input, etc. Previously these apps only ran on desktop platforms, but with the recent release of LÖVE v0.10 they can now be run on mobile platforms as well. Still, the web with HTML5 was unsupported and I really wanted to be able to show them off here on this site as well. There were a few attempts to achieve this by building a Lua interpreter in JavaScript and then reimplementing the LÖVE API, but these were slow and did not provide the entire feature set. Now a new project called [Love.js](https://github.com/TannerRogalsky/love.js) has brought LÖVE to the web using Emscripten.

![love+emscripten=love.js](/assets/posts/line3.png)

Emscripten, the asm.js compiler allows C/C++ code to be compiled to JavaScript that can be run at near native speeds. This compiler allows love.js to compile the native LÖVE codebase directly to JavaScript, providing full API support for LÖVE applications that can be run at reasonable performance. Then, the Lua application is packaged into a javascript file that is loaded along with love.js. At runtime, the application is unpackaged into a virtual filesystem containing the original lua files. These are loaded by the Lua interpreter in love.js to run, outputting to a HTML5 canvas. See the chart below for a simplified overview of this process.

![Flowchart showing emscripten usage with love.js](/assets/posts/line4.png)

The demo I'm showing today, Chroma Drencher, was built using the LÖVE framework in Lua. Getting it on the web could have been done with a port to JavaScript and HTML5 Canvas, after all Lua's syntax isn't all that different from JavaScript, but it would likely have been difficult since the Canvas API is much more barebones. Some of my other demos use shaders so then WebGL is required. Of course there are plenty of Javascript frameworks available through none of them appeared to do things the same way as LÖVE. This made targeting the web directly using a LÖVE port appealing. Packaging an application is done with a simple script that generates a JavaScript file that when combined with the Emscripten compiled LÖVE JavaScript file, allow the application to be displayed on a HTML5 canvas. I modified the loader script to integrate with the page and look a bit nicer since it was originally intended for a dedicated page.

Chroma Drencher is a simple screensaver type demo with slow falling colored lines. It was inspired by a desktop wallpaper I saw someone had which made me think it would look cool if it were animated. Below you can see the result.

<span id="canvases"></span>
<script id="loaderscript" src="/script/lovejs/loader.js" type="text/javascript"></script>
<script type="text/javascript">loadlove("lines","canvases");</script>

Click the box to load the application (**warning huge script download**). The window is a bit small but you can press the F key to switch to fullscreen mode. By pressing the right mouse button, the controls for adjustment will appear. Try out some different settings and take a screenshot if you like it!

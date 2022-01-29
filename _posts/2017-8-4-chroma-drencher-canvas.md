---
layout: post
title:  "Chroma Drencher in JavaScript and HTML5 Canvas"
date:   2017-8-4 7:06:00 -0600
categories: software
header_image: /assets/header/canvaslineheader.png
---
In the last post I showed how technologies like Emscripten can be used to adapt apps written in other languages to the web. This has only become easier since with [WebAssembly](http://webassembly.org/) that replace huge files of unintelligible JavaScript with a true byte code format. Running large apps compiled to the web natively at fast speeds is now possible. Still, sometimes it's easier to avoid that complexity and just write things directly targeting the web.

I've ported Chroma Drencher to JavaScript using HTML5 Canvas. Now all thats needed is a few KB script instead of a multi MB script, and it runs faster too!

<div style="height: 500px;"><script src="/script/line.min.js"></script></div>

*Check this out fullscreen!*

Porting from Lua to JavaScript isn't that difficult considering how similar the languages are. Most of the difficulty was adapting the drawing from love2d to canvas. Generating gradients is easier since canvas has drawing functions for them, something love2d lacks altogether. These can be cached on offscreen canvases since drawing hundreds of gradients per frame is slow. Sadly canvas doesn't have any way to perform sprite batching, so each line has to be drawn with a separate image draw call. I suppose WebGL could do that, but it still runs quickly as is.

Also, if you have [Wallpaper Engine](https://store.steampowered.com/app/431960) on Steam, you can [subscribe](https://steamcommunity.com/sharedfiles/filedetails/?id=1153238076) and use it as an animated desktop wallpaper!

Next time another neat demo ported to JavaScript + Canvas!

---
layout: post
title:  "Ribbon Turmoil in Canvas/JS"
date:   2017-10-28 8:12:00 -0600
categories: software
header_image: /assets/header/canvasmonoheader.png
---
Here is another little graphical demo done in Javascript and Canvas. Like before, this one was originally done in Lua. A bunch of pastel ribbons wind and wiggle around pegs.

<div style="height: 500px;"><script src="/script/mono.min.js"></script></div>
&nbsp;

What is interesting is that the script ends up being much simpler thanks to some key differences in the drawing API. Each ribbon is made up of lines, arcs, and end caps. In love2d each must be drawn individually with separate drawing commands. Javascript with a Canvas context however uses the concept of paths, where the entire path can be set with commands and then drawn all at once in one call. The thickness, end caps, and color are just properties of the path. It is still an immediate mode API, but when the ribbons change each frame the data needs to be streamed anyways. These ribbons run pretty fast as it is. If better performance is needed we must do 2D in WebGL.

Check out the code on [GitHub](https://github.com/lanakhive/RibbonTurmoil).

You can [subscribe](https://steamcommunity.com/sharedfiles/filedetails/?id=1175398263) to this as a wallpaper if you have Wallpaper Engine.

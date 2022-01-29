---
layout: post
title:  "Erratic Signals in WebGL"
date:   2018-2-14 10:14:00 -0600
categories: software
header_image: /assets/header/canvassnapheader.png
---
Here we have Erratic Signals, a bunch of unpredictable signal lines snapping around with a neat glow effect. It took quite a bit of tuning to get the lines to appear random, but not too aimless. While they move independently, it looks nice when they cluster and overlap. Certainly has a circuits vibe with the angular lines and the via-like tips.

This one is done in pure JS/WebGL. WebGL is basically the same as OpenGL ES 1.0, with a few additions to make it better suited for the Web. ThreeJS is a great library but not as simple when you need to stream generated geometry every frame.  So for this scene I just used the WebGL API directly, which is more boilerplate code but also more control over the drawing procedure.

<div style="height: 500px;"><script src="/script/snap.js"></script></div>
&nbsp;

The lines are generated each frame and triangulated using the naive quad method, since glLineWidth doesn't work properly in WebGL, uploaded to a vertex array, and then drawn to a framebuffer with a vertex color shader. The tip is a diamond that ends up looking like a circle when drawn so small. Since the number of lines can change rapidly between frames the vertex array must be preallocated large enough such that reallocations are rare.

Then a 2-pass blur shader is applied with a wider than normal sampling interval to get the grid effect. The alpha blending isn't done correctly, causing the typical dark halos associated with wrong premultiplied alpha. But in this case it looks better since it causes the lines to fade out faster and isn't noticeable with a dark background.

Finally the blur frame and the line frame are drawn to the screen using a simple shader to add a bit of color variation.

Just as before, this scene is also available [here](https://steamcommunity.com/sharedfiles/filedetails/?id=1190390653) on Wallpaper Engine. With it, many of the parameters are adjustable like speed and color.

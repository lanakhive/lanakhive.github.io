---
layout: post
title:  "Irradiant Shards in WebGL"
date:   2019-1-8 7:40:00 -0600
categories: software
header_image: /assets/header/canvascrystalheader.png
---
Irradiant Shards features slowly growing crystal shards that develop over time, presented in a slightly vintage style. Each shard moves around smoothly before quietly fading away.
<div style="height: 500px; image-rendering: crisp-edges; image-rendering: pixelated;"><script src="/script/crystal.js"></script></div>
&nbsp;

This design is actually just a elaborate modification of Erratic Signals. By increasing the line width we get thick lines with an angular point at the end. Some smooth step interpolation is added for movement so the lines speed up and slow down as they approach each point. As before, the lines fade out over time but now also with interpolation.

On the shader side, colors are slowly cycled through over time. This time however we use a gradient palette mapping function to slightly tint parts of the line based on opacity. The color is also tinted by a plasma texture to add some variance to the intensity. The texture is generated using a few sine functions, then scaled up and movement is added so that the periodic repetition is less noticeable. To achieve a vintage effect, the black background is tinted with the complimentary color of the line. This creates an effect similar to viewing a bad LCD display off angle. Then noise is added for grain simulation and a basic vignette. The frame is scaled up 3x using nearest neighbor filtering for a pixelated look.

It is neat how much shaders can affect the final image when chained together, but they require careful adjustment to get the appearance just right.

This scene is available for your desktop [here](https://steamcommunity.com/sharedfiles/filedetails/?id=1318400935) on Wallpaper Engine. Some of the adjustments can really change the style!

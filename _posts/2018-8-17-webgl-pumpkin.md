---
layout: post
title:  "3D WebGL Pumpkin"
date:   2018-8-17 5:22:00 -0600
categories: software
header_image: /assets/header/pumpkinheader.png
---
Here is a 3D scan of a pumpkin. The pumpkin was captured with 16 photographs at 16 megapixel resolution and then reconstructed using photogrammetry techniques, producing a high resolution 3D mesh model and a diffuse texture map. The mesh was then simplified to a low polygon mesh and a normal map was baked based on the high polygon mesh.

The mesh is displayed in realtime 3D in a HTML5 browser using the hardware-accelerated WebGL API for Javascript. The three.js library is used to simplify mesh loading, scene management, and lighting model. The model is rendered spinning using toplit Phong lighting from a perspective camera orientation.

<div id="pumpkin"></div>
<script src="/script/melon/three.min.js"></script>
<script src="/script/melon/OBJLoader.js"></script>
<script src="/script/melon/pumpkin.js"></script>

Here is the pumpkin rendered in realtime. Below is the original photo.

![Photograph of an orange pumpkin](/assets/posts/pumpkinoriginal.jpg)

---
layout: page
title: Klootzakken
permalink: /software/klootzakken/
header_image: /assets/header/kztitlea.png
---
Klootzakken is a simple card game to play with friends.

Back at a previous job I had in The Netherlands, we used to play a card game during our lunch break called Klootzakken. The name supposedly meaning something inappropriate in Dutch, it was invented in house some time before I started there. The rules were quite simple, the goal being to eliminate all your cards first or at least not being the last player left with cards.

Foreseeing that in the future several members of our team would be split up to different offices, I began developing a software implementation of the game so we all could still play.

![main menu screenshot](/assets/software/kz1a.png)

The game was developed in [Lua](http://www.lua.org/) using the [Love2D](https://love2d.org/) framework. Initially a command line version was built, just to get the gameplay logic done right. Later the interactive GUI was added. I thought it would be neat to generate the cards programmatically, that way the card face details could be artistically altered easily. So at runtime each card gets generated and drawn to offscreen buffers. Much of the fun in the game was playing against others and trying to predict what they would do, so I added a simple (aggressive) A.I. to play against until networked multiplayer could be built. I also created a framework for easily integrating custom A.I.s as Lua scripts. A few graphical effects including hand panning and flinging cards into the pile were added for an authentic playing experience.

![ingame screenshot](/assets/software/kz3a.png)
---
layout: post
title:  "Assembly Adventures"
date:   2015-3-8 20:59:00 -0600
categories: software
header_image: /assets/header/rcodeheader.png
---

A while back I was interested in playing an old simulation game from the late 90's, [SimCity 3000](http://en.wikipedia.org/wiki/SimCity_3000). The game still runs great on today's systems without any major compatibility issues and its raster graphics still look as crisp as back then. Designed back when 1024x768 was a typical monitor resolution, the game preferences dialog limits the maximum resolution to 1280x1024. This doesn't look very nice on a modern widescreen display. Other games like Age of Empires II have received [patches](http://userpatch.aiscripters.net/) and [HD Edition rereleases](https://store.steampowered.com/app/221380/), but SimCity 3000 clearly wasn't getting any more updates. Many games have workarounds to use custom resolutions, so surely there must be some way to set higher resolutions for this game?

![Game options menu](/assets/posts/rcode1.png)

My first idea was to manually edit the configuration file. The game options only list a small set of resolutions that can be set. By selecting each resolution, quitting the game, and viewing the configuration file in a hex editor, It becomes clear that the resolution (and other settings) were stored as binary packed data format consisting of little-endian values. At 640x480, the value in the data file is 0x80 0x02 0xE0 0x01. When changed to 1024x768, the value becomes 0x00 0x04 0x00 0x03. So in an attempt to get 1920x1200, I replaced it with the value 0x80 0x07 0xB0 0x04. Unfortunately this did not work, and the game reset the resolution to 640x480 upon starting. It appears that there is a procedure to not only limit the resolutions shown in the game, but also verify that the one read from the config file is allowed.

![Game disassembly listing](/assets/posts/rcode2.png)

The next step was to open up a disassembler (I used OllyDbg). The program uses [DirectDraw](http://en.wikipedia.org/wiki/DirectDraw) as its graphics API, and typically the Windows API function [CreateWindow](https://msdn.microsoft.com/en-us/library/windows/desktop/ms632680) is where the initial window is created. This function was easy to find, but it was clear from running the program through the debugger that the higher resolution values written in the config file had already been changed by this point. Even if the window size could be overridden at this function call, the executable would be locked to whatever single resolution was assembled. More likely however is that only the window size will increase, and the game will only occupy the upper left corner of it.

What I really needed to find was the root of the problem, that being the instructions that were limiting the resolution to the preselected values. Attempting to find the location where the config file was read proved to be too difficult due to the amount of other data that was located in and read from the file. Searching for some of the values corresponding to the resolutions shown in the preferences dialog provided too many results to be specific. Instead I had to follow the value backward from the CreateWindow function. This process was tedious since debuggers generally don't have a "step back" option. Eventually the verification function was located and it was quite obvious when it was found.

![Game disassembly listing](/assets/posts/rcode3.png)

Consisting of a series of compare instructions with various resolution values, the function checks that the provided number belongs to the list of allowed resolutions or otherwise changes it to a default. Surprisingly, the next function in memory was the one that filters the allowed resolutions to appear in the preferences dialog. Replacing the first instruction of each function with a simple "return success" stub was all that was needed to disable this behavior. Once the game was restarted, the options showed all resolutions supported by the graphics card and the game appeared to run fine without any glitches using them. The view of the simulated cities was much larger and the UI elements scaled properly.

![Game options menu after fix](/assets/posts/rcode4.png)

Indeed, examining assembly code can be difficult and time consuming. But it was fun to change something that would have otherwise been impossible and allow an old classic to take full advantage of a modern display.

![Ingame screenshot](/assets/posts/rcode5.png)

If you have this game and want to patch your own copy, you can do so with a hex editor. This will require a version of the game that isn't encrypted (or requires a CD to start). Here is the patch procedure:
```
search for the the byte sequence:
8b 4c 24 04 8b 44 24 08 53
and overwrite the first four bytes with:
c2 08 00 90
then search for the the byte sequence:
8b 4c 24 04 8b 54 24 08 81 f9
and overwrite the first four bytes with:
c2 08 00 90
```
This solution is now also available on the [WSGF Games DB](https://www.wsgf.org/dr/simcity-3000/en).

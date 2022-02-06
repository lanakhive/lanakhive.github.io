---
layout: post
title:  "Extracting Game Boy Camera Photos"
date:   2020-4-16 13:44:00 -0600
categories: hardware
header_image: /assets/header/gbcameraheader.jpg
---
A while back I found my [Game Boy Camera](https://en.wikipedia.org/wiki/Game_Boy_Camera) and was checking out the photos that were still stored in its memory. I figured it was a good time to save the images while that data was still intact. Getting the data out of the Game Boy was not a trivial pursuit since the device doesn't have any standard data ports. The camera supported the [Game Boy Printer](https://en.wikipedia.org/wiki/Game_Boy_Printer) using the link cable, which I also have and could print the images onto thermal sticker paper. This paper is hard to find nowadays, but getting the data out through the link cable port seemed like an approach that would work. I ended up finding the [Arduino Gameboy Printer Emulator](https://github.com/mofosyne/arduino-gameboy-printer-emulator) project which uses an Arduino to emulate the Game Boy printer and dump out the image data instead of printing.

![Photo of Game Boy connected to an Arduino](/assets/posts/gbcamera1.jpg)

I had an [Arduino Duemilanove](https://docs.arduino.cc/retired/boards/arduino-duemilanove/) from 2009 and a damaged link cable to salvage the port connector from. Wiring it up was easy but the program sketch was too large to fit in the archaic Arduino's flash memory. After analyzing the sketch I noticed that a significant portion of the program was taken up by debug strings that were printed back to the serial console. Since all I really needed was the image data, these print statements could be removed allowing the program to fit.

![Photo showing wires connected to link port](/assets/posts/gbcamera2.jpg)

After that is was just a matter of going through each photo on the Game Boy and "printing" it. 😺

![Photo of cat taken with Game Boy Camera](/assets/posts/gbcamera0.png)

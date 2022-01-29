---
layout: page
title: 2-bit CMOS Memory
permalink: /hardware/cmosmemory/
---
![photo of memory circuit on breadboard](/assets/hardware/cell1.jpg)

In this project I built a 2-bit CMOS memory cell using TTL ICs. This included an address decoder and a output latch. With only a 2-bit address it can of course *only* store 4 bits of information. Not too useful in itself, however the design could easily be modified and made larger by widening the address size. I managed to fit the entire circuit on a small breadboard, to keep up the trend of miniaturizing electronics (heh). It is still organized and the wires are color coded.

![closeup photo of input segment of logic circuit](/assets/hardware/cell5.jpg)

The 2-bit address is inputted into a DIP switch. Another DIP switch in the is used to toggle between read/write and select the input bit when writing. A switch is then pressed to perform the read/write operation (a momentary button would have been better but our lab surprisingly did not have any).

![closeup photo of memory IC of logic circuit](/assets/hardware/cell4.jpg)

The data is stored in a discrete CMOS transistor configuration using the CD4007UBE. All other logic is implemented using 7400 series TTL ICs.

![closeup photo of output segment of logic circuit](/assets/hardware/cell3.jpg)

On the output, a latched LED shows the last bit that has been read. Four other LEDs show the current bit stored in each memory cell. Quite a simple design on paper, less so when actually assembled.

![photo of memory circuit on breadboard](/assets/hardware/cell2.jpg)
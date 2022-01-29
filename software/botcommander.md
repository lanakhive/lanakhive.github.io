---
layout: page
title: Bot Commander
permalink: /software/botcommander/
header_image: /assets/header/botcommanderhead.png
---
Bot Commander is a simple serial communications console GUI application. It was designed for communicating with my various robot projects in school. A simple data transmission frame protocol was developed to transmit ASCII data commands between robots and the control computer. This application implemented the control computer side of the encoder/decoder. Error detection using a XOR-based CRC was included, though in practice it was not necessary since the various hardware communication modules already performed error detection. The hardware communication modules we used exposed the port as a standard Windows COM port through USB. The application was built using C#/.NET Winforms.

![screenshot of application window](/assets/software/comwindow.png)

Variations of the application were built for each project to better fit the needs of each system, though the core logic and protocols remain mostly the same. These variations are shown on both the [Semi-Autonomous Robot]({% link hardware/autorobot.md %}) and the [Quadcopter Flight Controller]({% link hardware/quadcopter.md %}) pages. Some versions had hotkey buttons added for commonly used functions, while others displayed status data obtained from fixed-rate polling.

Check out the code for this basic application and the corresponding microcontroller driver on [GitHub](https://github.com/lanakhive/BotCommander).
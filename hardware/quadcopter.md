---
layout: page
title: Quadcopter Flight Controller
permalink: /hardware/quadcopter/
---
![photo of quadcopter](/assets/hardware/quad1.jpg)

The quadcopter, a four rotor multicopter that can fly in any direction. Beyond adding four motors on a frame, what kind of control system is necessary to allow stable flight and ease of control for the user? How can we prevent avoidable crashes by flying too close to an object?

![Quadcopter Flight Controller logo](/assets/hardware/quadlogo.png)

In this project my team and I designed and built an embedded flight controller with remote control that would allow a quadcopter to achieve stable flight. We also added sensors to avoid collision and a remote control PC application. The basic frame, motors, and battery were purchased, the rest was to be built for this project.

![photo of Stellaris Launchpad PCB on quadcopter](/assets/hardware/quad4.jpg)

We chose to use the TI Stellaris series of microcontrollers. Originally we had started with the TI MSP430, however due to the number of floating point calculations necessary we needed something with native support. We used the Stellaris Launchpad, which provided an 32-bit ARM Cortex based processor running at 16 MHz and plenty of nice I/O support.

![flight controller block diagram](/assets/hardware/quadblock.png)

This microcontroller interfaces with several devices. The Wi-Fly module over UART allows the remote PC to communicate with the copter. The motor controllers are driven with standard PWM. The gyroscope and accelerometer use an I2C bus. The 10 Ultrasonic sensors use an IO trigger to return a pulse width indicating distance. The firmware running on the microcontroller was divided into three modules that would perform the various functions.

![photo of quadcopter](/assets/hardware/quad6.jpg)

The stabilization algorithm was the most difficult aspect to get working. Using the raw values obtained from the gyroscope and accelerometer, we applied a complimentary filter to obtain X and Y tilt angles. These were then used as input to a PID controller which combined them with a desired angle. The desired angles would determine if the quadcopter was to remain in place or move forward at a certain speed. The output from the PID controller was then used to set the PWM motor speed. Up and Down movement was obtained by applying an offset to all motors at once.

![photo of flight controller PCB on quadcopter](/assets/hardware/quad3.jpg)

Wireless communication was an important part in allowing remote control of the copter. We chose to use Wi-Fi as it met our range requirements and generally proved to be reliable. It also allowed control from any Wi-Fi enabled device. Onboard the copter, we added a Wi-Fly module which was configured to operate in a transparent serial UART mode. Commands were transmitted as ASCII text which were decoded on the device. Binary data could also be transmitted for viewing numerical sensor data. If a wireless connection was lost the copter was set to slowly descend.

![quadcopter PC control application screenshot](/assets/hardware/quadcontrol.png)

On the PC side we built a GUI control application in C#. This application provided manual directional control of the device. Raw and filtered sensor data was transmitted to the the PC at a set interval and can be viewed in the GUI. The flight constants and parameters could also be tuned during flight. If necessary, the copter could be immediately shutdown remotely.

![photo of ultrasonic distance sensors on quadcopter](/assets/hardware/quad2.jpg)

We wanted the quadcopter to be able to detect and avoid nearby objects during flight, a requirement for autonomous operation. The 10 ultrasonic sensors were placed around the copter. Two were placed on each wing, and the remaining 2 were placed in the center facing up and down. These also serve to maintain a stable height during flight. These SR-04 sensors return a pulse when triggered.To read the return pulse, we created an interrupt driven timer that would count the time for the length of the pulse. The distance was then computed from this timer. When the quadcopter gets closer than 1m, the program would direct the system to stop moving and hover in place. Additionally the program could be set to maintain a specific height.

![photo of quadcopter](/assets/hardware/quad5.jpg)

Much time was spent tuning the stabilization algorithm constants and other flight parameters. Testing was difficult, since one fatal crash could prove costly for us. Due to this we kept the copter tethered during most of the testing. Further improvements would include additional tuning and an autonomous flight mode.
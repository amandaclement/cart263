Project 3 - A Digital Journey Into Space
Amanda Clement

CONCEPT
Inspired by the Netflix series “Our Planet” and the exciting possibilities of p5’s WEBGL, I wanted to depict natural elements in a digital world. I sketched out three ideas: a digital jungle where animals are represented through simple shapes and sounds, an interface where the user produces music using natural sounds like rain and wind, and a digital recreation of the solar system. I showed the sketches to a few family members and friends, and the majority voted for the solar system idea so I decided to go forward with that idea.

My project takes the user on a digital journey into space. They can interact with the solar system by moving around their mouse (either by simply hovering it or by clicking while dragging). They can also learn more about each planet by clicking the buttons on the left hand-side. This displays some basic information about the selected planet, and the user can hear the sound it makes by hovering over it.

For my final project last semester, I worked in WEBGL. I was really impressed with how little code was needed to create stunning visuals, but I experienced many issues at the time since I was not too familiar with its usage. I wanted to use WEBGL once more since I have become more comfortable with javascript coding so I could hopefully overcome some of the obstacles I previously faced.

VISUALS & AUDIO
Once the interface has loaded, the user is presented with the solar system. The sun and planets are represented by spheres in varying sizes and speeds that orbit around the sun. The sizes and speeds are evidently not proportional to the actual solar system due to limited canvas space, however I tried to make it as accurate as possible (using the orbit velocity information from https://www.sjsu.edu/faculty/watkins/orbital.htm). The user moves around their mouse to change the direction of the shadows and the spinning speed of each planet. They can also control the perspective of the orbit effect by dragging while pressing down their mouse.

The background consists of three layers: an image of the Milky Way, an animated layer of blue and green fog, and an animated layer of red, blue and white stars. This is framed with a foreground image of a spaceship window to give the effect that the user is observing the solar system from a spaceship.

There are buttons on the left-hand side of the interface where the user can select the sun or any planet. By clicking the button, that planet is displayed alone in bigger form and some information about it including its size and orbit speed are shown. The information written comes from NASA’s website. When a planet is individually selected, the user can hover over it to activate its sound. They can click RETURN TO ORBIT at any time to return to the main solar system visual.

Since the interface uses many images and audio files, I included a loading page saying PREPARING FOR BLAST OFF.

CODE
My project uses the following javascript libraries: p5.js (WEBGL), jQuery, jQueryUI, particles.js, and vanta.js (which uses three.js). I used HTML to input the text and CSS for some basic styling. WEBGL was mainly used to create the 3D planets, orbiting effect, and to control the audio. Initially, I created the text and buttons in p5, but I decided to instead use jQuery and jQuery UI to make the code more efficient and to fix an issue I was having with the mousePressed() p5 button function. I wanted to implement p5’s orbitControl() so that the user could change the perspective of the solar system orbit, however I wanted to disable the zoom effect so I overrode it by including a file to modify the original orbitControl() function.

Although the moving starry background could have been created in p5, I used particles.js for the stars to experiment with the library. I used vanta.js for the foggy animated background.

//initializing variables
let projectText;
let headerFont;
let xPos_Text;
let yPos_Text;
let colorText;

let speechOut;
let paraNum;

let startButton;
let stopButton;

let rateSlider;
let rateValue;
let pitchSlider;
let pitchValue;

//creating class for speech-action buttons
class speechButton
{
  constructor(_buttonName, _xPosButton, _yPosButton, _clickFunction)
  {
    this.button = createButton(_buttonName);
    this.button.position(_xPosButton,_yPosButton);
    this.button.style("width","75px");
    this.button.style("height","30px");
    this.button.mouseClicked(_clickFunction);
  }
}

//pre-loading textual content & font
function preload()
{
  projectText = loadStrings("./HW09_Text.txt");
  headerFont = loadFont("./Rowdies.ttf");
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(255);
  speechOut = new p5.Speech();

  line(width/1.5, 0, width/1.5, height);

  fill(255,0,200);
  textFont(headerFont);
  textSize(50);
  text('text reader', width/1.33, height-(height-50));
  fill(0);
  textSize(15);
  text('- with a twist -', width/1.25, height-(height-70));

  //generating buttons
  speakButton = new speechButton('Speak', width/1.26, height/2, startSpeech);
  stopButton = new speechButton('Stop', width/1.17, height/2, stopSpeech);

  fill(0);
  noStroke();
  textAlign(CENTER,CENTER);
  textFont("sans-serif");
  textSize(13);
  text('Rate: ', width/1.24, height/1.65);
  text('Pitch: ', width/1.24, height/1.52);

  //generating speech property sliders
  rateSlider = createSlider(0.1, 2, 1, 0.1);
  rateSlider.position(width/1.22,height/1.69);
  pitchSlider = createSlider(0.01, 2, 1, 0);
  pitchSlider.position(width/1.22,height/1.55);
}

//function definition related to "speak" button
function startSpeech()
{
  paraNum = int(random(0,projectText.length));
  speechOut.speak(projectText[paraNum]);
  
  colorText = true;
}

//function definition related to "stop" button
function stopSpeech()
{
  speechOut.stop();
  colorText = false;
}

function draw()
{
  //assigning rate & pitch values dynamically
  rateValue = rateSlider.value();
  speechOut.setRate(rateValue);
  
  pitchValue = pitchSlider.value();
  speechOut.setPitch(pitchValue);

  rectMode(CORNER);
  fill(255);
  rect(0, 0, width/1.5, height);

  noStroke();
  xPos_Text = width/3.05;
  yPos_Text = height-(height-75);

  rectMode(CENTER);
  textAlign(LEFT,TOP);
  textSize(12.5);

  //generating left-hand side text
  for(let i=0;i<projectText.length;i++)
  {
    //condition for checking "active" paragraph
    if((i==paraNum) && (colorText==true))
    {
      fill(255,0,0);
    }
    else
    {
      fill(0);
    }
    
    text(projectText[i], xPos_Text, yPos_Text, width/1.6, 100);
    yPos_Text+=height/17;
  }
}
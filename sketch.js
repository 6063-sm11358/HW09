//initializing variables
let projectText;
let headerFont;
let xPos_Text;
let yPos_Text;
let colorText;

let speechOut;
let speechRec;
let paraNum;
let paraDone = [];
let paraFound = 0;

let startButton;
let stopButton;

let rateSlider;
let rateValue;
let pitchSlider;
let pitchValue;
let voiceSlider;
let voiceValue;

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

  textAlign(CENTER,CENTER);
  textSize(16);
  textFont('sans-serif');
  text('You choose the "speed", pitch, and the voice. The code chooses the paragraph.', width/1.37, height/6.7, 350, 200);

  //generating buttons
  speakButton = new speechButton('Read', width/1.26, height/2, startSpeech);
  stopButton = new speechButton('Stop', width/1.17, height/2, stopSpeech);

  fill(0);
  noStroke();
  textAlign(CENTER,CENTER);
  textFont("sans-serif");
  textSize(13);
  text('Rate: ', width/1.24, height/1.65);
  text('Pitch: ', width/1.24, height/1.52);
  text('Voice: ', width/1.24, height/1.40);
  
  // numVoices = speechOut.voices.length;

  //generating speech property sliders
  rateSlider = createSlider(0.1, 2, 1, 0.1);
  rateSlider.position(width/1.22,height/1.69);

  pitchSlider = createSlider(0.01, 2, 1, 0);
  pitchSlider.position(width/1.22,height/1.55);

  voiceSlider = createSlider(1,24,1,1);
  voiceSlider.position(width/1.22,height/1.43);
}

//function definition related to "speak" button
function startSpeech()
{
  paraNum = int(random(0,projectText.length));

  //code to check whether the "active" paragraph has been read or not
  for(i=0;i<paraDone.length;i++)
  {
    if(paraDone[i]==paraNum)
    {
      paraFound = 1;
      break;
    }
    else
    {
      paraFound = 0;
    }
  }

  //speak paragraph and append para index if unique paragraph
  //run whole function again if non-unique paragraph
  if(paraFound==0)
  {
    paraDone.push(paraNum);
    speechOut.speak(projectText[paraNum]);
    colorText = true;
  }
  else if(paraFound==1)
  {
    if(paraDone.length==projectText.length)
    {
      speechOut.speak("We have gone through the entire passage.");
    }
    else
    {
      startSpeech();
    }
  }
}

//function definition related to "stop" button
function stopSpeech()
{
  speechOut.stop();
  colorText = false;
}

function draw()
{
  //assigning rate, pitch, voice values dynamically
  rateValue = rateSlider.value();
  speechOut.setRate(rateValue);
  
  pitchValue = pitchSlider.value();
  speechOut.setPitch(pitchValue);
  
  voiceValue = voiceSlider.value();
  speechOut.setVoice(voiceValue);

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
    yPos_Text+=height/8.5;
  }
}
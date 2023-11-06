let speechOut;
let speechRec;
let continuous;
let interimResults;

let xPos;
let yPos;
let rectSize;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  speechOut = new p5.Speech();
  
  continuous = true;
  interimResults = true;
  speechRec = new p5.SpeechRec(speechFunc);
  speechRec.start(continuous,interimResults);

  xPos = width/2;
  yPos = height/2;
  rectSize = 30;
}

function speechFunc(speech)
{
  if(speech.text.includes('left'))
  {
    speechOut.speak('Okay. Moving to the left');
    xPos-=30;
  }
  else if(speech.text.includes('right'))
  {
    speechOut.speak('Okay. Moving to the right');
    xPos+=30;
  }
  
  print(speech.text);
}

function draw()
{
  background(255);
  
  fill('red');
  noStroke();
  rect(xPos, yPos, rectSize, rectSize);
}

function mouseClicked()
{
  speechOut.speak('Hello there');
}

let eupx = 200;
let eupy = 380;

let velocidade = 10;

let inpx = 200;
let inpy = 0;

let tempo = 0;

let meuponto = 0;

let vida = 3;

let sefezone = 320;

let blackspeed = 5;

function preload() {
  trilha = loadSound("som.mp3");
  sompo = loadSound("ponto.mp3");
}
function setup() {
  createCanvas(400, 400);
  escolheponto();
  trilha.loop();
}
function escolheponto() {
  pxdp = random(0, 380);
  pydp = random(40, 370);
}

function draw() {
  
  background(100, 0, 0);
  casa();
  eu();
  move();
  verificarcoliborda();
  inimigo();
  timer();
  perde();
  ponto();
  life();
}

function eu() {
  fill("white");
  rect(eupx, eupy, 20, 20, 10, 10, 4);
}

function move() {
  if (keyIsDown(RIGHT_ARROW)) {
    eupx += velocidade;
  }
  if (keyIsDown(LEFT_ARROW)) {
    eupx -= velocidade;
  }
  if (keyIsDown(UP_ARROW)) {
    eupy -= velocidade;
  }
  if (keyIsDown(DOWN_ARROW)) {
    eupy += velocidade;
  }
}

function verificarcoliborda() {
  fill("black");
  rect(0, 0, 400, 40);
  if (eupx < 0) {
    eupx = 0;
  }
  if (eupy < 40) {
    eupy = 40;
  }
  if (eupx > 380) {
    eupx = 380;
  }
  if (eupy > height - 20) {
    eupy = 380;
  }
}

function inimigo() {
  rect(inpx, inpy, 20, 20, 20, 20, 0);

  if (inpx < eupx) {
    inpx += blackspeed;
  }
  if (inpy < eupy) {
    inpy += blackspeed;
  }
  if (inpx > eupx) {
    inpx -= blackspeed;
  }
  if (inpy > eupy) {
    inpy -= blackspeed;
  }
}

function timer() {
  fill("white");
  text(tempo++ / 100, 336, 30);
  textSize(32);
}
function perde() {
  fill("black");

  if (eupx == 360 && eupy == 360) {
    rect(150, 174, 110, 36, 10);
    fill("red");
    text("perdeu", 155, 200);
    textSize(32);
  }
}
function ponto() {
  fill("yellow");
  rect(pxdp, pydp, 20, 30, 20);

  if (
    pxdp > eupx - 20 &&
    pydp > eupy - 20 &&
    pxdp < eupx + 20 &&
    pydp < eupy + 20
  ) {
    escolheponto();
    sompo.play();
    blackspeed = -5;

    meuponto += 1;
  }
  if (blackspeed < -4) {
    blackspeed += 10;
  }
}

function casa() {
  fill("green");
  rect(sefezone, sefezone, 80, 80);
  if (inpx > sefezone - 20 && inpy > sefezone - 20 && inpx < sefezone + 80 && inpy < sefezone + 80) {
    inpx -= 5;
    inpy -= 5;
  }
  
  if(eupx > sefezone - 20 && eupy > sefezone - 20 && eupx < sefezone + 80 && eupy < sefezone + 80){tempo-=1}
  
}

function life() {
  if (inpx == eupx && inpy == eupy) {
    vida -= 1;
  }

  rect(4, 4, 20, 30, 20);
  text(meuponto, 25, 30);
  fill("red");
  text("vida " + (vida + meuponto / 2), 70, 30);

  textSize(32);

  if (vida + meuponto / 2 < 0.5) {
    eupx = 360;
    eupy = 360;

    meuponto *= 0;
    tempo *= 0 ;
    tempo+=1;
    vida = 3;
  }
}




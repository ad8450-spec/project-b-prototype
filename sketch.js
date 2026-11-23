
let character;
let bpm = 76;
let energy = 68;
let callActive = false;
let callName = "unknown number";
let sync = 78;
// oop, currently not everything obj.oriented programming, but i will improve it later7



// temporary values потом поменять
let fontSize = 14;

function setup() {
  createCanvas(1000, 720);
  character = new UserCharacter();
  textFont("monospace");
}

function draw() {
  background("#304c49");

  // background maybe change laterbGEOMETRIC pattern
  noStroke();
  fill("#382253");
  quad(0, 350, 800, 220, 1000, 720, 0, 720);
  fill("#242b53");
  quad(400, 0, 1000, 0, 1000, 720, 450, 650);

  drawHeader();
  drawCharacterWindow();
  drawRightWindows();
  drawVitals();

  //
  
}

function drawHeader() {

  noFill();
  stroke("#eee9e7");
  strokeWeight(2);
  rect(40, 25, 920, 65, 18);

  noStroke();
  fill("#eee9e7");
  textSize(28);
  text("unauthorized log in...", 75, 68);

  fill("#ff3333");
  textSize(25);
  text("!!", 910, 70);

  // missed calls
  noFill();
  stroke("#eee9e7");
  rect(65, 100, 870, 60, 12);

  noStroke();
  fill("#eee9e7");
  textSize(25);
  text("missed all ...", 100, 140);
}

function drawCharacterWindow() {
  stroke("#eee9e7");
  strokeWeight(3);
  noFill();
  rect(55, 190, 540, 390);

  noStroke();
  fill("#30204e");
  rect(60, 195, 530, 380);

  character.display(315, 365);

  fill("#eee9e7");
  textSize(16);
  text("subject 001", 105, 520);

  fill("#00ef75");
  textSize(12);
  text("reflection status: " + character.mood, 105, 545);

  noFill();
  stroke("#00ef75");
  rect(105, 550, 180, 30);

  noStroke();
  fill("#00ef75");
  textSize(13);
  text("synchronize", 145, 570);

  // update char design сделать нормальное лицо, типо пресеты, пока не знаю как maybe use image later
}

function drawRightWindows() {

  // messages window
  stroke("#eee9e7");
  strokeWeight(2);
  noFill();
  rect(625, 190, 320, 115);

  noStroke();
  fill("#eee9e7");
  textSize(18);
  text("messages", 655, 225);

  fill("#00ef75");
  textSize(11);
  text("no new messages", 655, 260);

  // empty for now
  // сюда потом добавить сообщения
  // not sure about the layout yet


  // appointments window
  stroke("#eee9e7");
  noFill();
  rect(625, 330, 320, 115);

  noStroke();
  fill("#eee9e7");
  textSize(18);
  text("appointments", 655, 365);

  fill("#00ef75");
  textSize(11);
  text("nothing scheduled", 655, 400);

  // leave this empty пока
  // appointment class later?


  // incoming call window
  stroke("#eee9e7");
  noFill();
  rect(625, 470, 320, 105);

  noStroke();
  fill("#eee9e7");
  textSize(18);
  text("incoming call", 655, 505);

  fill("#00ef75");
  textSize(12);

  if (callActive) {
    text(callName, 655, 535);
  } else {
    text("no active calls", 655, 535);
  }

  noFill();
  stroke("#00ef75");
  rect(655, 545, 120, 23);

  noStroke();
  fill("#00ef75");
  textSize(10);
  text("simulate call", 672, 561);
}

function drawVitals() {

  noFill();
  stroke("#eee9e7");
  strokeWeight(2);
  rect(55, 610, 890, 85);

  noStroke();
  fill("#eee9e7");
  textSize(19);
  text("VITALS", 80, 640);

  textSize(14);
  text("BPM: " + bpm, 80, 672);
  text("energy: " + energy + "%", 240, 672);

  fill("#00ef75");
  textSize(11);
  text("sync: " + character.sync + "%", 460, 672);

  noFill();
  stroke("#00ef75");
  rect(760, 635, 150, 35);

  noStroke();
  fill("#00ef75");
  textSize(12);
  text("update data", 790, 657);

  // fake data for now (later shd be user inout)
  
}

class UserCharacter {
  // mainly use oop in this class, because drawing seperate part, and ill need to use the functions from thic class in other purposes as well (i also added cynchronization button, so user cvan interact and update vitals, but it will be improcved later on.)

  constructor() {
    this.mood = "calm";
    this.sync = 78;
    this.size = 1;
  }

  update() {

    if (energy < 35) {
      this.mood = "tired";
    }

    else if (bpm > 110) {
      this.mood = "alert";
    }

    else {
      this.mood = "calm";
    }

    this.sync = int((energy + bpm) / 2);
    this.sync = constrain(this.sync, 0, 100);
  }

  display(x, y) {

    push();
    translate(x, y);
    scale(this.size);

    // head for now
    stroke("#eee9e7");
    strokeWeight(4);
    fill("#253c43");
    ellipse(0, -35, 155, 180);

    // face lines, looks weird but ok
    stroke("#eee9e7");
    strokeWeight(3);

    for (let i = 0; i < 8; i++) {
      line(-55, -90 + i * 15, 55, -80 + i * 15);
    }

    // neck
    line(0, 55, 0, 95);

    // body
    fill("#30204e");
    beginShape();
    vertex(-90, 180);
    vertex(-75, 100);
    vertex(75, 100);
    vertex(90, 180);
    endShape(CLOSE);

    stroke("#00ef75");
    line(-65, 125, -85, 150);

    pop();

    // TODO maybe animate the head??
    // не нравится пока
  }

  interact() {
    this.sync += 5;
    this.sync = constrain(this.sync, 0, 100);
    this.mood = "connected";
  }
}

//,add more magenta and yellow details tomake it look cyberpunker

function mousePressed() {

  // synchronize character
  if (mouseX > 105 && mouseX < 285 &&
      mouseY > 550 && mouseY < 580) {

    character.interact();
  }

  // simulate incoming call
  if (mouseX > 655 && mouseX < 775 &&
      mouseY > 545 && mouseY < 568) {

    callActive = !callActive;

    if (callActive) {
      callName = "private caller";
    }
  }

  // update fake vitals
  if (mouseX > 760 && mouseX < 910 &&
      mouseY > 635 && mouseY < 670) {

    bpm = int(random(65, 130));
    energy = int(random(20, 100));

    character.update();
  }
}
// add later: character anim, msgs, update user design, messages (should be incoming? randomize variables.)
// sounds?? фтв адщцштп зфкешсдуы 

var bg;
var bird;
var pipes = [];
var mic;
var sliderTop;
var sliderBottom;
var tresholdTop;
var tresholdBottom;
var clapping = false;
var score = 0;

function setup() {
    bg = loadImage("http://www.ellison.rocks/clumsy-bird/data/img/bg.png");
    createCanvas(400,600);
    mic = new p5.AudioIn();
    mic.start();
    bird = new Bird();
    pipes.push(new Pipe());
    sliderTop =  createSlider(0, 1, 0.1, 0.01);
    sliderBottom =  createSlider(0, 1, 0.05, 0.01);
}

function draw() {
    background(bg);


    textSize(32);
    text(this.score, 50, 30);

    var volume = mic.getLevel();

    for (var i = pipes.length - 1; i >= 0; i--){
        pipes[i].show();
        pipes[i].update();

        if(pipes[i].hits(bird)) {
            this.score -= 1;
        }

        if(pipes[i].offscreen()){
            pipes.splice(i, 1);
        }
    }


    bird.update();
    bird.show();
    if(frameCount % 20 == 0){
        this.score += 1;
    }  
    if(frameCount % 100 == 0){
        pipes.push(new Pipe());
    }

    if(volume > tresholdTop && !clapping){
        bird.up();
        clapping = true;
    }

    if(volume < tresholdBottom) {
        clapping = false;
    }

    fill(0,255,0);
    noStroke();
    var y = map(volume, 0, 1, height, 0);
    rect(width - 50, y, 50, height - y);
    tresholdTop = sliderTop.value();
    tresholdBottom = sliderBottom.value();


    var ty = map(tresholdTop, 0, 1, height, 0);
    stroke(255,0,0);
    strokeWeight(4);
    line(width - 50, ty, width, ty);


    var by = map(tresholdBottom, 0, 1, height, 0);
    stroke(0,0,255);
    strokeWeight(4);
    line(width - 50, by, width, by);


}

function keyPressed(){
    if (key == ' '){
        bird.up();
    }
}
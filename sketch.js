
let beat, analyzer;
let angle = 0;

function preload() {
    beat = loadSound('beat.mp3');
}

function setup() {
    let myCanvas = createCanvas(710, 400, WEBGL);
    myCanvas.parent('myContainer');

    angleMode(DEGREES);
    strokeWeight(1);
    noFill();
    stroke(32, 8, 64);

    analyzer = new p5.Amplitude();
    analyzer.setInput(beat);
}

function mousePressed() {
    userStartAudio();

    if (beat.isPlaying()) {
        beat.stop();
    } else {
        beat.loop();
    }
}

function draw() {
    background(180, 210, 250);

    orbitControl();

    let rms = 0;
    if (analyzer.getLevel()) {
        rms = analyzer.getLevel();
    }

    if (beat.isPlaying()) {
        angle += 0.3;
    }

    rotateY(angle);

    for (let zAngle = 0; zAngle < 180; zAngle += 45) {
        for (let xAngle = 0; xAngle < 360; xAngle += 45) {
            push();

            rotateZ(zAngle);
            rotateX(xAngle);

            translate(0, 200, 0);
            box(60 + rms * 150);

            pop();
        }
    }
}

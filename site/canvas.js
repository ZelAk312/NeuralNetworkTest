let canvas;
let mLine;
let bLine;
let points = [];
let nn;
let pointsIndex = 0;
let loopIndexC = 0;
let loopCounter;
let w1C;
let w2C;
let w3C;

// function getLineY(x) {
//     return -mLine * x + bLine;
// }

function getLineY2(x) {
    return bLine * x + mLine;
}

function getYForNetwork(x) {
    return nn.w[1] / nn.w[0] * nn.w[2] * 1;
}

function setup() {
    canvas = createCanvas(700, 700);
    canvas.parent("sketch-holder");
    canvas.mousePressed(mousePressedIgnored);
    mLine = height / 2;
    bLine = 0;
    nn = new NeuralNetwork(0.001, 1.2);
    loopCounter = document.getElementById("loopCounter");
    w1C = document.getElementById("w1");
    w2C = document.getElementById("w2");
    w3C = document.getElementById("w3");
    w1C.innerHTML = nn.w[0];
    w2C.innerHTML = nn.w[1];
    w3C.innerHTML = nn.w[2];
}

function draw() {
    background(150);

    //line(-1, getLineY(-1), 1, getLineY(1))
    //translate(width / 2, height / 2);
    //ellipse(0, 0, 20, 20);
    //line(-1 * width, getLineY(-1 * width), 1 * width, getLineY(1 * width))
    line(0, getLineY2(0), width, getLineY2(width));
    line(0, nn.guessY(0), width, nn.guessY(width));

    if (keyIsPressed) {
        if (keyCode == 38) {
            mLine += -2;
        } else if (keyCode == 40) {
            mLine += 2;
        } else if (keyCode == 37) {
            bLine += -0.005;
        } else if (keyCode == 39) {
            bLine += 0.005;
        }
    }

    points.forEach(p => {
        ellipse(p.x, p.y, 30, 30);
        push();
        noStroke();
        if (p.guessed) {
            fill(0, 255, 0);
        } else {
            fill(255, 0, 0);
        }
        ellipse(p.x, p.y, 18, 18);
        pop();
    });
    if (lookIfFinished(points) == false) {
        if (points.length != 0) {
            loopIndexC += 1;
            loopCounter.innerHTML = loopIndexC;
            let targetP = points[pointsIndex];
            if (nn.train([targetP.x, targetP.y], targetP.target)) {
                points[pointsIndex].guessed = true;
            } else points[pointsIndex].guessed = false;
            pointsIndex++;
            if (pointsIndex == points.length) pointsIndex = 0;
            w1C.innerHTML = nn.w[0];
            w2C.innerHTML = nn.w[1];
            w3C.innerHTML = nn.w[2];
        }
    }
}

function lookIfFinished(pts) {
    let find = true;
    if (!pts) return true;
    pts.forEach(p => {
        if (p.guessed == false) {
            find = false;
        }
    });
    return find;
}

function mousePressedIgnored() {
    points.push(new Point(mouseX, mouseY));
    console.log(points[points.length - 1].target);
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.guessed = false;
    }

    get target() {
        return this.y - getLineY2(this.x) >= 0 ? -1 : 1;
    }
}

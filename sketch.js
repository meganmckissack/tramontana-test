// Web socket issue solution
// https://www.damirscorner.com/blog/posts/20210528-AllowingInsecureWebsocketConnections.html

var device = new tramontana();
var yaw = 0;  
function setup() {
  try {
    if (typeof window.console != "undefined") {
      window.console = {};
      window.console.log = function () {};
      window.console.debug = function () {};
      window.console.info = function () {};
      window.console.warn = function () {};
      window.console.error = function () {};
    }

    if (typeof alert !== "undefined") {
      alert = function () {};
    }
  } catch (ex) {}

  createCanvas(400, 400);

  device.start("172.16.4.150", function (e) {
    if (e == undefined) {
      //SUCCESS TRAMONTANA CONNECTED
      device.makeVibrate();
      device.setBrightness(1.0); // between 0.0 - 1.0
      device.subscribeAttitude(15, function (e, b) {
        //print("yaw: " + b.y);
        yaw = b.y;
      });
    } else {
      print("connection failed");
    }
  });

  rectMode(CENTER);
}

function draw() {
  background(220);
  fill(255, 0, 0);
  push();
  translate(width * 0.5, height * 0.5);
  rotate(yaw);
  rect(0, 0, 80, 80);
  pop();
}

function onAttitudeEvent(_ip, _roll, _pitch, _yaw) {
  //console.log(_ip);
  //yaw = _yaw;
}

function keyPressed() {
  if (key == " ") {
    device.setColor(random(0, 1), random(0, 1), random(0, 1), 1.0);
  }
}

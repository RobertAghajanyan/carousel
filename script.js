const mainDiv = document.getElementById("main");
const arrOfPics = document.getElementsByClassName("images");
let currentPicIndex = 0;
let currentPic = arrOfPics[currentPicIndex];
let pastPic = null;
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
let colorsOfBtns = [
  backBtn.style.backgroundColor,
  nextBtn.style.backgroundColor,
];

//disapearing with animation

//move left

function goesLeft(elementDiv, speed = 2) {
  let pos = 0;
  let goeing = setInterval(() => {
    if (pos >= 200) {
      clearInterval(goeing);
      elementDiv.style.marginRight = 0 + "px";
    } else {
      pos++;
      elementDiv.style.marginRight = pos + "px";
    }
  }, speed);
}

//move right

function goesRight(elementDiv, speed = 2) {
  let pos = 0;
  let goeing = setInterval(() => {
    if (pos === 200) {
      clearInterval(goeing);
      elementDiv.style.marginLeft = 0 + "px";
    } else {
      pos++;
      elementDiv.style.marginLeft = pos + "px";
    }
  }, speed);
}

//functions for css opacity control
function opacityUp(element, speed = 50) {
  let opacityInterval = setInterval(function () {
    let opacity = Number(element.style.opacity);
    element.style.opacity = String(opacity + 0.01);
    if (opacity === 1) {
      clearInterval(opacityInterval);
    }
  }, speed);
}

function opacityDown(element, speed = 50) {
  let opacityInterval = setInterval(function () {
    let opacity = Number(element.style.opacity);
    element.style.opacity = String(opacity - 0.01);
    if (opacity === 0) {
      clearInterval(opacityInterval);
    }
  }, speed);
}

opacityUp(currentPic, 8); //first element visibility

//next button
function nextFn() {
  debugger;
  let speed = 2;
  opacityDown(currentPic, speed);
  goesLeft(currentPic, speed);
  setTimeout(() => {
    currentPic.style.display = "none";
    if (currentPicIndex === arrOfPics.length - 1) {
      currentPicIndex = -1;
      currentPic = arrOfPics[currentPicIndex];
      pastPic = null;
    }
    pastPic = currentPic;
    currentPic = arrOfPics[++currentPicIndex];
    opacityUp(currentPic, speed);
    currentPic.style.display = "flex";
  }, 100 * speed);
}
nextBtn.addEventListener("click", nextFn);

//back button
function backFn() {
  let speed = 2;
  opacityDown(currentPic, speed);
  goesRight(currentPic, speed);
  setTimeout(() => {
    currentPic.style.display = "none";

    if (currentPicIndex === 0) {
      currentPicIndex = 5;
      currentPic = arrOfPics[currentPicIndex];
      pastPic = 4;
    }
    pastPic = currentPic;
    currentPic = arrOfPics[--currentPicIndex];
    opacityUp(currentPic, speed);
    currentPic.style.display = "flex";
  }, 100 * speed);
}
backBtn.addEventListener("click", backFn);

//player

startBtn.addEventListener("click", function () {
  //start button
  nextBtn.removeEventListener("click", nextFn);
  backBtn.removeEventListener("click", backFn);
  nextBtn.style.backgroundColor = "rgb(255, 115, 115)";
  backBtn.style.backgroundColor = "rgb(255, 115, 115)";
  nextBtn.style.color = "white";
  backBtn.style.color = "white";
  nextBtn.style.cursor = "not-allowed";
  backBtn.style.cursor = "not-allowed";

  let playing = setInterval(nextFn, 4000);

  //stop button
  stopBtn.addEventListener("click", function () {
    clearInterval(playing);
    nextBtn.addEventListener("click", nextFn);
    backBtn.addEventListener("click", backFn);
    nextBtn.style.backgroundColor = colorsOfBtns[1];
    backBtn.style.backgroundColor = colorsOfBtns[0];
    nextBtn.style.color = "black";
    backBtn.style.color = "black";
    nextBtn.style.cursor = "pointer";
    backBtn.style.cursor = "pointer";
  });
});

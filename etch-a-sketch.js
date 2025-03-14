const container = document.querySelector(".container");
const draw = document.querySelector(".draw");
const eraser = document.querySelector(".eraser");
const clear = document.querySelector(".clear");
const sliderSize = document.getElementById("sliderSize");
const colorPicker = document.getElementById("colorPicker");
const toggleGrid = document.querySelector(".toggle-grid");
let sizeValueDisplay = document.querySelector(".size-value");
let sizeValue = 16;
let isToggled = false;
let isDrawing = false;
let isErasing = false;
let selectedColor = "#ff0000";

//Initialize canvas
changeColor();
changeCanvasSize(sizeValue);
toggleButton(draw);

function changeColor() {
  selectedColor = colorPicker.value;
}

function toggleButton(button) {
  button.classList.toggle("active");
}

function changeSizeValue(sizeValue) {
  sizeValueDisplay.value = sizeValue;
  sizeValueDisplay.innerHTML = `${sizeValue} x ${sizeValue}`;
}

function enableGrid() {
  isToggled = !isToggled;
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.style.boxShadow = isToggled ? "0 0 0 0.5px black" : "none";
  });
}

function changeCanvasSize(sizeValue) {
  container.innerHTML = "";

  for (let i = 0; i < sizeValue * sizeValue; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    container.appendChild(square);
  }

  document.documentElement.style.setProperty("--canvas-size", sizeValue);

  //Re-select squares after recreating them
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.addEventListener("mouseenter", () => {
      if (isDrawing) {
        square.style.backgroundColor = isErasing ? "white" : selectedColor;
      }
    });
  });
}

//Event Listeners
colorPicker.addEventListener("input", changeColor);

sliderSize.addEventListener("input", () => {
  sizeValue = sliderSize.value;
  changeSizeValue(sizeValue); //update displayed size
  changeCanvasSize(sizeValue); //update grid size

  if (isToggled) {
    const squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
      square.style.boxShadow = isToggled ? "0 0 0 0.5px black" : "none";
    });
  }
});

document.addEventListener("mousedown", () => {
  isDrawing = true;
});

document.addEventListener("mouseup", () => {
  isDrawing = false;
});

toggleGrid.addEventListener("click", () => {
  toggleButton(toggleGrid);
  enableGrid();
});

draw.addEventListener("click", () => {
  if (!draw.classList.contains("active")) {
    toggleButton(draw);
    eraser.classList.remove("active");
  }

  isErasing = false;
});

eraser.addEventListener("click", () => {
  if (!eraser.classList.contains("active")) {
    toggleButton(eraser);
    draw.classList.remove("active");
  }

  isErasing = true;
});

clear.addEventListener("click", () => {
  toggleButton(clear);
  setTimeout(() => {
    clear.classList.remove("active");
  }, 500);
  changeCanvasSize(sizeValue);

  if (isToggled) {
    const squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
      square.style.boxShadow = isToggled ? "0 0 0 0.5px black" : "none";
    });
  }
});

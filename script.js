const headerDiv = document.createElement('header');
document.body.appendChild(headerDiv);
const header = document.getElementsByTagName('header');
const h1 = document.createElement('h1');

const createDiv = (id, parent, className) => {
  const div = document.createElement('div');
  div.id = id;
  div.className = className;
  parent.appendChild(div);
};

const createBtn = (id, parent, innerText) => {
  const btn = document.createElement('button');
  btn.id = id;
  btn.innerText = innerText;
  parent.appendChild(btn);
};

const createInput = (id, parent) => {
  const input = document.createElement('input');
  input.id = id;
  input.type = 'number';
  input.setAttribute('min', '1');
  parent.appendChild(input);
};
// ---- TITULO -------
h1.id = 'title';
h1.innerHTML = 'Paleta de Cores';
header[0].appendChild(h1);

const createColorPalette = () => {
  const colorsPaletteArray = ['black', 'red', 'blue', 'yellow'];
  const colorPalette = document.getElementById('color-palette');
  for (let index = 0; index < colorsPaletteArray.length; index += 1) {
    createDiv('color', colorPalette, 'color');
    const paletteColorsSquare = document.getElementsByClassName('color');
    if (index === 0) {
      paletteColorsSquare[index].classList.add('selected');
    }
    paletteColorsSquare[index].style.backgroundColor = colorsPaletteArray[index];
  }
};

const generateRandomColors = () => {
  const colors = document.getElementById('color-palette').childNodes;
  const size = colors.length;
  const btnRandom = document.getElementById('button-random-color');
  let allColors = '';
  btnRandom.addEventListener('click', () => {
    const colorArray = [];
    for (let index = 1; index < size; index += 1) {
      const randomColor1 = (Math.floor(Math.random() * 255));
      const randomColor2 = (Math.floor(Math.random() * 255));
      const randomColor3 = (Math.floor(Math.random() * 255));
      allColors = `rgb(${randomColor1}, ${randomColor2}, ${randomColor3})`;
      colors[index].style.backgroundColor = allColors;
      colorArray.push(allColors);
      localStorage.setItem('colorPalette', JSON.stringify(colorArray));
    }
  });
};

const clearBoard = () => {
  const btnReset = document.getElementById('clear-board');
  btnReset.addEventListener('click', () => {
    const pixel = document.getElementsByClassName('pixel');
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = 'white';
    }
    localStorage.removeItem('colorPalette');
    localStorage.removeItem('pixelBoard');
    localStorage.removeItem('boardSize');
    document.location.reload();
  });
};

const createPixelBoard = (numberOfPixels) => {
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.style.width = `${numberOfPixels * 42}px`;
  pixelBoard.style.height = `${numberOfPixels * 42}px`;
  for (let outerIndex = 0; outerIndex < numberOfPixels; outerIndex += 1) {
    for (let index = 0; index < numberOfPixels; index += 1) {
      createDiv('pixel', pixelBoard, 'pixel');
    }
  }
};

const removePixelBoard = () => {
  const pixelBoard = document.getElementById('pixel-board');
  const pixel = document.getElementsByClassName('pixel');
  while (pixelBoard.children.length > 0) {
    for (let index = 0; index < pixelBoard.children.length; index += 1) {
      pixelBoard.removeChild(pixel[index]);
    }
  }
};

const pixelBoardLimiter = () => {
  const pixelBoard = document.getElementById('pixel-board');
  const input = document.getElementById('board-size');
  if (input.value < 5) {
    input.value = 5;
  }
  if (input.value > 50) {
    input.value = 50;
  }
  if (pixelBoard.style.width > parseInt(('50px'), 10)) {
    pixelBoard.style.width = '50px';
  }
  if (pixelBoard.style.height > parseInt(('50px'), 10)) {
    pixelBoard.style.height = '50px';
  }
};

const vqvEventBtn = () => {
  const input = document.getElementById('board-size');
  for (let index = 0; index < document.body.children.length; index += 1) {
    if (document.body.children[index].classList.contains('pixel-board-class')) {
      localStorage.removeItem('pixelBoard');
      removePixelBoard();
      pixelBoardLimiter();
      createPixelBoard(input.value);
      localStorage.setItem('boardSize', JSON.stringify((input.value)));
    }
  }
};

const verifyInput = () => {
  const buttonVQV = document.getElementById('generate-board');
  const input = document.getElementById('board-size');
  buttonVQV.addEventListener('click', () => {
    if (input.value.length <= 0) {
      alert('Board inválido!');
    } else {
      vqvEventBtn();
    }
  });
};

const getSelectedColor = () => {
  const colors = document.getElementsByClassName('color');
  let selected;
  for (let index = 0; index < colors.length; index += 1) {
    if (colors[index].classList.contains('selected')) {
      selected = colors[index].style.backgroundColor;
    }
  }
  return selected;
};

const pixelPaint = () => {
  const pixelBoard2 = document.getElementById('pixel-board');
  pixelBoard2.addEventListener('click', (e) => {
    if (e.target.classList.contains('pixel')) {
      e.target.style.backgroundColor = getSelectedColor();
    }
  });
};

const recoveryPalette = () => {
  const colorArray = JSON.parse(localStorage.getItem('colorPalette'));
  const square = document.getElementById('color-palette').childNodes;
  if (colorArray !== null && localStorage.key('colorPalette')) {
    for (let index = 0; index < colorArray.length; index += 1) {
      square[index + 1].style.backgroundColor = colorArray[index];
    }
  }
};

const recoveryPixelBoard = () => {
  for (let index = 0; index < localStorage.length; index += 1) {
    if (localStorage.length > 0 && localStorage.key(index) === 'boardSize') {
      const boardSize = JSON.parse(localStorage.getItem('boardSize'));
      removePixelBoard();
      createPixelBoard(boardSize);
    }
  }
};

const saveDraw = () => {
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.addEventListener('click', () => {
    const pixelsBackgroundArray = [];
    for (let index = 0; index < pixelBoard.children.length; index += 1) {
      pixelsBackgroundArray.push(pixelBoard.children[index].style.backgroundColor);
      localStorage.setItem('pixelBoard', JSON.stringify(pixelsBackgroundArray));
    }
  });
};

const recoveryDraw = () => {
  const pixelBoard = document.getElementById('pixel-board');
  const pixelColorBg = JSON.parse(localStorage.getItem('pixelBoard'));
  const storagePixel = pixelBoard.getElementsByClassName('pixel');
  if (pixelColorBg !== null && localStorage.key('pixelBoard')) {
    for (let index = 0; index < pixelBoard.children.length; index += 1) {
      storagePixel[index].style.backgroundColor = pixelColorBg[index];
    }
  }
};

const selectOneColor = () => {
  const colorPalette = document.getElementById('color-palette');
  const colors = document.getElementsByClassName('color');
  colorPalette.addEventListener('click', (e) => {
    for (let index = 0; index < colors.length; index += 1) {
      if (e.target.classList.contains('color-palette')) {
        return;
      }
      if (colors[index].classList.contains('selected')) {
        colors[index].classList.remove('selected');
        e.target.classList.add('selected');
      }
      e.target.classList.add('selected');
    }
  });
};

window.onload = () => {
  createDiv('config-container', document.body);
  const div = document.getElementById('config-container');
  createDiv('color-palette', div);
  createDiv('buttons-div', div);
  const btnDiv = document.getElementById('buttons-div');
  createBtn('button-random-color', btnDiv, 'Cores aleatórias');
  createBtn('clear-board', btnDiv, 'Limpar');
  createInput('board-size', btnDiv);
  createBtn('generate-board', btnDiv, 'VQV');
  createColorPalette();
  createDiv('pixel-board', document.body, 'pixel-board-class');
  createPixelBoard(5);
  generateRandomColors();
  recoveryPalette();
  recoveryPixelBoard();
  clearBoard();
  verifyInput();
  getSelectedColor();
  pixelPaint();
  selectOneColor();
  saveDraw();
  recoveryDraw();
};

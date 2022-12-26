const headerDiv = document.createElement('header');
document.body.appendChild(headerDiv);
const header = document.getElementsByTagName('header');
const h1 = document.createElement('h1');
const section = document.createElement('section');
let draw = false;

// ---- TITULO -------
h1.id = 'title';
h1.innerHTML = 'Paleta de Cores';
header[0].appendChild(h1);

// -------- CONTAINER DO MENU DE CONFIGURAÇÕES ----------
section.id = 'configContainer';
document.body.appendChild(section);

// -------- CONTAINER DA PALETA DE CORES
const palette = document.createElement('div');
palette.id = 'color-palette';
section.appendChild(palette);

// ------ PALETA DE CORES -----------
const createColorPalette = () => {
  const colorsPaletteArray = ['black', 'red', 'blue', 'yellow'];
  for (let index = 0; index < colorsPaletteArray.length; index += 1) {
    const paletteColorsSquare = document.createElement('div');
    if (index === 0) {
      paletteColorsSquare.className = 'selected ';
    }
    paletteColorsSquare.className += 'color';
    paletteColorsSquare.style.width = '80px';
    paletteColorsSquare.style.height = '40px';
    paletteColorsSquare.style.border = 'solid 1px black';
    paletteColorsSquare.style.backgroundColor = colorsPaletteArray[index];
    palette.appendChild(paletteColorsSquare);
  }
};
createColorPalette();

// ------- DIV DOS BOTÕES --------
const buttonsDiv = document.createElement('div');
buttonsDiv.id = 'buttons-div';
section.appendChild(buttonsDiv);

// ------- CRIA BOTÃO RANDOMCOLORS ----------
const btnRandom = document.createElement('button');
btnRandom.id = 'button-random-color';
btnRandom.innerHTML = 'Cores aleatórias';
buttonsDiv.appendChild(btnRandom);

// -------- GERA CORES ALEATÓRIAMENTE -----------
const square = palette.childNodes;
const size = palette.childNodes.length;
let allColors = '';
btnRandom.addEventListener('click', () => {
  const colorArray = [];
  for (let index = 0; index < size; index += 1) {
    if (index === 0) {
      square[index].style.backgroundColor = 'black';
    } else {
      const randomColor1 = (Math.floor(Math.random() * 255));
      const randomColor2 = (Math.floor(Math.random() * 255));
      const randomColor3 = (Math.floor(Math.random() * 255));
      allColors = `rgb(${randomColor1}, ${randomColor2}, ${randomColor3})`;
      square[index].style.backgroundColor = allColors;
      colorArray.push(allColors);
      localStorage.setItem('colorPalette', JSON.stringify(colorArray));
    }
  }
});

// --------- CRIA BOTÃO RESET ------------

const btnReset = document.createElement('button');
btnReset.id = 'clear-board';
btnReset.innerHTML = 'Limpar';
buttonsDiv.appendChild(btnReset);
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

// -------- CRIA INPUT ---------------
const input = document.createElement('input');
input.id = 'board-size';
input.type = 'number';
input.setAttribute('min', '1');
buttonsDiv.appendChild(input);

// -------- CRIA O PIXEL BOARD -----------
const mainSquare = document.createElement('div');
mainSquare.id = 'pixel-board';
mainSquare.className = 'pixel-board-class';
const createPixel = (numberOfPixels) => {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixel.style.width = '40px';
  pixel.style.height = '40px';
  mainSquare.appendChild(pixel);
  mainSquare.style.width = `${numberOfPixels * 42}px`;
  mainSquare.style.height = `${numberOfPixels * 42}px`;
  return document.body.appendChild(mainSquare);
};
const createPixelBoard = (numberOfPixels) => {
  for (let outerIndex = 0; outerIndex < numberOfPixels; outerIndex += 1) {
    for (let index = 0; index < numberOfPixels; index += 1) {
      createPixel(numberOfPixels);
    }
  }
};
createPixelBoard(5);

// -------- FUNÇÃO PARA REMOVER PIXELBOARD ----------
const removePixelBoard = () => {
  const pixel = document.getElementsByClassName('pixel');
  while (mainSquare.children.length > 0) {
    for (let index = 0; index < mainSquare.children.length; index += 1) {
      mainSquare.removeChild(pixel[index]);
    }
  }
};

// --------- DELIMITAR TAMANHO DO PIXELBOARD ----------
const pixelBoardLimiter = () => {
  if (input.value < 5) {
    input.value = 5;
  }
  if (input.value > 50) {
    input.value = 50;
  }
  if (mainSquare.style.width > parseInt(('50px'), 10)) {
    mainSquare.style.width = '50px';
  }
  if (mainSquare.style.height > parseInt(('50px'), 10)) {
    mainSquare.style.height = '50px';
  }
};
// ----------- BOTÃO VQV --------------------
const buttonVQV = document.createElement('button');
buttonVQV.id = 'generate-board';
buttonVQV.innerText = 'VQV';
buttonsDiv.appendChild(buttonVQV);

// -------- BOTÃO VQV REDIMENSIONA O PIXELBOARD ------------
buttonVQV.addEventListener('click', () => {
  if (input.value.length <= 0) {
    alert('Board inválido!');
  } else {
    for (let index = 0; index < document.body.children.length; index += 1) {
      if (document.body.children[index].classList.contains('pixel-board-class')) {
        localStorage.removeItem('pixelBoard');
        removePixelBoard();
        pixelBoardLimiter();
        createPixelBoard(input.value);
        localStorage.setItem('boardSize', JSON.stringify((input.value)));
      }
    }
  }
});

// Lógica para salvar a cor no clique
const color = palette.getElementsByClassName('color');
let colorSave = color[0].style.backgroundColor;
palette.addEventListener('click', (event) => {
  if (event.target.className.includes('color')) {
    colorSave = event.target.style.backgroundColor;
  }
});

// --------- LÓGICA PARA PINTAR COM MOUSEDOWN -----------
mainSquare.addEventListener('mouseover', (event) => {
  if (!draw) {
    return;
  }
  const element = event.target;
  if (element.className.includes('pixel')) {
    element.style.backgroundColor = colorSave;
  }
});
mainSquare.addEventListener('mousedown', (event) => {
  const element = event.target;
  if (element.className.includes('pixel')) {
    element.style.backgroundColor = colorSave;
  }
});
window.addEventListener('mousedown', () => {
  draw = true;
});
window.addEventListener('mouseup', () => {
  draw = false;
});

// ------------ RESGATAR PALETTE COLORS DO LOCALSTORAGE -------------
const colorArray = JSON.parse(localStorage.getItem('colorPalette'));
if (colorArray !== null && localStorage.key('colorPalette')) {
  for (let index = 0; index < colorArray.length; index += 1) {
    square[index + 1].style.backgroundColor = colorArray[index];
  }
}

// ------ RECUPERAR O PIXELBOARD NO LOCALSTORAGE -------
const pixelBoardGetStorage = () => {
  for (let index = 0; index < localStorage.length; index += 1) {
    if (localStorage.length > 0 && localStorage.key(index) === 'boardSize') {
      const boardSize = JSON.parse(localStorage.getItem('boardSize'));
      removePixelBoard();
      createPixelBoard(boardSize);
    }
  }
};
pixelBoardGetStorage();

// ---------- SALVAR E RESTAURAR PINTURA DO LOCALSTORAGE ----------------
mainSquare.addEventListener('click', () => {
  const pixelsBackgroundArray = [];
  for (let index = 0; index < mainSquare.children.length; index += 1) {
    pixelsBackgroundArray.push(mainSquare.children[index].style.backgroundColor);
    localStorage.setItem('pixelBoard', JSON.stringify(pixelsBackgroundArray));
  }
});

const pixelColorBg = JSON.parse(localStorage.getItem('pixelBoard'));
const storagePixel = mainSquare.getElementsByClassName('pixel');
for (let index2 = 0; index2 < localStorage.length; index2 += 1) {
  if (pixelColorBg !== null && localStorage.key(index2) === 'pixelBoard') {
    for (let index = 0; index < mainSquare.children.length; index += 1) {
      storagePixel[index].style.backgroundColor = pixelColorBg[index];
    }
  }
}


const selectOneColor = () => {
  // const colorPalette = document.getElementById('color-palette');
  const colors = document.getElementsByClassName('color');
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].addEventListener('click', (e) => {
      for (let index2 = 0; index2 < colors.length; index2 += 1) {
        if (colors[index2].classList.contains('selected')) {
          colors[index2].classList.remove('selected');
          e.target.classList.add('selected');
        }
        e.target.classList.add('selected');
      }
    });
  }
};

window.onload = () => {
  selectOneColor();
};

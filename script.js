const headerDiv = document.createElement('header');
document.body.appendChild(headerDiv);
const header = document.getElementsByTagName('header');
const h1 = document.createElement('h1');
let draw = false;

// cria o titulo
h1.id = 'title';
h1.innerHTML = 'Paleta de Cores';
header[0].appendChild(h1);

// cria a section que segura o menu de configuração
const section = document.createElement('section');
section.id = 'configContainer';
document.body.appendChild(section);
// cria a div container para a paleta de cores
const palette = document.createElement('div');
palette.id = 'color-palette';
section.appendChild(palette);

// cria a paleta de cores
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

// cria div para botões
const buttonsDiv = document.createElement('div');
buttonsDiv.id = 'buttons-div';
section.appendChild(buttonsDiv);

// cria botão de cores aleatórias
const btnRandom = document.createElement('button');
btnRandom.id = 'button-random-color';
btnRandom.innerHTML = 'Cores aleatórias';
buttonsDiv.appendChild(btnRandom);

// evento para gerar cores automaticamente ao clicar no botão aleatório
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

// resgata as cores do localStorage
const colorArray = JSON.parse(localStorage.getItem('colorPalette'));
if (colorArray !== null && localStorage.key('colorPalette')) {
  for (let index = 0; index < colorArray.length; index += 1) {
    square[index + 1].style.backgroundColor = colorArray[index];
  }
}
// cria botão reset

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
  document.location.reload();
});

// cria input para tamanho do pixelboard
const input = document.createElement('input');
input.id = 'board-size';
input.type = 'number';
input.setAttribute('min', '1');
buttonsDiv.appendChild(input);

// cria o pixelboard
const mainSquare = document.createElement('div');
mainSquare.id = 'pixel-board';
mainSquare.className = 'pixel-board-class';
document.body.appendChild(mainSquare);

const createPixel = (numberOfPixels) => {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixel.style.width = '40px';
  pixel.style.height = '40px';
  mainSquare.appendChild(pixel);
  mainSquare.style.width = `${numberOfPixels * 42}px`;
  mainSquare.style.height = `${numberOfPixels * 42}px`;
};

const createPixelBoard = (numberOfPixels) => {
  for (let outerIndex = 0; outerIndex < numberOfPixels; outerIndex += 1) {
    for (let index = 0; index < numberOfPixels; index += 1) {
      createPixel(numberOfPixels);
    }
  }
};
createPixelBoard(5);
console.log(mainSquare.children.length);
// função para remover pixelBoard
const removePixelBoard = () => {
  const pixel = document.getElementsByClassName('pixel');
  while (mainSquare.children.length > 0) {
    for (let index = 0; index < mainSquare.children.length; index += 1) {
      mainSquare.removeChild(pixel[index]);
    }
  }
};

// função para limitar o pixel board
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
// cria um botão VQV que recria o pixelboard
const buttonVQV = document.createElement('button');
buttonVQV.id = 'generate-board';
buttonVQV.innerText = 'VQV';
buttonsDiv.appendChild(buttonVQV);

buttonVQV.addEventListener('click', () => {
  if (input.value.length <= 0) {
    alert('Board inválido!');
  } else {
    for (let index = 0; index < document.body.children.length; index += 1) {
      if (document.body.children[index].classList.contains('pixel-board-class')) {
        removePixelBoard();
        pixelBoardLimiter();
        createPixelBoard(input.value);
        console.log(createPixelBoard);
      // ====> localStorage.setItem('pixelBoard', JSON.stringify((a)));
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

// lógica para desenhar enquanto estiver com o mousedown
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

// cria a função para salvar e recuperar o deseneho atual no LocalStorage
mainSquare.addEventListener('click', () => {
  const pixelsBackgroundArray = [];
  for (let index = 0; index < mainSquare.children.length; index += 1) {
    pixelsBackgroundArray.push(mainSquare.children[index].style.backgroundColor);
    localStorage.setItem('pixelBoard', JSON.stringify(pixelsBackgroundArray));
  }
});

const pixelColorBg = JSON.parse(localStorage.getItem('pixelBoard'));
const storagePixel = mainSquare.getElementsByClassName('pixel');
if (pixelColorBg !== null && localStorage.key('pixelBoard')) {
  for (let index = 0; index < mainSquare.children.length; index += 1) {
    storagePixel[index].style.backgroundColor = pixelColorBg[index];
  }
}

// ------ RECUPERAR O PIXELBOARD NO LOCALSTORAGE -------

// const pixelBoardStoraged = JSON.parse(localStorage.getItem('pixelBoard'));
// const storagePixel = mainSquare.getElementsByClassName('pixel');
// if (pixelColorBg !== null && localStorage.key('pixelBoard')) {
//   for (let index = 0; index < mainSquare.children.length; index += 1) {
//     storagePixel[index].style.backgroundColor = pixelColorBg[index];
//   }
// }

// definir classe Selected apenas para a cor clicada (essa feature é desnecessária pois resolvi o código sem precisar fiz apenas por ser um item obrigatório)
color[0].addEventListener('click', () => {
  if (!color[0].className.includes('selected')) {
    color[0].className += ' selected';
    color[1].classList.remove('selected');
    color[2].classList.remove('selected');
    color[3].classList.remove('selected');
  }
});

color[1].addEventListener('click', () => {
  if (!color[1].className.includes('selected')) {
    color[1].className += ' selected';
    color[0].classList.remove('selected');
    color[2].classList.remove('selected');
    color[3].classList.remove('selected');
  }
});

color[2].addEventListener('click', () => {
  if (!color[2].className.includes('selected')) {
    color[2].className += ' selected';
    color[0].classList.remove('selected');
    color[1].classList.remove('selected');
    color[3].classList.remove('selected');
  }
});

color[3].addEventListener('click', () => {
  if (!color[3].className.includes('selected')) {
    color[3].className += ' selected';
    color[0].classList.remove('selected');
    color[1].classList.remove('selected');
    color[2].classList.remove('selected');
  }
});

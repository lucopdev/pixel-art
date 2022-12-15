const header = document.getElementsByTagName('header');
const h1 = document.createElement('h1');
h1.id = 'title';
h1.style.fontSize = '50px';
h1.style.color = '#dddddd';
h1.innerHTML = 'Paleta de Cores';
header[0].appendChild(h1);

const palette = document.createElement('div');
palette.id = 'color-palette';
document.body.appendChild(palette);

const colors = ['black', 'red', 'blue', 'yellow'];
for (let index = 0; index < colors.length; index += 1) {
  const square = document.createElement('div');
  if (colors[index] === 'black') {
    square.className = 'selected ';
  }
  square.className += 'color';
  square.style.width = '70px';
  square.style.height = '70px';
  square.style.border = 'solid 1px black';
  square.style.backgroundColor = colors[index];
  palette.appendChild(square);
}

// cria div para botões
const buttonsDiv = document.createElement('div');
buttonsDiv.id = 'buttons-div';
buttonsDiv.style.width = '200px';
buttonsDiv.style.margin = 'auto';
document.body.appendChild(buttonsDiv);

// cria botão de cores aleatórias
const btnRandom = document.createElement('button');
btnRandom.id = 'button-random-color';
btnRandom.style.width = '90px';
btnRandom.style.height = '40px';
btnRandom.style.fontSize = '12px';
btnRandom.style.backgroundColor = '#62f58e';
btnRandom.innerHTML = 'Cores aleatórias';
buttonsDiv.appendChild(btnRandom);

// evento para receber clique no botão aleatório
btnRandom.addEventListener('click', () => {
  const square = palette.childNodes;
  const size = palette.childNodes.length;
  for (let index = 1; index < size; index += 1) {
    const randomColor1 = (Math.floor(Math.random() * 255));
    const randomColor2 = (Math.floor(Math.random() * 255));
    const randomColor3 = (Math.floor(Math.random() * 255));
    square[index].style.backgroundColor = `rgb(${randomColor1}, ${randomColor2}, ${randomColor3})`;
  }
});

// cria botão reset
const btnReset = document.createElement('button');
btnReset.id = 'clear-board';
btnReset.innerHTML = 'Limpar';
btnReset.style.width = '90px';
btnReset.style.height = '40px';
btnReset.style.fontSize = '12px';
btnReset.style.backgroundColor = '#62f58e';
buttonsDiv.appendChild(btnReset);

btnReset.addEventListener('click', () => {
  const pixel = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = 'white';
    console.log(pixel[index].style.backgroundColor);
  }
});

// cria input para tamanho do pixelboard
const input = document.createElement('input');
input.id = 'board-size';
buttonsDiv.appendChild(input);

// fazer o item 5

// cria o pixelboard
const mainSquare = document.createElement('div');
mainSquare.id = 'pixel-board';

const createPixelBoard = (numberOfPixels) => {
  for (let index = 0; index < numberOfPixels; index += 1) {
    for (let index2 = 0; index2 < numberOfPixels; index2 += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      mainSquare.appendChild(pixel);
      mainSquare.style.width = `${numberOfPixels * 42}px`;
      mainSquare.style.height = `${numberOfPixels * 42}px`;
      document.body.appendChild(mainSquare);
    }
  }
};
createPixelBoard(5);

// cria função para remover pixelboard
// const removePixelsColumn = () => {
//   document.body.removeChild(mainSquare);
// };

// cria um botão VQV que recria o pixelboard
const buttonVQV = document.createElement('button');
buttonVQV.id = 'generate-board';
buttonVQV.innerText = 'VQV';
buttonsDiv.appendChild(buttonVQV);

// buttonVQV.addEventListener('click', () => {
//   for (let index = 0; index < document.body.childNodes.length; index += 1) {
//     if (document.body.childNodes[index].id === 'pixel-board') {
//       removePixelsColumn();
//       console.log('tem');
//     } else {
//       createPixelsColumn(input.value);
//       input.value = '';
//     }
//   }
//   console.log(document.body.children);
// });

// Lógica para salvar a cor e pintar o pixel
const color = palette.getElementsByClassName('color');
let colorSave = color[0].style.backgroundColor;

palette.addEventListener('click', (event) => {
  if (event.target.className.includes('color')) {
    colorSave = event.target.style.backgroundColor;
    console.log(colorSave);
  }
});

document.addEventListener('click', (event) => {
  const element = event.target;
  if (element.className.includes('pixel')) {
    element.style.backgroundColor = colorSave;
  }
});

// Selected apenas para a cor clicada
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

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
  square.className = 'color';
  square.style.width = '70px';
  square.style.height = '70px';
  square.style.border = 'solid 1px black';
  square.style.backgroundColor = colors[index];
  palette.appendChild(square);
}

const btnRandom = document.createElement('button');
btnRandom.id = 'button-random-color';
btnRandom.style.width = '120px';
btnRandom.style.height = '30px';
btnRandom.style.backgroundColor = '#62f58e';
btnRandom.innerHTML = 'Cores aleatórias';
document.body.appendChild(btnRandom);

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

// fazer o item 5
const mainSquare = document.createElement('div');
const createPixelsLine = (numberOfPixels) => {
  for (let index = 0; index < numberOfPixels; index += 1) {
    const pixels = document.createElement('div');
    pixels.className = 'pixel';
    pixels.style.width = '40px';
    pixels.style.height = '40px';
    pixels.style.backgroundColor = 'white';
    pixels.style.border = 'solid 1px black';
    pixels.style.display = 'inline-block';
    mainSquare.appendChild(pixels);
  }
};

const createPixelsColumn = (numberOfPixels) => {
  mainSquare.id = 'pixel-board';
  mainSquare.style.width = `${numberOfPixels * 42}px`;
  mainSquare.style.height = `${numberOfPixels * 42}px`;
  document.body.appendChild(mainSquare);
  for (let line = 0; line < numberOfPixels; line += 1) {
    createPixelsLine(numberOfPixels);
  }
};
createPixelsColumn(5);

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
  square.style.width = '50px';
  square.style.height = '50px';
  square.style.border = 'solid 1px black';
  square.style.backgroundColor = colors[index];
  palette.appendChild(square);
}

const btnRandom = document.createElement('button');
btnRandom.id = 'button-random-color';
btnRandom.innerHTML = 'Cores aleatórias';
palette.appendChild(btnRandom);


window.onload = () => {
  const header = document.getElementsByTagName('header');
  const h1 = document.createElement('h1');
  h1.id = 'title';
  h1.style.fontSize = '50px';
  h1.style.color = 'black';
  h1.innerHTML = 'Paleta de Cores';
  header[0].appendChild(h1);

  const colors = ['black', 'red', 'blue', 'yellow'];
  for (let index = 0; index < colors.length; index += 1) {
    const square = document.createElement('div');
    square.className = 'colorPallet';
    square.style.width = '50px';
    square.style.height = '50px';
    square.style.backgroundColor = colors[index];
    document.body.appendChild(square);
  }
};

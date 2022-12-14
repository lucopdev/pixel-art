window.onload = () => {
  const header = document.getElementsByTagName('header');
  const h1 = document.createElement('h1');
  h1.id = 'title';
  h1.style.fontSize = '50px';
  h1.style.color = 'black';
  h1.innerHTML = 'Paleta de Cores';
  header[0].appendChild(h1);
};

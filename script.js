function renderStucturalElements() {
  const body = document.querySelector('body');
  const containerContent = document.createElement('div');
  containerContent.classList = 'container-content';
  const main = document.createElement('main');
  const topSection = document.createElement('section');
  topSection.classList = 'top-section';
  const bottomSection = document.createElement('section');
  bottomSection.classList = 'bottom-section';
  topSection.insertAdjacentHTML('beforeend',
    '<button id="button-random-color">Cores aleatórias</button>');
  body.appendChild(containerContent);
  containerContent.appendChild(main);
  main.append(topSection, bottomSection);
}
renderStucturalElements();

function renderElements() {
  const topSection = document.querySelector('.top-section');
  const bottomSection = document.querySelector('.bottom-section');
  const h1 = document.createElement('h1');
  h1.innerText = 'Paleta de Cores';
  h1.id = 'title';
  const ulPalette = document.createElement('ul');
  ulPalette.id = 'color-palette';
  const inputZone = document.createElement('div');
  inputZone.classList = 'input-zone';
  const pixelContainer = document.createElement('div');
  pixelContainer.classList = 'pixel-container';
  topSection.append(h1, ulPalette, inputZone);
  bottomSection.appendChild(pixelContainer);
}
renderElements();

function renderColorsPalette() {
  const ulPalette = document.querySelector('#color-palette');
  const color1 = document.createElement('li');
  color1.classList = 'color';
  const color2 = document.createElement('li');
  color2.classList = 'color';
  const color3 = document.createElement('li');
  color3.classList = 'color';
  const color4 = document.createElement('li');
  color4.classList = 'color';

  ulPalette.append(color1, color2, color3, color4);
}
renderColorsPalette();

function renderInput() {
  const inputZone = document.querySelector('.input-zone');
  const form = document.createElement('form');
  form.name = 'number';
  const input = document.createElement('input');
  input.type = 'number';
  input.max = '50';
  input.min = '1';
  input.name = 'number';
  input.id = 'board-size';
  input.value = '';
  const submit = document.createElement('button');
  submit.id = 'generate-board';
  submit.name = 'number';
  submit.type = 'submit';
  submit.innerText = 'VQV';
  inputZone.appendChild(form);
  form.append(input, submit);
}
renderInput();

function assignColor() {
  const colors = document.querySelectorAll('.color');
  colors[0].style = 'background-color: rgb(0, 0, 0)';
  const colorList = ['rgb(0, 0, 0)'];
  for (let i = 1; i < colors.length; i += 1) {
    const randomColor = `rgb(
      ${(Math.floor(Math.random() * 256))}, 
      ${(Math.floor(Math.random() * 256))}, 
      ${(Math.floor(Math.random() * 256))}
      ) `;
    colors[i].style = `background-color: ${randomColor}`;
    colorList.push(randomColor);
    const colorsKey = JSON.stringify(colorList);
    localStorage.setItem('colorPalette', colorsKey);
  }
}

function assignColorSaved() {
  const colors = document.querySelectorAll('.color');
  const colorKey = localStorage.getItem('colorPalette');
  const storageColors = JSON.parse(colorKey);
  if (colorKey) {
    for (let i = 0; i < colors.length; i += 1) {
      colors[i].style = `background-color: ${storageColors[i]}`;
    }
  }
  if (!colorKey) {
    return assignColor();
  }
}
assignColorSaved();

function resetColors() {
  const resetButton = document.querySelector('#button-random-color');
  resetButton.addEventListener('click', () => {
    localStorage.removeItem('colorPalette');
    assignColor();
  });
}
resetColors();

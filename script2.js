const clearBoardId = 'clear-board';
const pixelBoardId = 'pixel-board';

function createClearButton() {
  document.querySelector('.pixel-container').insertAdjacentHTML('afterbegin',
    `<button id=${clearBoardId} > Limpar </button>`);
}
createClearButton();

function saveDraw() {
  const pixels = document.querySelectorAll('.pixel');
  const listConfig = [];
  for (let i = 0; i < pixels.length; i += 1) {
    const config = Object();
    config.id = i;
    config.color = pixels[i].style.backgroundColor;
    listConfig.push(config);
  }
  const value = JSON.stringify(listConfig);
  localStorage.setItem('pixelBoard', value);
}

function recoveryDraw() {
  const pixelConfigs = localStorage.getItem('pixelBoard');
  if (pixelConfigs) {
    const pixels = document.querySelectorAll('.pixel');
    const colors = JSON.parse(pixelConfigs);
    for (let i = 0; i < colors.length; i += 1) {
      pixels[i].style.backgroundColor = colors[i].color;
    }
  }
}

function paintPixel() {
  const colorSelected = document.querySelector('.selected');
  const currentColor = colorSelected.style.backgroundColor;
  const pixel = document.querySelectorAll('.pixel');
  pixel.forEach((element) => element.addEventListener('click', (e) => {
    e.target.style = `background-color: 
  ${currentColor}`;
    saveDraw();
  }));
}

function selectedColor() {
  const colors = document.querySelectorAll('.color');
  colors[0].classList.add('selected');
  paintPixel();

  colors.forEach((element) => {
    element.addEventListener('click', (e) => {
      document.querySelectorAll('.color').forEach((color) => color.classList.remove('selected'));
      e.target.classList.add('selected');
      paintPixel();
    });
  });
}
selectedColor();

function renderPixelBoard(size) {
  const pixelContainer = document.querySelector('.pixel-container');
  const pixelBoard = document.createElement('div');
  pixelBoard.id = pixelBoardId;
  for (let i = 0; i < size; i += 1) {
    pixelBoard.insertAdjacentHTML('beforeend', `<ul id= "${i}"></ul>`);
  }
  pixelContainer.appendChild(pixelBoard);
  const collunsBoard = document.querySelectorAll('#pixel-board > ul');
  for (let i = 0; i < collunsBoard.length; i += 1) {
    for (let j = 0; j < size; j += 1) {
      collunsBoard[i].insertAdjacentHTML('beforeend',
        '<li class= "pixel"></li>');
    }
  }
}

function recoverOrRenderPixelBoard() {
  const pixelBoardSize = localStorage.getItem('boardSize');
  const pixelBoardColor = localStorage.getItem('pixelBoard');
  if (pixelBoardSize && pixelBoardColor) {
    renderPixelBoard(pixelBoardSize);
    return recoveryDraw();
  }
  if (pixelBoardSize) {
    return renderPixelBoard(pixelBoardSize);
  }
  if (!pixelBoardSize) {
    return renderPixelBoard(5);
  }
}
recoverOrRenderPixelBoard();

function clearPixelboard() {
  const pixels = document.querySelectorAll('.pixel');
  document.querySelector(`#${clearBoardId}`).addEventListener('click', () => {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = '';
    }
    localStorage.removeItem('pixelBoard');
  });
}
clearPixelboard();

const pixelShortInterval = () => {
  const value = 5;
  const pixelBoard = document.querySelector(`#${pixelBoardId}`);
  pixelBoard.remove();
  localStorage.removeItem('boardSize');
  localStorage.setItem('boardSize', value);
  localStorage.removeItem('pixelBoard');
  renderPixelBoard(value);
  clearPixelboard();
  return alert('tamanho redimensionado para 5px');
};

const pixelLongInterval = () => {
  const value = 50;
  const pixelBoard = document.querySelector(`#${pixelBoardId}`);
  pixelBoard.remove();
  localStorage.removeItem('boardSize');
  localStorage.setItem('boardSize', value);
  localStorage.removeItem('pixelBoard');
  renderPixelBoard(value);
  clearPixelboard();
  return alert('tamanho redimensionado para 50px');
};

function handleNumberOfPixels(value) {
  if (value <= 0) {
    return alert('Board inválido!');
  }
  if (value > 0 && value < 5) {
    return pixelShortInterval();
  }
  if (value > 50) {
    return pixelLongInterval();
  }
  const pixelBoard = document.querySelector(`#${pixelBoardId}`);
  pixelBoard.remove();
  renderPixelBoard(value);
  localStorage.removeItem('boardSize');
  localStorage.setItem('boardSize', value);
  localStorage.removeItem('pixelBoard');
  clearPixelboard();
}

function NumberOfPixels() {
  document.querySelector('#generate-board').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('boardSize');
    const valueInput = document.querySelector('#board-size');
    const { value } = valueInput;
    handleNumberOfPixels(value);
    clearPixelboard();
  });
}
NumberOfPixels();
paintPixel();
recoveryDraw();

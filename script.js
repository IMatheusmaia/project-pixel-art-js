let boardListConfig= [];

function renderElements(){
    const body= document.querySelector('body');
    const containerContent= document.createElement('div');
        containerContent.classList= 'container-content'

    const main= document.createElement('main');
    const topSection= document.createElement('section');
        topSection.classList='top-section';
    const bottomSection= document.createElement('section');
    const h1= document.createElement('h1');
        h1.innerText= 'Paleta de Cores'
        h1.id= 'title';

    const ulPalette= document.createElement('ul');
        ulPalette.id='color-palette';
        
        topSection.insertAdjacentHTML('beforeend', '<button id="button-random-color">Cores aleatórias</button>')

    const inputZone= document.createElement('div');
            inputZone.classList='input-zone';

    const pixelContainer= document.createElement('div');
            pixelContainer.classList= 'pixel-container'


        body.appendChild(containerContent);
        containerContent.appendChild(main);
        main.append(topSection, bottomSection);
        topSection.append(h1, ulPalette, inputZone);
        bottomSection.appendChild(pixelContainer);
        
}
renderElements()

function renderColorsPalette(){
    const ulPalette= document.querySelector('#color-palette');
    const color1= document.createElement('li');
        color1.classList= 'color';
    const color2= document.createElement('li');
        color2.classList= 'color';
    const color3= document.createElement('li');
        color3.classList= 'color';
    const color4= document.createElement('li');
        color4.classList= 'color';
    const color5= document.createElement('li');
        color5.classList= 'color';
    const color6= document.createElement('li');
        color6.classList= 'color';

        ulPalette.append(color1, color2, color3, color4, color5, color6);

}
renderColorsPalette();

function renderInput(){
    const inputZone= document.querySelector('.input-zone');

    const form= document.createElement('form');
        form.name= 'number';

    const input= document.createElement('input');
        input.type= 'number';
        input.max= '10';
        input.min= '5'
        input.name= 'number';
        input.id= 'board-size';
        input.value= '5'

    const submit= document.createElement('button');
        submit.id= 'generate-board'
        submit.type= 'submit';
        submit.innerText='VQV';

        inputZone.appendChild(form);
        form.append(input, submit);
    
}
renderInput();

function assignColor(){
    const colors= document.querySelectorAll('.color');
        colors[0].style= 'background-color: #000000';
    let colorList= ['000000'];

    let colorKey= localStorage.getItem('colorPalette');
    let storageColors= JSON.parse(colorKey);

    if(colorKey){
        
        for(let i=1; i<colors.length; i++){
            colors[i].style= 'background-color:' + `#${storageColors[i]}`
        }
    
    }else{
        for(let i=1; i<colors.length; i++){
            // let randomColor= (Math.random() * 0xffffff << 0).toString(16).padStart(6, '0');
            let randomColor= 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

                colors[i].style= 'background-color:' + `${randomColor}`
            colorList.push(randomColor);
        }
       
       let colorsKey= JSON.stringify(colorList);
        localStorage.setItem('colorPalette', colorsKey);
    }
}
assignColor();

function resetColors(){
    const resetButton= document.querySelector('#button-random-color');

        resetButton.addEventListener('click', (e) =>{
            localStorage.removeItem('colorPalette');
            assignColor();
        })
}
resetColors();


function makeNumberOfPixels(){
    const vqvButton= document.querySelector('#generate-board');
    const inputNumber= document.querySelector('#board-size');
        renderPixelBoard(inputNumber.value);
    
    vqvButton.addEventListener('click', (e)=>{
        e.preventDefault();
        const valueInput= document.querySelector('#board-size');
    
        let value= valueInput.value;
        if(value < 0 || value > 10){
            alert('Board inválido!')
        }else{
        const pixelBoard= document.querySelector('#pixel-board');
        const clearBoard= document.querySelector('#clear-board');
            pixelBoard.remove();
            clearBoard.remove();

        renderPixelBoard(value);
        clearPixelboard();
        }
    })

}
makeNumberOfPixels()

function renderPixelBoard(size){
    const pixelContainer= document.querySelector('.pixel-container');

    const pixelBoard= document.createElement('div');
        pixelBoard.id='pixel-board';

    for(let i=0; i<size; i++){
        pixelBoard.insertAdjacentHTML('beforeend', `<ul id= "${i+1}"></ul>`);
    }

    pixelContainer.appendChild(pixelBoard);

    const collunsBoard= document.querySelectorAll('#pixel-board > ul');

    for(let i=0; i< collunsBoard.length; i++){
        for(let j=0; j< size; j++){
            collunsBoard[i].insertAdjacentHTML('beforeend', `<li class= "pixel"></li>`);
        }
    }

    
}

function selectedColor(){
    const colors= document.querySelectorAll('.color');
        colors[0].classList.add('selected');
        paintPixel();

    colors.forEach(element=>{
        element.addEventListener('click', (e)=>{
        const listColors= document.querySelectorAll('.color');
            listColors.forEach(color=>color.classList.remove('selected'));
            e.target.classList.add('selected');
            paintPixel();
        })
    })
}
selectedColor();


function paintPixel(){
    const colorSelected= document.querySelector('.selected');

    let currentColor= colorSelected.style.backgroundColor;

    
    let cont= 0
    const pixel= document.querySelectorAll('.pixel');
        pixel.forEach(element => { element.addEventListener('click', (e)=>{
            cont++
            
            e.target.style= 'background-color:' + `${currentColor}`;
            e.target.id= `${currentColor} (${cont})`

            const {id}= e.target;
            
            
        })
    
    })

}


function clearPixelboard(){
    const pixels= document.querySelectorAll('.pixel');

    const pixelContainer= document.querySelector('.pixel-container');
        pixelContainer.insertAdjacentHTML('afterbegin', '<button id= "clear-board">Limpar</button>');

    const clearBoard= document.querySelector('#clear-board');
    clearBoard.addEventListener('click', (e)=>{
        pixels.forEach(pixel=>{
            pixel.style.backgroundColor= ''
            pixel.id= ''
            boardListConfig= []
        })
    });

}
clearPixelboard();
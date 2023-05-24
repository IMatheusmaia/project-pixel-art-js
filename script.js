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
        
        topSection.insertAdjacentHTML('beforeend', '<button id="button-random-color">Resetar cores</button>')

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
        ulPalette.append(color1, color2, color3, color4, color5);

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
        input.id= 'input-number';

    const submit= document.createElement('button');
        submit.type= 'submit';
        submit.innerText='VQV';

        inputZone.appendChild(form);
        form.append(input, submit);
    
}
renderInput();

function assignColor(){
    const colors= document.querySelectorAll('.color');
        colors[0].style= 'background-color: black';
    let colorList= ['000000'];

    let colorKey= localStorage.getItem('colorPalette');
    let storageColors= JSON.parse(colorKey);

    if(colorKey){
        
        for(let i=1; i<colors.length; i++){
            colors[i].style= 'background-color:' + `#${storageColors[i]}`
        }
    
    }else{
        for(let i=1; i<colors.length; i++){
            let randomColor= (Math.random() * 0xfbfff0 << 0).toString(16).padStart(6, '0');
                colors[i].style= 'background-color:' + `#${randomColor}`
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
resetColors()

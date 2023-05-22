function renderElements(){
    const body= document.querySelector('body');
    const containerContent= document.createElement('div');
        containerContent.classList= 'container-content'

    const main= document.createElement('main');
    const topSection= document.createElement('section');
    const bottomSection= document.createElement('section');
    const h1= document.createElement('h1');
        h1.innerText= 'Paleta de Cores'
        h1.id= 'title';


        body.appendChild(containerContent);
        containerContent.appendChild(main);
        main.append(topSection, bottomSection);
        topSection.appendChild(h1)
        
}
renderElements()
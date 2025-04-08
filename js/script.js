import {lightMode,filters } from "./color.js";
const data = '../data.json';
const list = document.querySelector('.list');

/*FILTERS VARIABLES*/
const filterAll = document.getElementById('filter-all');
const filterActive = document.getElementById('filter-active');
const filterInactive = document.getElementById('filter-inactive');

/*ARRAYS*/
let extensionsArr = [];
let activeArr = [];
let inactiveArr = []

export let isAllSelected = true;
export let isActiveSelected = false;
export let isInactiveSelected = false;

export let number = 0;

const getData = ()=> {
    fetch(data)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            extensionsArr.push(element);
        })
        showExtensions();
    })
}


 const showExtensions = ()=> {
    list.innerHTML = '';
    
    if(isAllSelected){
        activeArr = [];
        inactiveArr = [];
        paintRed(0);
        extensionsArr.forEach(extension => {
            list.insertAdjacentHTML('beforeend',`
                <div class='extension'>
                    <div class='extension__top'>
                        <div class='extension__top__icon'>
                            <img src='${extension.logo}' />
                        </div>
                        <div class='extension__top__info'>
                            <h4>${extension.name}</h4>
                            <p class='description'>${extension.description}</p>
                        </div>
                    </div>
    
                    <div class='extension__bottom'>
                        <button class='remove'>Remove</button>
    
                        <div class='toggle-extension' style='${(extension.isActive) ? "background-color:var(--red700); justify-content:right" : null}'>
                            <div class='circle'></div>
                        </div>
                    </div>
                </div>
            `)
        })
    
        const removeButtons = document.querySelectorAll('.remove');
        const toggleButtons = document.querySelectorAll('.toggle-extension');
    
        removeButtons.forEach((btn,index) => {
            btn.addEventListener('click',(e)=> {
                extensionsArr.splice(index,1);
                showExtensions();
            })
        })
    
        toggleButtons.forEach((btn,index) => {
            btn.addEventListener('click', (e)=> {
                extensionsArr[index].isActive = !extensionsArr[index].isActive;
                showExtensions();
            })
        })
    }else if(isActiveSelected){
        for(let extension of extensionsArr){
            if(extension.isActive){
                activeArr.push(extension);
            }
        }
        inactiveArr = [];
        let newArr  = new Set(activeArr);
        let result = [...newArr];

        result.forEach(extension => {
            list.insertAdjacentHTML('beforeend',`
                <div class='extension'>
                    <div class='extension__top'>
                        <div class='extension__top__icon'>
                            <img src='${extension.logo}' />
                        </div>
                        <div class='extension__top__info'>
                            <h4>${extension.name}</h4>
                            <p class='description'>${extension.description}</p>
                        </div>
                    </div>
    
                    <div class='extension__bottom'>
                        <button class='remove'>Remove</button>
    
                        <div class='toggle-extension' style='${(extension.isActive) ? "background-color:var(--red700); justify-content:right" : null}'>
                            <div class='circle'></div>
                        </div>
                    </div>
                </div>
            `)
        })
    
        const removeButtons = document.querySelectorAll('.remove');
        const toggleButtons = document.querySelectorAll('.toggle-extension');
    
        removeButtons.forEach((btn,index) => {
            btn.addEventListener('click',(e)=> {
                const extension = btn.parentElement.parentElement;
                const name = btn.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.textContent;
                
                extension.remove()
               
                for(let i=0; i<extensionsArr.length; i++){
                    if(extensionsArr[i].name == name){
                        extensionsArr.splice(i,1);
                    }
                }
                
            })
        })
    
        toggleButtons.forEach((btn,index) => {
            btn.addEventListener('click', (e)=> {
                const extension = btn.parentElement.parentElement;
                activeArr[index].isActive = !activeArr[index].isActive;
                    extension.remove();
                
            })
        })
        
    }else if(isInactiveSelected){
        for(let extension of extensionsArr){
            if(extension.isActive == false){
                inactiveArr.push(extension);
            }
        }

        activeArr = [];
        let newArr  = new Set(inactiveArr);
        let result = [...newArr];

        result.forEach(extension => {
            list.insertAdjacentHTML('beforeend',`
                <div class='extension'>
                    <div class='extension__top'>
                        <div class='extension__top__icon'>
                            <img src='${extension.logo}' />
                        </div>
                        <div class='extension__top__info'>
                            <h4>${extension.name}</h4>
                            <p class='description'>${extension.description}</p>
                        </div>
                    </div>
    
                    <div class='extension__bottom'>
                        <button class='remove'>Remove</button>
    
                        <div class='toggle-extension' style='${(extension.isActive) ? "background-color:var(--red700); justify-content:right" : null}'>
                            <div class='circle'></div>
                        </div>
                    </div>
                </div>
            `)
        })
    
        const removeButtons = document.querySelectorAll('.remove');
        const toggleButtons = document.querySelectorAll('.toggle-extension');
    
        removeButtons.forEach((btn,index) => {
            btn.addEventListener('click',(e)=> {
                const extension = btn.parentElement.parentElement;
                const name = btn.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.textContent;
                
                extension.remove()
               
                for(let i=0; i<extensionsArr.length; i++){
                    if(extensionsArr[i].name == name){
                        extensionsArr.splice(i,1);
                    }
                }
                
            })
        })
    
        toggleButtons.forEach((btn,index) => {
            btn.addEventListener('click', (e)=> {
                const extension = btn.parentElement.parentElement;
                inactiveArr[index].isActive = !inactiveArr[index].isActive;
                    extension.remove();
            })
        })
    }
        
    
    
}


filterAll.addEventListener('click',()=> {
    isAllSelected = true;
    isActiveSelected = false;
    isInactiveSelected = false;
    number = 0
    showExtensions();
})

filterActive.addEventListener('click',(e)=> {
    isAllSelected = false;
    isActiveSelected = true;
    isInactiveSelected = false;
    number = 1
    showExtensions();
})

filterInactive.addEventListener('click',()=> {
    isAllSelected = false;
    isActiveSelected = false;
    isInactiveSelected = true;
    number = 2
    showExtensions();
})


export const paintRed = (i)=> {
    if(lightMode){
        for(let filter of filters){
            filter.style.color = 'var(--neutral900)';
            filter.style.backgroundColor = 'var(--neutral0)';
        }
        filters[i].style.color = 'var(--neutral0)';
        filters[i].style.backgroundColor = 'var(--red700)';
    }else{
        for(let filter of filters){
            filter.style.color = 'var(--neutral300)';
            filter.style.backgroundColor = 'var(--neutral700)';
        }
        filters[i].style.color = 'var(--neutral900)';
        filters[i].style.backgroundColor = 'var(--red500)';
    }
    
   
}

getData();
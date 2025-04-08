import { isAllSelected, isActiveSelected, isInactiveSelected, paintRed,number} from "./script.js";

export const filters = document.querySelectorAll('.filter');
const toggleColor = document.querySelector('.bar__color')
const imgLogo = document.getElementById('img-logo')
const imgColor = document.getElementById('img-color')
export let lightMode = true;

toggleColor.addEventListener('click',()=> {
    document.querySelector('body').classList.toggle('active');

    if(document.querySelector('body').classList.contains('active')){
        imgColor.setAttribute('src','assets/images/icon-sun.svg')
        imgLogo.setAttribute('src','assets/images/logo-white.svg')
    }else{
        imgColor.setAttribute('src','assets/images/icon-moon.svg')
        imgLogo.setAttribute('src','assets/images/logo.svg')
    }

    lightMode = !lightMode;
    paintRed(number);
})


filters.forEach((element,index) => {
    element.addEventListener('click',()=> {
        paintRed(index)
    })
})

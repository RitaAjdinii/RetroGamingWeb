const nav =document.querySelector("nav");
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");

// script.js

document.addEventListener("DOMContentLoaded", function() {
    window.onload = function() {
        const preloader = document.getElementById('preloader');
        const content = document.getElementById('content');
        

        setTimeout(function(){
            preloader.style.display = 'none';
            content.style.display = 'block';
        },1000);
    }
});


window.addEventListener("scroll",()=>{
    const navHeight = nav.getBoundingClientRect().height;
    const scrollHeight = window.pageYOffset;

    if(scrollHeight>navHeight){
        nav.classList.add("fixed-nav");
    }else{
        nav.classList.remove("fixed-nav");
    }
});

navToggle.addEventListener("click",()=>{
    linksContainer.classList.toggle("show-links");
});



const navLinkSound = document.getElementById('jump-sound');

// Function to play the click sound
function playClickSound() {
    navLinkSound.play();
}

// Select all navigation links and add click event listeners
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', playClickSound);
});



/**Slider */

const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})


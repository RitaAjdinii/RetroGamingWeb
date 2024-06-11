const videos = [
    {
        id:1,
        title:"Kirby and the Forgotten Land Review",
        img:"images/KirbyAndTheForgottenLand.jpg",
        source:"Videos/Kirby and the Forgotten Land Review.mp4"
    },{
        id:2,
        title:"Contra Gameplay Walkthrough",
        img:"images/ContraGameplay.jpg",
        source:"Videos/Rick Astley - Never Gonna Give You Up (Official Music Video).mp4"
    },{
        id:3,
        title:"Pokemon Red and Blue Game Review",
        img:"images/Pokemon-Red-vs-Blue.jpg",
        source:"Videos/Pokemon Red and Blue were like no one ever was _ Pokemon Blue (& red) review _ jason graves.mp4"
    },{
        id:4,
        title:"Super mario Bros gameplay Walkthrough",
        img:"images/SuperMarioBros.jpg",
        source:"Videos/Super Mario Bros - Full Game Walkthrough (NES).mp4"
    },{
        id:5,
        title:"The Legend Of Zelda 1986 Gameplay Walkthrough",
        img:"images/Zelda.jpg",
        source:"Videos/The Legend Of Zelda (NES) (Part 1) (Walkthrough - No Commentary).mp4"
    },{
        id:6,
        title:"Megaman Gameplay Review",
        img:"images/Megaman.jpg",
        source:"Videos/Mega Man NES Nintendo Retro Video Game Review S5E6 _ The Irate Gamer (1).mp4"
        
    }
];


const scrollContainer = document.querySelector(".scroll");
const btns = document.querySelectorAll(".control-btn")
const videoDisplay = document.querySelector(".display-video");
window.addEventListener("DOMContentLoaded",()=>{
    showVideos(videos);
});


function showVideos(arr){
    const video_list = arr.map((video)=>{
        return `
        <div class="video-container" data-id="${video.id}" >
        <h3>${video.title}</h3>
        <img src="${video.img}">
        </div>
         `
    }).join("");
scrollContainer.innerHTML = video_list;
const ids =document.querySelectorAll('[data-id]');
const video_containers = document.querySelectorAll(".video-container");

video_containers.forEach((v)=>{
    v.addEventListener("click",(e)=>{
        let current_ID =e.currentTarget.dataset.id;
        videoDisplay.src = videos[current_ID-1].source;
       alert(videos[current_ID-1].title+"--Press play");
    });
});
}

btns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        console.log(e.currentTarget);
        let current = e.currentTarget;
        if(current.id=="play"){
            videoDisplay.play();
        }
        if(current.id=="pause"){
            videoDisplay.pause();
        }
        if(current.id=="fullscreen"){
            videoDisplay.requestFullscreen();
        }
        if(current.id=="speed_0.5"){
            videoDisplay.playbackRate=0.5;
        }
        if(current.id=="speed_1"){
            videoDisplay.playbackRate=1;
        }
        if(current.id=="speed_1.5"){
            videoDisplay.playbackRate=1.5;
        }
        if(current.id=="speed_2"){
            videoDisplay.playbackRate=2;
        }
    });
});

const app = ()=> {
  //declaring the variables you want to work with from the HTML file
  const song = document.querySelector('.song');
  const play = document.querySelector(".play");
  const outline= document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  //declaring the variable for the sounds
  const sounds = document.querySelectorAll ('.sound-picker button');

  //tune display
  const timeDisplay= document.querySelector('.time-display');
  const outlineLength= outline.getTotalLength(); //this is an existing function

  //duration (fake duration)
  const timeSelect = document.querySelectorAll(".time-select button");
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //pick different sounds
  sounds.forEach(sound => {
    sound.addEventListener('click', function (){
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  })
  
  //play sound
  play.addEventListener('click', ()=>{
    checkPlaying(song);
  })

  //select sound
  timeSelect.forEach(option =>{
    option.addEventListener('click', function (){
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration /60)}: ${Math.floor(fakeDuration%60)}`;
    })
  })

  //create a function to pause the song
  const checkPlaying = song=>{
    if(song.paused){
      song.play();
      video.play();
      play.src ='./svg/pause.svg'
    } else {
      song.pause();
      video.pause();
      play.src ='./svg/play.svg'
    }
  }

  //animate circle
  song.ontimeupdate = ()=>{
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes =Math.floor(elapsed/60);

    //animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //animate the text

    timeDisplay.textContent = `${minutes}:${seconds}`;

    //reseting the timer

    if (currentTime >= fakeDuration){
      video.pause();
      song.pause();
      song.currentTime = 0;
      play.src ='./svg/play.svg'
    }
  }
}

app ();
console.log ("hello")
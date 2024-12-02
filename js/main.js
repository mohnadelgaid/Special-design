let mainColors = window.localStorage.getItem("color-option");
// console.log(mainColors);

if (mainColors !== null) {
  // console.log("Local storage is not empty");
  // console.log(window.localStorage.getItem("color-option"));
  document.documentElement.style.setProperty(`--main-color`, mainColors);

  //remove class active  from all li

  document.querySelectorAll(".colors-list li").forEach((li) => {
    li.classList.remove("active");

    // add class active for current li color with data color === local item storage
    if (li.dataset.color === mainColors) {
      //add active class
      li.classList.add("active");
    }
  });
}
//random Background Option
let backgroundOption = true;

//Variable To Control The Background Interval
let backgroundInterval;

//Check If There's Local Storage Random Background Item
let backgroundLocalItem = window.localStorage.getItem("background_option");

//Check if Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
  // console.log("Not Empty")
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-background .no").classList.add("active");
  }

  // console.log(backgroundLocalItem);

}

//toggle spin class on icon
var icon = document.querySelector(".toggle-settings .fa-gear");
var box = document.querySelector(".settings-box");

icon.addEventListener("click", () => {
  //toggle class fa-spin
  icon.classList.toggle("fa-spin");
  // toggle class open on main settings box
  box.classList.toggle("open");
});

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
// console.log(colorsLi);

//loop on list items
colorsLi.forEach((li) => {
  // console.log(li);

  //click on every list items
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);

    //set color on root
    document.documentElement.style.setProperty(
      `--main-color`,
      e.target.dataset.color
    );

    //set color on local storage
    window.localStorage.setItem("color-option", e.target.dataset.color);

    hundleActive(e);

    //remove class active  from all li
    // colorsLi.forEach((li) => {
    //   li.classList.remove("active");
    // });

    //onther method
    // e.target.parentElement.querySelectorAll(".active").forEach(element=>{
    //     element.classList.remove("active");
    // })

    //add class active for current li color
    // e.currentTarget.classList.add("active");
  });
});

//Switch Background
let randomBackEle = document.querySelectorAll(".random-background span");
// console.log(randomBackEle);

//loop on All Spans
randomBackEle.forEach((span) => {
  //click on every span
  span.addEventListener("click", (e) => {
    hundleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImg();
      window.localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      window.localStorage.setItem("background_option", false);
    }
  });
});

//select landing page
let landingpage = document.querySelector(".landing-page");
//get array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//Function  to Randomize Imgs
function randomizeImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // change background image url
      landingpage.style.backgroundImage =
        'url("../imgs/' + imgsArray[randomNumber] + '")';
    }, 5000);
  }
}

randomizeImg();

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  //Skills Offest Top
  let skillOffsetTop = ourSkills.offsetTop;
  // console.log(skillOffsetTop);
  //Skills Section Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // console.log(skillsOuterHeight);
  //Window Height
  let windowHeight = this.innerHeight;
  // console.log(windowHeight);
  //window Scrool Top
  let WindowScrollTop = this.scrollY;
  // console.log(WindowScrollTop);

  if (
    WindowScrollTop >
    skillOffsetTop + skillsOuterHeight - windowHeight - 200
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//Create Popup with  The Images
let ourGallary = document.querySelectorAll(".gallary img");
ourGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create the overlay element
    let overlay = document.createElement("div");

    // Add class to the overlay
    overlay.className = "popup-overlay";

    // append overlay to body
    document.body.appendChild(overlay);

    //create the popup box element
    let popupBox = document.createElement("div");

    // Add class to the popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      //create image Heading
      let imageHeading = document.createElement("h3");

      //create image text
      let imageText = document.createTextNode(img.alt);

      // append image text to image Heading
      imageHeading.appendChild(imageText);

      // append image Headingto  popupBox
      popupBox.appendChild(imageHeading);
    }

    //create the image
    let popupImage = document.createElement("img");

    //Set image src
    popupImage.src = img.src;

    // append popupImage to popupBox
    popupBox.appendChild(popupImage);

    // append popupBox to body
    document.body.appendChild(popupBox);

    //create close button
    let closeButton = document.createElement("span");

    //create the close button text
    let closeButtonText = document.createTextNode("X");

    //Append text to close button
    closeButton.appendChild(closeButtonText);

    //Add class to close button
    closeButton.className = "close-button";

    //Append close button to popup box
    popupBox.appendChild(closeButton);
  });
});

//close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    //remove the current popup
    e.target.parentNode.remove();
    //remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//Select All Links
const allLinks = document.querySelectorAll(".links a");

function scroollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
};

scroollToSomewhere(allBullets);
scroollToSomewhere(allLinks);

//Handle Active Class
function hundleActive(ev){
      //remove class active  from span
      ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
      });
      //add class active for current span
      ev.currentTarget.classList.add("active");
}

let bulletsSpan=document.querySelectorAll(".bullets-option span");
let bulletsContainer=document.querySelector(".nav-bullets");

let bulletlocalItem=window.localStorage.getItem("bullets-option");
if(bulletlocalItem!==null){
    bulletsSpan.forEach(span=>{
      span.classList.remove("active");
    });
    if(bulletlocalItem==='block'){
      bulletsContainer.style.display='block';
      document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
      bulletsContainer.style.display='none';
      document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span=>{
  span.addEventListener("click",(e)=>{
    if(e.target.dataset.display==="show"){
      bulletsContainer.style.display='block';
      window.localStorage.setItem("bullets-option",'block');

    }else{
      bulletsContainer.style.display='none';
      window.localStorage.setItem("bullets-option",'none');
    }
    hundleActive(e);
  });
});

//Reset Options
document.querySelector(".settings-box .reset-options").onclick=function(){
  // window.localStorage.clear();
  window.localStorage.removeItem("bullets-option");
  window.localStorage.removeItem("color-option");
  window.localStorage.removeItem("background_option");

  //window Reload
  window.location.reload();
}

//Toggle Menu
let menuBtn=document.querySelector(".toggle-menu");
let tLinks=document.querySelector(".links");

menuBtn.onclick=function(e){
  //Stop Propagation
  e.stopPropagation();
  //Toggle class "menu-active" on button
  this.classList.toggle("menu-active");
  //Toggle class "open" on links
  tLinks.classList.toggle("open");
}

// click Anywhere outside menu and toggle button
document.addEventListener("click",(e)=>{
  if(e.target!==menuBtn && e.target!==tLinks){
    if(tLinks.classList.contains("open")){
      //Toggle class "menu-active" on button
      menuBtn.classList.toggle("menu-active");
      //Toggle class "open" on links
      tLinks.classList.toggle("open");
    }
  }
});

tLinks.onclick=function(e){
  e.stopPropagation();
}
/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
Author: Julie Branyan
*/
const jobRole = document.getElementById("title");
const otherJobRoleDiv = document.querySelector(".otherJobRole");
const shirtDesign = document.getElementById("design");
const shirtColor = document.querySelector(".shirt-colors");
const color = document.querySelector("#color");

console.log(shirtColor);
console.log(shirtDesign);
console.log(color);

document.getElementById("name").focus();
otherJobRoleDiv.style.display = 'none';


jobRole.addEventListener('change', e =>{
  console.log(jobRole.value);
  if(e.target.value == 'other'){
    if(otherJobRoleDiv.style.display == 'none'){
      otherJobRoleDiv.style.display = 'block';  
    } 
  } else {
    otherJobRoleDiv.style.display = 'none'
  }
});

shirtDesign.addEventListener('change', e =>{
  
  shirtColor.style.display = 'block';
  console.log(color);

  for(let i=0; i < color.length; i++){

    const colorsToDisplay = color[i].getAttribute("data-theme");
    const shirtSelected = e.target.value;

    if(shirtSelected === colorsToDisplay){
      color[i].hidden = false;
      console.log(colorsToDisplay);
    } else {
      color[i].hidden = true;
      console.log(colorsToDisplay);
    }
  } 
});


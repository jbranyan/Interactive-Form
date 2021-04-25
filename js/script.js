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
const activitiesInput = document.querySelectorAll('.activities input');
const activities = document.querySelector('.activities');
const p = document.querySelector('p.activities-cost');
let total = 0;

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
  color.selectedIndex = 0;

  for(let i=0; i < color.length; i++){
    const colorsToDisplay = color[i].getAttribute("data-theme");
    const shirtSelected = e.target.value;

    if(shirtSelected === colorsToDisplay){
      color[i].selected = false;
      color[i].hidden = false;
    } else {
      color[i].hidden = true;
    }
  }
});

activities.addEventListener('change', e => {

  const selectedActivity = e.target;
  const activityName = selectedActivity.getAttribute('name');
  const selectedActivityCost = selectedActivity.getAttribute('data-cost');
  
  for(let i=0; i < activitiesInput.length; i++){
    const name = activitiesInput[i].getAttribute('name');
    if(name === activityName){
      if(selectedActivity.checked){
        total += parseInt(selectedActivityCost);
      } else {
        total -= parseInt(selectedActivityCost);
      }
    } 
  } 
  p.innerHTML = `Total: $${total}`;
  return total;
});
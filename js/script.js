/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
Author: Julie Branyan
*/
const jobRole = document.getElementById("title");
const otherJobRoleDiv = document.querySelector(".otherJobRole");
document.getElementById("name").focus();
otherJobRoleDiv.style.display = 'none';


jobRole.addEventListener('click', () =>{
  console.log(jobRole.value);
  if(jobRole.value == 'other'){
    if(otherJobRoleDiv.style.display == 'none'){
      otherJobRoleDiv.style.display = 'block';  
    } 
  } else {
    otherJobRoleDiv.style.display = 'none'
  }
});
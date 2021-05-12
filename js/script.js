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
const paymentMethodDefault = document.querySelectorAll('#payment option');
paymentMethodDefault[1].selected = true;
const activitiesTotal = document.querySelectorAll('#activities-cost');
const paypal = document.querySelector('.paypal');
paypal.hidden = true;
const bitcoin = document.querySelector('.bitcoin');
bitcoin.hidden = true;
const paymentMethod = document.getElementById('payment');
const creditCard = document.querySelector('#credit-card');
const participantName = document.querySelector('#name');
const emailName = document.querySelector('#email');
const form = document.querySelector('form');
const zipCode = document.querySelector('#zip');
const CCV = document.querySelector('#cvv');
const creditCardNumber = document.querySelector('#cc-num');
const creditCardHint = document.querySelector('#cc-hint');
const cvvHint = document.querySelector('#cvv-hint');
const nameHint = document.querySelector('#name-hint');
const emailHint = document.querySelector('#email-hint');
const activitiesHint = document.querySelector('#activities-hint');
const zipCodeHint = document.querySelector('#zip-hint');
let total = 0;

document.getElementById("name").focus();
otherJobRoleDiv.style.display = 'none';


jobRole.addEventListener('change', e =>{
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

paymentMethod.addEventListener('change', e => {
  const selectedPayment = e.target.value;  

  if(selectedPayment === 'paypal'){
      paypal.hidden = false;
      bitcoin.hidden = true;
      creditCard.hidden = true;
  } if(selectedPayment === 'bitcoin'){
      bitcoin.hidden = false;
      paypal.hidden = true;
      creditCard.hidden = true;
  } if(selectedPayment === 'credit-card'){
      bitcoin.hidden = true;
      paypal.hidden = true;
      creditCard.hidden = false;
  }
  return selectedPayment;
});

const validateName = () =>{
  const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(participantName.value);

  return nameIsValid;
}

const validateEmail = () =>{
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailName.value);
  
  return emailIsValid;
}
//validate activities are checked
const validateActivities = () =>{
  const activitySelectionValid = total >= 100;
  
  return activitySelectionValid;
}

//validate credit card number
const validateCreditCardNumber = () =>{
  const creditCardNumberValid = /^([0-9]{13})(?:[0-9]{3})?/.test(creditCardNumber.value);
  
  return creditCardNumberValid;
}

//validate zip code
const validateZipcode = () =>{
  const zipcodeValid = /^\d{5}$/.test(zipCode.value);
  
  return zipcodeValid;
}

// validate CCV
const validateCVV = () =>{
  // The "CVV" field must contain a 3 digit number.
  const cvvValid = /^\d{3}$/.test(cvv.value);
  
  return cvvValid;
}

form.addEventListener('submit', e => {
  if(!validateName()){
      e.preventDefault();
      nameHint.style.display = 'block';
  } else if(!validateEmail()){
      e.preventDefault();
      emailHint.style.display = 'block';
  } else if(!validateActivities()){
      e.preventDefault();
      activitiesHint.style.display = 'block';
  } else if(!validateCreditCardNumber() && paymentMethod.value === 'credit-card'){
      e.preventDefault();
      creditCardHint.style.display = 'block';
  } else if(!validateZipcode() && paymentMethod.value === 'credit-card'){
      e.preventDefault();
      zipCodeHint.style.display = 'block';
  } else if(!validateCVV() && paymentMethod.value === 'credit-card'){
      e.preventDefault();
      cvvHint.style.display = 'block';
  } 
});


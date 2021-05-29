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
const activitiesCheckbox = document.querySelectorAll('input[type="checkbox"]');
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

//focus on the name field when the page loads
document.getElementById("name").focus();

//Hide the other job role when the page loads
otherJobRoleDiv.style.display = 'none';

//Hide or display the other field when "other" job role is selected
jobRole.addEventListener('change', e =>{
  if(e.target.value == 'other'){
    if(otherJobRoleDiv.style.display == 'none'){
      otherJobRoleDiv.style.display = 'block';  
    } 
  } else {
    otherJobRoleDiv.style.display = 'none'
  }
});

//Based off the shirt selected, display the related shirt color
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

//add and subtract from the total based off of the activities select or removed
//Log the updated total below the activities
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
  
  //prevent users from booking activites at the same date and time
  const activityDateTime = e.target.getAttribute('data-day-and-time');
  const nameOfActivity = e.target.getAttribute('name');
  
  for(let i =0; i < activitiesCheckbox.length; i++){
    const selectedActivityName = activitiesCheckbox[i].getAttribute('name');
    const selectedActivityDate = activitiesCheckbox[i].getAttribute('data-day-and-time');
    
    if(nameOfActivity !== selectedActivityName && selectedActivityDate === activityDateTime){
      activitiesCheckbox[i].parentElement.classList.add('disabled');
      activitiesCheckbox[i].disabled = true;
    } else {
      activitiesCheckbox[i].parentElement.classList.add('enabled');
      activitiesCheckbox[i].disabled = false;
    }
  }
});

for(let i=0; i < activitiesCheckbox.length; i++){
  activitiesCheckbox[i].addEventListener('focus', e =>{
    e.target.parentElement.classList.add('focus');
  });
  
  activitiesCheckbox[i].addEventListener('blur', e =>{
    e.target.parentElement.classList.remove('focus');
  });
}
//Display the fields related to the payment type selected
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

function fieldsValid(e){
  e.parentElement.classList.add('valid');
  e.parentElement.classList.remove('not-valid');
  e.parentElement.lastElementChild.hidden = true;
}

function fieldsInvalid(e){
  e.parentElement.classList.add('not-valid');
  e.parentElement.classList.remove('valid');
  e.parentElement.lastElementChild.hidden = false;
}


const validateName = () =>{
  const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(participantName.value);
  if(nameIsValid){
    fieldsValid(participantName);
  } else{
    fieldsInvalid(participantName);
  }
  return nameIsValid;
}

const validateEmail = () =>{
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailName.value);
  if(emailIsValid){
    fieldsValid(emailName);
  } else if(emailName.value.length == 0){
    fieldsInvalid(emailName);
    emailHint.innerHTML = 'Enter an email address.';
  } else{
    fieldsInvalid(emailName);
    emailHint.innerHTML = 'Email address must be formatted correctly';
  }
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
  if(creditCardNumberValid){
    fieldsValid(creditCardNumber);
  } else{
    fieldsInvalid(creditCardNumber);
  }
  return creditCardNumberValid;
}

//validate zip code
const validateZipcode = () =>{
  const zipcodeValid = /^\d{5}$/.test(zipCode.value);
  if(zipcodeValid){
    fieldsValid(zipCode);
  } else{
    fieldsInvalid(zipCode);
  }
  return zipcodeValid;
}

// validate CCV
const validateCVV = () =>{
  // The "CVV" field must contain a 3 digit number.
  const cvvValid = /^\d{3}$/.test(cvv.value);
  if(cvvValid){
    fieldsValid(cvv);
  } else{
    fieldsInvalid(cvv);
  }
  return cvvValid;
}
//Upon form submission, validate whether the fields were input correctly
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

//Keyup to listen for validation on email field
participantName.addEventListener('keyup', () => {
  validateName(participantName); 
});

emailName.addEventListener('keyup', () => {
  validateEmail(emailName);
});

creditCardNumber.addEventListener('keyup', () => {
  validateCreditCardNumber(creditCardNumber);
});

zipCode.addEventListener('keyup', () => {
  validateZipcode(zipCode);
});

cvv.addEventListener('keyup', () => {
  validateCVV(cvv);
});
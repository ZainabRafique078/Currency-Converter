const api_key = 'ad4e4f6ed0ce30838441040d';
const BASE_URL = `https://v6.exchangerate-api.com/v6/ad4e4f6ed0ce30838441040d/latest/USD`;
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
//to access all country codes we print and check 
//for (code in countryList) {
  //  console.log(code , countryList[code]);
//}
for (let select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name=== "from" && currcode ==="USD") {
          newOption.selected = "selected";
        } else if (select.name=== "to" && currcode ==="PKR") {
          newOption.selected = "selected";
        }
        select.append(newOption);
    }//we create all countryList as an indivisual then add them in select
//to make and track chage we use target and eventlisteners
select.addEventListener("change" , (evt) =>{
  updateFlag(evt.target);
})
}
//by selecting other country we also want to change it's flag
const updateFlag = (element)=>{
let currcode = element.value;
let countryCode = countryList[currcode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc; 
}
//to make exchange rate btn to perform some function
btn.addEventListener("click" , async (evt)=>{
evt.preventDefault();//btn ko click krny pa sary kaam khud krwany k liya
let amount = document.querySelector(".amount input");
let amountVal = amount.value;
console.log(amountVal);
if(amountVal==="" || amountVal <1){
  amountVal = 1;
  amount.value = "1";
}
//console.log(fromCurr.value , toCurr.value);
const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rate = data[toCurr.value.toLowerCase()];
let finalAmount = amountVal * rate;
msg.innerText=`${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
})
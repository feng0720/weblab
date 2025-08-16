const number = document.getElementById("number");
const btn = document.getElementById("convert-btn");
const res = document.getElementById("output");
const chars = [
  
];

btn.addEventListener("click",()=>{
  if(!number.value){
    res.innerText = "Please enter a valid number";
  }
  else if(number.value<=0){
    res.innerText = "Please enter a number greater than or equal to 1";
  }
  else if(number.value>=4000){
    res.innerText = "Please enter a number less than or equal to 3999";
  }
})
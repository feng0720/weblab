const text = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const res = document.getElementById("result");

const changeToValid = ()=>{
  const string = text.value;
  const str = string.split("").filter((s)=>{
    return (s>='a'&&s<='z')||(s>='A'&&s<='Z')||(s>='0'&&s<='9');
  }).join("").toLowerCase();
  return str;
}
const func = ()=>{
  const str = changeToValid();
  const r_str = str.split("").reverse().join("");
  return str === r_str;
}

button.addEventListener("click",()=>{
  const len = text.value.length;
  if(len === 0) alert("Please input a value");
  else if(len === 1) res.innerText = (`${text.value} is a palindrome`);
  else res.innerText = func() ? `${text.value} is a palindrome` : `${text.value} is not a palindrome`;
})
text.addEventListener("keydown",(event)=>{
  if(event.key==="Enter"){
    button.click();
  }
})
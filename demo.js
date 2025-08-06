const body = document.querySelector("body");
const btn = document.querySelector("#changeColor");
const reset = document.querySelector("#reset");
const darkColorsArr = [
    "#2C3E50",
    "#34495E",
    "#2C2C2C",
    "#616A6B",
    "#4A235A",
    "#2F4F4F",
    "#0E4B5A",
    "#36454F",
    "#2C3E50",
    "#800020",
    ];
const index = ()=> Math.floor(Math.random()*darkColorsArr.length);

const func = ()=>{
    body.style.backgroundColor = darkColorsArr[index()];
}
const rs = ()=>{
    if(body.style.backgroundColor !== "antiquewhite"){
        body.style.backgroundColor = "antiquewhite";
    }
}
btn.onclick = func;
reset.onclick = rs;


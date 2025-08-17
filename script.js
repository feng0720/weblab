const number = document.getElementById("number");
const btn = document.getElementById("convert-btn");
const res = document.getElementById("output");

const func = ()=>{
  let v = parseInt(number.value);
  let nums = [];
  while(v>0){
    nums.unshift(v%10);
    v = Math.floor(v/10);
  }
  let str = "";
  //function1--forEach--it can not change the array beacause the parameters just a copy
  // nums.forEach((n,i)=>{
  //   nums[i]*=10**(nums.length-1-i);
  // })
  //function2--map--it can change the array
  nums = nums.map((n,i)=>n*=10**(nums.length-1-i));
  // console.log(nums);
  const len = nums.length;
  for (let i of nums){
    if(i>=1000){
      while(i){
        str+='M';
        i-=1000;
      }
    }else if(i>=500&&i<1000){
      if(i===900){
        str+='CM';
      }
      else{
        str+='D';
        while((i-500)){
          str+='C';
          i-=100;
        }
      }
    }else if(i>=100&&i<500){
      if(i===400){
        str+='CD';
      }
      else {
        while(i){
          str+='C';
          i-=100;
        }
      }
    }else if(i>=50&&i<100){
      if(i===90){
        str+='XC';
      }else{
        str+='L';
        i-=50;
        while(i){
          str+='X';
          i-=10;
        }
      }
    }else if(i>=10&&i<50){
      if(i===40){
        str+='XL';
      }else{
        while(i){
          str+='X';
          i-=10;
        }
      }
    }else if(i>=5&&i<10){
      if(i===9){
        str+='IX';
      }else{
        str+='V';
        i-=5;
        while(i){
          str+='I';
          i--;
        }
      }
    }
    else if(i>=1&&i<5){
      if(i===4){
        str+='IV';
      }else{
        while(i){
          str+='I';
          i--;
        }
      }
    }
  }
  return str;
}

const judge = ()=>{
  if(!number.value){
    res.innerText = "Please enter a valid number";
  }
  else if(number.value<=0){
    res.innerText = "Please enter a number greater than or equal to 1";
  }
  else if(number.value>=4000){
    res.innerText = "Please enter a number less than or equal to 3999";
  }
  else{
    res.innerText = func();
  }
}
btn.addEventListener("click",judge)
number.addEventListener("keydown",(e)=>{
  if(e.key==="Enter"){
    judge();
  }
})
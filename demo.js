const tem = [19,20,23,25];
const change = (tem)=>{
    return tem*9/5+32;
};
const modify = (tem,change)=>{
    for(t of tem){
        console.log(change(t));
    }
};
modify(tem,change);
const squre = tem.map((num) => (num*3));
console.log(squre);
const the = tem.filter(num=>(num>20));
console.log(the);
const arr = [2,3,5,1,0,4];
const sorted = arr.toSorted((a,b)=>a-b); 
// const sorted = arr.sort((a,b)=>a-b);
// console.log(arr);
// console.log(sorted);
const string  = "hello javascript and linux";

const sp = string.split(" ");
const str = arr.join(".");
// console.log(str);
// console.log(sp);
const max_n = Math.max(...arr); // 在这里需要扩展符号因为不能直接传入数组
// console.log(...arr); // 这个扩展符号返回的是一个一个的元素最终是一个序列而不是一个数组
// console.log(...string);
console.log(max_n);
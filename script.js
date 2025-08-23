// 对每个符号定义函数运算
const infixToFunction = {
  "+": (x,y)=>x+y,
  "-": (x,y)=>x-y,
  "*": (x,y)=>x*y,
  "/": (x,y)=>x/y
};
// replace函数可以接受一个正则表达式/字符串和一个函数/字符串
const infixEval = (str,regex)=>str.replace(regex,(_match,arg1,operator,arg2)=>infixToFunction[operator](parseFloat(arg1),parseFloat(arg2)));
// 匹配*/符号
const highPrecedence = (str)=>{
  const regex = /\d+[*\/]\d+/;
  const str2 = infixEval(str,regex);
  return str===str2?str:highPrecedence(str2);
}

// 进行一些值的计算：总和，平均数，中位数 
const isEven = (num)=>num%2===0?true:false;
const sum = (nums)=>nums.reduce((arr,el)=>arr+el);
const average = (nums)=>sum(nums)/nums.length;
const median = (nums)=>{
  const sorted = nums.slice().sort((a,b)=>a-b);
  const length = sorted.length;
  const middle = length/2-1;
  return isEven(length)?(nums[Math.ceil(middle)]+nums[Math.ceil(middle+1)])/2:nums[Math.ceil(middle)];
}
// 定义表格所有运算
const spreadsheetFunctions = {
  "": (el)=>el, // 空运算处理边界条件
  sum,average,median, // 求和，平均，中位数
  even: nums=>nums.filter(isEven), // 过滤只保留偶数
  someeven: nums=>nums.some(isEven), // 检测是否有偶数
  everyeven: nums=>nums.every(isEven), // 检测是否每个都是偶数
  firsttwo: nums=>nums.slice(0,2), // 取前两个数---slice方法适用于数组和字符串传入参数(start,end) 取值范围是[start,end)不包含end
  lasttwo: nums=>nums.slice(nums.length-2,nums.length),// 取后面两个数
  // lasttwo: nums=>nums.slice(-1), 
  has2: nums=>nums.includes(2), // 判断是否包含2这个元素
  increment: nums=>nums.map(el=>el+1), // 对数组中每个元素+1,这里map会返回一个新的数组但是这里注意forEach不会返回一个新的数组
  random: nums=>{
    const max = nums[0]>nums[1]?nums[0]:nums[1];
    const min = nums[0]<nums[1]?nums[0]:nums[1];
    return Math.floor(Math.random()*(max-min+1))+min;
  }, // 取第一个数到第二个数之间的平均数
  // random: ([x,y])=>Math.floor(Math.random()*y+x),
  range: ([x,y])=>range(x,y),
  // range: nums=>range(...nums),
  nodupes: nums=>[...new Set(nums)] // 去重
}
// 应用函数
const applyFunction = (str)=>{
  const noHigh = highPrecedence(str); // 优先级更高的运算符
  const infix = /([\d.]+)([+-])([\d.]+)/; // 判断中缀表达式
  const str2 = infixEval(noHigh,infix);
  const functionCall =/([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = (args)=>args.split(",").map(parseFloat);
  const apply = (fn,args)=>spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall,(match,fn,args)=>spreadsheetFunctions.hasOwnProperty(fn.toLowerCase())?apply(fn,args):match);
}
// 构造出根据数字的返回返回这个范围的所有数字的数组
const range = (start,end)=>Array(end-start+1).fill(start).map((element,index)=>element+index);
// 根据字母来变换
const charRange = (start,end)=>range(start.charCodeAt(0),end.charCodeAt(0)).map((code)=>String.fromCharCode(code));

const evalFormula = (x,cells)=>{
  const idToText = (id)=>cells.find((cell)=>cell.id === id).value;
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
  const rangeFromString = (num1,num2)=>range(parseInt(num1),parseInt(num2));
  // const elemValue = (num)=>{
  //   const inner = (character)=>{
  //     return idToText(character + num);
  //   };
  //   return inner;
  // }
  const elemValue = num=>character=>idToText(character + num); // 上面的那种写法的简易写法
  const addCharacters = character1=>character2=>num=>charRange(character1,character2).map(elemValue(num));
  const rangeExpanded = x.replace(rangeRegex,(_match,char1,num1,char2,num2)=>rangeFromString(num1,num2).map(addCharacters(char1)(char2)));
  const cellRegex = /[A-J][1-9][0-9]?/gi;
  const cellExpanded = rangeExpanded.replace(cellRegex,(match)=>idToText(match.toUpperCase()));
  const functionExpanded = applyFunction(cellExpanded);
  return functionExpanded===x?functionExpanded:evalFormula(functionExpanded,cells);
}

window.onload = ()=>{
  const container = document.getElementById("container");
  const createLabel = (name)=>{
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  }
  const letters = charRange("A","J");
  letters.forEach(createLabel);
  range(1,99).forEach((number)=>{
    createLabel(number);
    letters.forEach((letter)=>{
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
      input.onchange = update;
      container.appendChild(input);
    });
  });
}

const update = (event)=>{
  const element = event.target;
  const value = element.value.replace(/\s/g,"");
  if(!value.includes(element.id)&&value[0]==="="){
    element.value = evalFormula(value.slice(1),Array.from(document.getElementById("container").children));
  }
}
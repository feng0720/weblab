// 计算平均值(reduce方法进行累加其中acc是累加器每次存储加上了之后的值el是每次的元素后面跟着的0是acc的初始值)
const getMean = (array)=>array.reduce((acc,el)=>acc+el,0)/array.length;

// 取中位数
const getMedian = (array)=>{
  // const sorted = array.sort((a,b)=>a-b); // sort方法会直接改变原来的数组
  const sorted = array.toSorted((a,b)=>a-b); // toSorted方法不会改变原来的数组
  if(sorted.length%2===1){
    return sorted[Math.floor(sorted.length/2)];
  }
  else {
    return (sorted[Math.floor(sorted.length/2)-1]+sorted[Math.floor(sorted.length/2)])/2;
  }
}

// 计算众数
const getMode = (array)=>{
  const counts = {};
  //array.forEach(el =>{
  //  if(counts[el]){
  //    counts[el]+=1;
  //  }else{
  //    counts[el] = 1;
  //  }
  //})
  array.forEach(el=>counts[el] = counts[el]?counts[el]+1:1); // 用三元运算符来实现每个数值出现的次数
  
  // 如果每个都只出现了一次那就什么都不返回,这里的对象是普通对象用Object.values()获取里面的每个值
  if(new Set(Object.values(counts)).size===1){
    return null;
  }
  //通过Object.keys获得对象中的每个key组成的数组然后对这个数组通过sort进行排序降序排序，然后选择第一个元素就是出现次数最多的那个元素了
  const highest = Object.keys(counts).sort((a,b)=>counts[b]-counts[a])[0]; 
  const mode = Object.keys(counts).filter(el=>counts[el]===counts[highest]);
  return mode.join(", "); // join函数返回字符串对于数组中的每一个元素以括号里面的东西进行分隔最后返回一个字符串
}

// 计算极差
const getRange = (array)=>{
  return Math.max(...array)-Math.min(...array); // 返回最大值减最小值这里的max和min方法需要用...扩展符号进行扩展因为这个不能直接接受一个数组参数而是要一个序列
}

// 计算方差
const getVariance = (array)=>{
  const mean = getMean(array); // 取得平均值
  const variance = array.reduce((acc,el)=>{ // reduce这个意思实际上是把所有的都压缩到一个值里面这个就是acc
    const difference = el-mean;
    const squared = difference**2;
    return acc+squared;
  },0)/array.length;
  return variance;
}

// 计算标准差
const getStandardDeviation = (array)=>{
  const variance = getVariance(array);
  // const standardDeviation = Math.pow(variance,0.5); // 这个函数是广泛使用的指数函数
  const standardDeviation = Math.sqrt(variance); // 这个就是实现开根号的函数
  return standardDeviation;
}

// 计算主要逻辑
const calculate = ()=>{
  const value = document.querySelector("#numbers").value; // 得到输入的值--为一个字符串
  const array = value.split(/\s*/g); // 按照空格分割得到一个数组这个数组里面的值还是一个个字符
  const numbers = array.map(el => Number(el)).filter(el=>!isNaN(el)); // 把数组里面的有效值转化为数字类型
  
  // 获取每一个值的结果
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);
  // 改变网页中显示的内容
  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
}
const getMean = (array)=>array.reduce((acc,el)=>acc+el,0)/array.length;

const getMedian = (array)=>{
  const sorted = array.toSorted((a,b)=>a-b);
  if(sorted.length%2===1){
    return sorted[Math.floor(sorted.length/2)];
  }
  else {
    return (sorted[Math.floor(sorted.length/2)-1]+sorted[Math.floor(sorted.length/2)])/2;
  }
}

const getMode = (array)=>{
  const counts = {};
  //array.forEach(el =>{
  //  if(counts[el]){
  //    counts[el]+=1;
  //  }else{
  //    counts[el] = 1;
  //  }
  //})
  array.forEach(el=>counts[el] = counts[el]?counts[el]+1:1);
  if(new Set(Object.values(counts)).size===1){
    return null;
  }
  //通过Object.keys获得对象中的每个key组成的数组然后对这个数组通过sort进行排序降序排序，然后选择第一个元素就是出现次数最多的那个元素了
  const highest = Object.keys(counts).sort((a,b)=>counts[b]-counts[a])[0]; 
  const mode = Object.keys(counts).filter(el=>counts[el]===counts[highest]);
  return mode.join(", ");
}

const getRange = (array)=>{
  return Math.max(...array)-Math.min(...array);
}

const getVariance = (array)=>{
  const mean = getMean(array);
  const variance = array.reduce((acc,el)=>{
    const difference = el-mean;
    const squared = difference**2;
    return acc+squared;
  },0)/array.length;
  return variance;
}

const getStandardDeviation = (array)=>{
  const variance = getVariance(array);
  // const standardDeviation = Math.pow(variance,0.5);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}

const calculate = ()=>{
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => {
    Number(el);
  }).filter(el=>!isNaN(el));
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);
  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
}
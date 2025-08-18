const sortButton = document.getElementById("sort");

const sortInputArray = (event)=>{
  event.preventDefault();
  const inputValues = [...document.getElementsByClassName("values-dropdown")].map((dropdown)=>Number(dropdown.value));
  // const sortedValues = bubbleSort(inputValues);
  // const sortedValues = selectionSort(inputValues);
  // const sortedValues = insertionSort(inputValues);
  const sortedValues = inputValues.sort((a,b)=>{
    return a-b;
  }); // 这里sort函数会自动把数组里面的元素转化成字符串的格式进行比较但是我们这里需要的是数值的比较所以需要传入回调函数通过a-b||b-a使其强制进行数值比较a-b就是升序反之降序
  updateUI(sortedValues);
}

const updateUI = (array = [])=>{
  array.forEach((num,i)=>{
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  });

}

const bubbleSort = (array)=>{
  for(let i=0;i<array.length;i++){
    for(let j = 0;j<array.length-1;j++){
      if(array[j]>array[j+1]){
        const temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
    }
  }
  return array;
}

const selectionSort = (array)=>{
  for(let i = 0;i<array.length;i++){
    let minIndex = i;
    for(let j = i+1;j<array.length;j++){
      if(array[j]<array[minIndex]){
        minIndex = j;
      }
    }
    const temp = array[minIndex];
    array[minIndex] = array[i];
    array[i] = temp;
  }
  return array;
}

const insertionSort = (array)=>{
  for(let i = 1;i<array.length;i++){
    const currValue = array[i];
    let j = i-1;
    while(j>=0&&array[j]>currValue){
      array[j+1] = array[j];
      j--;
    }
    array[j+1] = currValue;
  }
  return array;
}

sortButton.addEventListener("click",sortInputArray);

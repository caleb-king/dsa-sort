/* eslint-disable no-param-reassign */
import LinkedList from './LinkedList.js';
import STORE from './store.js';

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function partition(array, start, end) {
  const pivot = array[end - 1];
  let pivotIndex = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, pivotIndex);
      pivotIndex++;
    }
  }
  swap(array, end - 1, pivotIndex);
  // const tempArr = [];
  // for (let i = start; i < end; i++) {
  //   tempArr.push(array[i]);
  // }
  // const partitionResult = tempArr.join(', ');
  // console.log(`pivot is ${pivot}`);
  // console.log(`result of partition: ${partitionResult}`);
  return pivotIndex;
}

function quickSort(array, start = 0, end = array.length) {
  // console.log(`quicksort ran -> start: ${start}, end: ${end}`);
  if (start >= end) {
    return array;
  }
  const pivotIndex = partition(array, start, end);
  array = quickSort(array, start, pivotIndex);
  array = quickSort(array, pivotIndex + 1, end);
  return array;
}

function randomizeArray(inputArr) {
  function getRandomIndex() {
    return Math.floor(Math.random() * Math.floor(inputArr.length - 1));
  }

  for (let i = 0; i < inputArr.length; i++) {
    const randomIndex = getRandomIndex();
    swap(inputArr, i, randomIndex);
  }

  return inputArr;
}

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex] = left[leftIndex];
      outputIndex++;
      leftIndex++;
    } else {
      array[outputIndex] = right[rightIndex];
      outputIndex++;
      rightIndex++;
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex] = left[i];
    outputIndex++;
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex] = right[i];
    outputIndex++;
  }
  // console.log('sorted so far: ', array);
  return array;
}

function mergeSort(array) {
  if (array.length <= 1) {
    // console.log('base case found: ', array[0]);
    return array;
  }
  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  // console.log('mergeSorting left: ', left);

  left = mergeSort(left);

  // console.log('mergeSorting right: ', right);

  right = mergeSort(right);

  // console.log('merging left and right: ', left, right);

  return merge(left, right, array);
}

function mergeSortList(list) {
  const tempArr = [];
  let currNode = list.head;
  while (currNode !== null) {
    tempArr.push(currNode.value);
    currNode = currNode.next;
  }
  const sortedArr = mergeSort(tempArr);

  const sortedList = new LinkedList();
  sortedArr.forEach(item => {
    sortedList.insertLast(item);
  });
  return sortedList;
}

function display(list) {
  if (list.head === null) {
    return null;
  }
  let currNode = list.head;
  let displayString = '';
  while (currNode.next !== null) {
    displayString += `${currNode.value} -> `;
    currNode = currNode.next;
  }
  displayString += currNode.value;
  console.log(displayString);
}

// InsertionSort to be used within bucket sort
function insertionSort(inputArr) {
  for (let i = 1; i < inputArr.length; i++) {
    const key = inputArr[i];
    let j = i - 1;
    while (j >= 0 && inputArr[j] > key) {
      inputArr[j + 1] = inputArr[j];
      j -= 1;
    }
    inputArr[j + 1] = key;
  }
  return inputArr;
}

// Implement bucket sort
function bucketSort(array, min, max) {
  if (array.length === 0) {
    return array;
  }

  // Declaring vars
  let i;
  const bucketSize = array.length / 2;

  // Initializing buckets
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const allBuckets = new Array(bucketCount);

  for (i = 0; i < allBuckets.length; i++) {
    allBuckets[i] = [];
  }

  // Pushing values to buckets
  array.forEach(currentVal => {
    allBuckets[Math.floor((currentVal - min) / bucketSize)].push(currentVal);
  });

  // Sorting buckets
  array.length = 0;

  allBuckets.forEach(bucket => {
    insertionSort(bucket);
    bucket.forEach(element => {
      array.push(element);
    });
  });

  return array;
}

function main() {
  // mergeSort(STORE.dataset1);
  // console.log(STORE.dataset1);
  // mergeSort(STORE.dataset2);
  // console.log(STORE.dataset2);
  // quickSort(STORE.dataset2);
  // console.log(STORE.dataset2);
  // const numericalList = new LinkedList();
  // numericalList.insertLast(9);
  // numericalList.insertLast(1);
  // numericalList.insertLast(7);
  // numericalList.insertLast(3);
  // numericalList.insertLast(7);
  // numericalList.insertLast(1);
  // numericalList.insertLast(4);
  // numericalList.insertLast(1);
  // const sortedList = mergeSortList(numericalList);
  // display(sortedList);
  const sortedArr = bucketSort(STORE.dataset2, 1, 98);
  console.log(sortedArr);
  // const sequentialNumbers = [];
  // for (let i = 1; i <= 50; i++) {
  //   sequentialNumbers.push(i);
  // }
  // const randomArr = randomizeArray(sequentialNumbers);
  // console.log(randomArr);
}

main();

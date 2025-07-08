let arr = [];

function generateArray() {
  arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100) + 1);
  }
  displayArray();
  document.getElementById("explanation").innerHTML = "Generated a new random array.";
}

function displayArray(highlightedIndices = []) {
  const container = document.getElementById("array");
  container.innerHTML = '';
  arr.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3}px`;
    if (highlightedIndices.includes(index)) {
      bar.style.backgroundColor = "red";
    }
    container.appendChild(bar);
  });
}

async function runAlgorithm() {
  const algo = document.getElementById("algorithm").value;
  if (algo === "bubble") {
    explain("Bubble Sort", "Compares adjacent elements and swaps them if they are in wrong order. Repeats until sorted.");
    await bubbleSort();
  }
  else if (algo === "selection") {
    explain("Selection Sort", "Finds the minimum element from unsorted part and swaps it with first unsorted element.");
    await selectionSort();
  }
  else if (algo === "insertion") {
    explain("Insertion Sort", "Builds sorted array one element at a time by inserting each into correct position.");
    await insertionSort();
  }
  else if (algo === "quick") {
    explain("Quick Sort", "Picks a pivot, partitions array around pivot, recursively sorts partitions.");
    await quickSort(0, arr.length - 1);
  }
  else if (algo === "merge") {
    explain("Merge Sort", "Divides array into halves, sorts and merges them recursively.");
    await mergeSort(0, arr.length - 1);
  }
  else if (algo === "linear") {
    explain("Linear Search", "Searches for an element by checking each item sequentially.");
    await linearSearch();
  }
  else if (algo === "binary") {
    explain("Binary Search", "Searches a sorted array by repeatedly dividing search interval in half.");
    await binarySearch();
  }
}

function explain(title, desc) {
  document.getElementById("explanation").innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
}

// Utility sleep for animation
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 🔹 Bubble Sort
async function bubbleSort() {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        displayArray([j, j + 1]);
        await sleep(100);
      }
    }
  }
}

// 🔹 Selection Sort
async function selectionSort() {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
      displayArray([min, j]);
      await sleep(50);
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
    displayArray([i, min]);
    await sleep(100);
  }
}

// 🔹 Insertion Sort
async function insertionSort() {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      displayArray([j + 1]);
      await sleep(100);
    }
    arr[j + 1] = key;
    displayArray([j + 1]);
    await sleep(100);
  }
}

// 🔹 Quick Sort
async function quickSort(start, end) {
  if (start < end) {
    let pi = await partition(start, end);
    await quickSort(start, pi - 1);
    await quickSort(pi + 1, end);
  }
}

async function partition(start, end) {
  let pivot = arr[end];
  let i = start - 1;
  for (let j = start; j < end; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      displayArray([i, j]);
      await sleep(100);
    }
  }
  [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
  displayArray([i + 1, end]);
  await sleep(100);
  return i + 1;
}

// 🔹 Merge Sort
async function mergeSort(start, end) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
  }
}

async function merge(start, mid, end) {
  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
    displayArray([k - 1]);
    await sleep(100);
  }

  while (i < left.length) {
    arr[k++] = left[i++];
    displayArray([k - 1]);
    await sleep(100);
  }

  while (j < right.length) {
    arr[k++] = right[j++];
    displayArray([k - 1]);
    await sleep(100);
  }
}

// 🔹 Linear Search
async function linearSearch() {
  const key = parseInt(document.getElementById("searchKey").value);
  for (let i = 0; i < arr.length; i++) {
    displayArray([i]);
    await sleep(200);
    if (arr[i] === key) {
      alert(`Key ${key} found at index ${i}`);
      return;
    }
  }
  alert(`Key ${key} not found`);
}

// 🔹 Binary Search
async function binarySearch() {
  arr.sort((a, b) => a - b); // Ensure sorted array
  displayArray();
  const key = parseInt(document.getElementById("searchKey").value);
  let start = 0, end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    displayArray([mid]);
    await sleep(500);
    if (arr[mid] === key) {
      alert(`Key ${key} found at index ${mid}`);
      return;
    } else if (arr[mid] < key) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  alert(`Key ${key} not found`);
}

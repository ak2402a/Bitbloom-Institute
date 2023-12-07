// Declare global variables
let array = [];
let ARRAY_SIZE = 10; // Initial array size
let header;
let sticky;

// Function to handle the sticky header
function myStickyFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
// Function to handle tab switching
function openTab(tabName, elmnt) {
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  var tablinks = document.getElementsByClassName("tablink");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  document.getElementById(tabName).style.display = "block";
  elmnt.style.backgroundColor = '#F8B195';
  
  if (tabName === 'Sorting') {
    generateArray();
  }
}
// Event listener for DOM content loaded to handle tab and typewriter effects, and sorting functionalities
document.addEventListener('DOMContentLoaded', (event) => {
  // Initialize sticky header
  header = document.getElementById("myHeader");
  sticky = header.offsetTop;

  // Typewriter effect
  initiateTypewriterEffect();

  // Event listener for changing the algorithm selection
  const algorithmSelect = document.getElementById("algorithmComplexity");
  if (algorithmSelect) {
    algorithmSelect.addEventListener('change', displayComplexity);
  }

  // Get the element with id="defaultOpen" and click on it to open the default tab
  var defaultOpen = document.getElementById("defaultOpen");
  if (defaultOpen) {
    defaultOpen.click();
  }

  // Initialize the array container
  const arrayContainer = document.getElementById('array');
  if (arrayContainer) {
    generateArray();
  }

  // Attach click event listeners to bubbles
  document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('click', () => {
      // Logic to handle bubble click...
    });
  });

  // Scroll event for sticky header
  window.onscroll = myStickyFunction;
});

function toggleVisibility(pseudoCodeId) {
  var pseudoCode = document.getElementById(pseudoCodeId);
  if (pseudoCode.style.display === "none") {
      pseudoCode.style.display = "block";
  } else {
      pseudoCode.style.display = "none";
  }
}


// Typewriter effect logic
function initiateTypewriterEffect() {
  var text = "Welcome, to the BitBloom Institute!";
  var container = document.querySelector('.typewriter .text');
  var cursor = document.querySelector('.typewriter .blinking-cursor');
  var index = 0;
  var typingSpeed = 100;

  function type() {
    if (index < text.length) {
      container.textContent += text.charAt(index);
      index++;
      setTimeout(type, typingSpeed);
    } else {
      cursor.style.animation = 'blink-cursor 0.75s steps(1) infinite normal';
    }
  }

  cursor.style.animation = 'blink-cursor 0.75s steps(1) infinite normal';
  setTimeout(type, 200); // Start typing after the cursor blinks
}

// Function to generate an array with random values and create bars for them
function generateArray() {
  array = [];
  const arrayContainer = document.getElementById('array');
  arrayContainer.innerHTML = '';

  for (let i = 0; i < ARRAY_SIZE; i++) {
    array[i] = Math.floor(Math.random() * 100) + 1;
    const bar = document.createElement('div');
    bar.style.height = `${array[i] * 3}px`;
    bar.classList.add('bar');
    arrayContainer.appendChild(bar);
  }
}

// Function to update the array size and regenerate the array
function updateArraySize() {
  const sizeInput = document.getElementById('arraySize');
  let inputSize = parseInt(sizeInput.value);

  // Check if the input is a number and enforce the maximum value of 20
  ARRAY_SIZE = Number.isNaN(inputSize) ? 10 : Math.min(inputSize, 20);

  generateArray();
}


// Function to display the complexity when a sorting algorithm is selected
function displayComplexity() {
  // Get the selected value from the dropdown
  var algorithmSelect = document.getElementById("algorithmComplexity");
  var selectedValue = algorithmSelect.value;
  
  // Hide all algorithm descriptions
  var descriptions = document.getElementsByClassName('algorithm-description');
  for (var i = 0; i < descriptions.length; i++) {
    descriptions[i].style.display = 'none';
  }
  
  // Check if a value is selected
  if (selectedValue) {
    // Construct the ID of the description bubble
    var bubbleId = 'bubble' + selectedValue; // The ID is case-sensitive
    
    // Attempt to get the bubble element
    var selectedBubble = document.getElementById(bubbleId);
    if (selectedBubble) {
      // Display the bubble
      selectedBubble.style.display = 'block';
    } else {
      console.error('Bubble element not found for ID:', bubbleId);
    }
  }
}

/// The Bubble Sort algorithm with added visualization logic
async function bubbleSort() {
  if (!array.length) return; // Do not sort if the array is not generated
  let sorted = false; // To check if the array is already sorted

  while (!sorted) {
    sorted = true; // Assume the array is sorted

    for (let j = 0; j < ARRAY_SIZE - 1; j++) {
      const bars = document.getElementsByClassName('bar');
      bars[j].classList.add('comparing');
      bars[j + 1].classList.add('comparing');

      // Compare and swap elements if they are in the wrong order
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        bars[j].style.height = `${array[j] * 3}px`;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;

        sorted = false; // Since we had to swap, the array was not sorted

        // Delay for visualization
        await new Promise(resolve =>
          setTimeout(() => {
            bars[j].classList.remove('comparing');
            bars[j + 1].classList.remove('comparing');
            resolve();
          }, 100)
        );

        break; // Break after one swap to mimic the selection sort behavior
      } else {
        // Delay for visualization even if no swap was made
        await new Promise(resolve =>
          setTimeout(() => {
            bars[j].classList.remove('comparing');
            bars[j + 1].classList.remove('comparing');
            resolve();
          }, 100)
        );
      }
    }
  }

  // Once sorted, visually mark all as sorted
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < ARRAY_SIZE; i++) {
    bars[i].classList.add('sorted');
  }
}


// The Selection Sort algorithm with added visualization logic
async function selectionSort() {
  if (!array.length) return; // Do not sort if the array is not generated
  const bars = document.getElementsByClassName('bar');
  
  for (let i = 0; i < ARRAY_SIZE - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < ARRAY_SIZE; j++) {
      bars[j].classList.add('comparing');
      
      // Find the minimum element in the unsorted array
      if (array[j] < array[minIndex]) {
        if (minIndex !== i) {
          // Remove previous min comparison
          bars[minIndex].classList.remove('comparing');
        }
        minIndex = j;
      }

      // Delay for visualization
      await new Promise(resolve =>
        setTimeout(() => {
          bars[j].classList.remove('comparing');
          resolve();
        }, 100)
      );
    }

    if (minIndex !== i) {
      // Swap the found minimum element with the first element
      let temp = array[minIndex];
      array[minIndex] = array[i];
      array[i] = temp;

      bars[i].style.height = `${array[i] * 3}px`;
      bars[minIndex].style.height = `${array[minIndex] * 3}px`;
      bars[minIndex].classList.remove('comparing');
    }

    bars[i].classList.add('sorted');
  }
  
}

// The Insertion Sort algorithm with added visualization logic
async function insertionSort() {
  if (!array.length) return; // Do not sort if the array is not generated
  const bars = document.getElementsByClassName('bar');

  for (let i = 1; i < ARRAY_SIZE; i++) {
    let key = array[i];
    let j = i - 1;

    // Visualize the current element to be inserted
    bars[i].classList.add('selected');

    // Move elements of array[0..i-1], that are greater than key, to one position ahead of their current position
    while (j >= 0 && array[j] > key) {
      bars[j + 1].classList.add('comparing'); // Mark the bar being compared

      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1] * 3}px`;

      // Delay for visualization
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, 100)
      );

      bars[j + 1].classList.remove('comparing'); // Remove the comparison mark
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key * 3}px`;

    // Delay to visualize the insertion
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 100)
    );

    // Clear the 'selected' class from all bars and then add 'sorted' to the sorted part
    for (let k = 0; k <= i; k++) {
      bars[k].classList.remove('selected');
      bars[k].classList.add('sorted');
    }
  }
}


// This function starts the merge sort process with the global array and visualizes it
async function startMergeSort() {
  await mergeSort(array, 0, array.length - 1);
  // You might want to add some code here to handle what happens after sorting is done.
}

async function mergeSort(array, start, end, delay = 100) {
  if (start < end) {
    let middle = Math.floor((start + end) / 2);
    await mergeSort(array, start, middle, delay);
    await mergeSort(array, middle + 1, end, delay);
    await merge(array, start, middle, end, delay);
  }
}

async function merge(array, start, middle, end, delay) {
  let n1 = middle - start + 1;
  let n2 = end - middle;
  let left = new Array(n1);
  let right = new Array(n2);

  for (let i = 0; i < n1; i++)
    left[i] = array[start + i];
  for (let j = 0; j < n2; j++)
    right[j] = array[middle + 1 + j];

  let i = 0, j = 0, k = start;
  while (i < n1 && j < n2) {
    if (left[i] <= right[j]) {
      array[k] = left[i];
      i++;
    } else {
      array[k] = right[j];
      j++;
    }
    await visualizeBars(array, k, delay);
    k++;
  }

  while (i < n1) {
    array[k] = left[i];
    await visualizeBars(array, k, delay);
    i++;
    k++;
  }

  while (j < n2) {
    array[k] = right[j];
    await visualizeBars(array, k, delay);
    j++;
    k++;
  }
  
}

// This function visualizes the sorting process
async function visualizeBars(array, index, delay) {
  const bars = document.querySelectorAll('.bar');
  bars[index].style.height = `${array[index] * 3}px`;
  bars[index].classList.add('comparing'); // Apply a visual effect for comparing
  
  // Wait for 'delay' milliseconds
  await new Promise(resolve => setTimeout(resolve, delay));
  
  bars[index].classList.remove('comparing'); // Remove visual effect after comparison
}

// Quick sort algorithm
async function quickSort(array, start, end, delay = 100) {
  if (start < end) {
    let index = await partition(array, start, end, delay);

    // Before index
    await quickSort(array, start, index - 1, delay);
    // After index
    await quickSort(array, index + 1, end, delay);
  }
}

async function partition(array, start, end, delay) {
  let pivot = array[end];
  let i = (start - 1);  // Index of smaller element

  for (let j = start; j < end; j++) {
    // If current element is smaller than or equal to pivot
    if (array[j] <= pivot) {
      i++;

      let swap = array[i];
      array[i] = array[j];
      array[j] = swap;

      await visualizeBars(array, i, delay); // Visualization logic
    }
  }

  // Swap array[i + 1] and array[end] (or pivot)
  let swap = array[i + 1];
  array[i + 1] = array[end];
  array[end] = swap;

  await visualizeBars(array, i + 1, delay); // Visualization logic

  return i + 1;
}

// Wrapper function to start the quick sort
async function startQuickSort() {
  await quickSort(array, 0, array.length - 1);
  // Code to handle post-sort actions here
}


// Heap Sort logic with visualization
async function heapSort(array, delay = 100) {
  let n = array.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(array, n, i, delay);
  }

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    await visualizeBars(array, i, delay); // Visualization logic

    // call max heapify on the reduced heap
    await heapify(array, i, 0, delay);
  }
}

// To heapify a subtree rooted with node i which is an index in array[]
async function heapify(array, n, i, delay) {
  let largest = i; // Initialize largest as root
  let left = 2 * i + 1; // left = 2*i + 1
  let right = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest != i) {
    let swap = array[i];
    array[i] = array[largest];
    array[largest] = swap;

    await visualizeBars(array, i, delay); // Visualization logic

    // Recursively heapify the affected sub-tree
    await heapify(array, n, largest, delay);
  }
}

// Wrapper function to start the heap sort
async function startHeapSort() {
  await heapSort(array);
  // Code to handle post-sort actions here
}


//JS FOR DATA STRUCTURES

document.getElementById('runButton').addEventListener('click', function() {
  var selectedDataStructure = document.getElementById('dataStructureSelect').value;
  var numberOfElements = parseInt(document.getElementById('numElements').value) || 4; // Default to 4 elements
  visualizeDataStructure(selectedDataStructure, numberOfElements);
});

function visualizeDataStructure(dataStructure, numberOfElements) {
  var visualizationContainer = document.getElementById('visualization');
  visualizationContainer.innerHTML = ''; // Clear previous visualization

  var elementsContainer = document.createElement('div');
  elementsContainer.className = 'elements-container ' + dataStructure;
  visualizationContainer.appendChild(elementsContainer);

  // Initial elements for the data structure
  for (let i = 1; i <= numberOfElements; i++) {
      var elementDiv = document.createElement('div');
      elementDiv.className = 'element';
      elementDiv.textContent = `Element ${i}`;
      if (dataStructure === 'stack') {
          // For stack, prepend to simulate stack behavior
          elementsContainer.prepend(elementDiv);
      } else {
          // For other structures, append
          elementsContainer.appendChild(elementDiv);
      }
  }

  // Create a mock new element
  var newElementDiv = document.createElement('div');
  newElementDiv.className = 'element new-element';
  newElementDiv.textContent = 'New Element';

  // Add the new element based on the data structure
  if (dataStructure === 'stack') {
    // For stack, add the new element to the top (visually on top of "Element 4")
    elementsContainer.prepend(newElementDiv);

    // Remove the top element (newly added element) after a delay
    setTimeout(function() {
        elementsContainer.removeChild(elementsContainer.firstChild);
    }, 2000); // Delay of 2 seconds
  } else {
      // For other data structures (array, linkedlist, queue), add the new element to the end
      elementsContainer.appendChild(newElementDiv);

      // Remove the new element from the end after a delay
      setTimeout(function() {
          elementsContainer.removeChild(newElementDiv);
      }, 2000); // Delay of 2 seconds
  }
}

// JS FOR SDLC
function performOperation(operation) {
  var input1 = document.getElementById('input1').value;
  var input2 = document.getElementById('input2').value;

  // Convert binary inputs to integers
  var num1 = parseInt(input1, 2);
  var num2 = parseInt(input2, 2);

  var result;
  switch (operation) {
      case '&':
          result = num1 & num2;
          break;
      case '|':
          result = num1 | num2;
          break;
      case '^':
          result = num1 ^ num2;
          break;
      case '<<':
          result = num1 << num2;
          break;
      case '>>':
          result = num1 >> num2;
          break;
      default:
          result = "Invalid operation";
  }

  // Convert the result back to binary
  var binaryResult = result.toString(2);

  document.getElementById('result').innerText = "Binary Result: " + binaryResult;
  document.getElementById('result2').innerText = "Integer Result: " + result;
}

function convertBinaryToInteger() {
  var binaryInput = document.getElementById('binaryInput').value;

  // Validate binary input
  if (!/^[01]+$/.test(binaryInput)) {
      alert("Please enter a valid binary number");
      return;
  }

  var integerResult = parseInt(binaryInput, 2);
  document.getElementById('binaryToIntegerResult').innerText = "Integer Result: " + integerResult;
}

function convertIntegerToBinary() {
  var integerInput = document.getElementById('integerInput').value;
  var binaryResult = parseInt(integerInput).toString(2);
  document.getElementById('integerToBinaryResult').innerText = "Binary Result: " + binaryResult;
}



const generate = document.getElementById("btn");
const bars_container = document.getElementById("container");
const sort_button = document.getElementById("sort_btn");
const range = document.getElementById("range_input");
const speedSelector = document.getElementById("options");

let minRange = 20;
let maxRange = 100;
let speedFactor = 100;
let size = (range.value / 4) + 15;
let array = [];

document.addEventListener("DOMContentLoaded", () => {
    array = createRandomArray(size);
    renderBars(array);
});

sort_button.addEventListener("click", () => {
    bubbleSort();
    // console.log(array);
    // mergeSort(0,array.length);
    // bars_container.innerHTML = "";
    // console.log(array);
    // renderBars(array);
});

range.addEventListener("input", () => {
    size = (range.value / 4) + 15;
    array = createRandomArray();
    bars_container.innerHTML = "";
    renderBars(array);
});

generate.addEventListener("click", () => {
    array = createRandomArray();
    bars_container.innerHTML = "";
    renderBars(array);
});

speedSelector.addEventListener("change", (e) => {
    speedFactor = parseInt(e.target.value);
});

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
    let array = [];
    for (let i = 0; i < size; i++) {
        array[i] = generateRandom(minRange, maxRange);
    }
    return array;
}

function renderBars(array) {
    let count = 0;
    array.forEach(element => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.id = `${count++}`;
        bar.style.height = element * 2 + "px";
        bars_container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bar_1 = document.getElementById(`${j}`);
            bar_2 = document.getElementById(`${j + 1}`);
            bar_2.style.background = "blue";
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bar_1.style.height = array[j] * 2 + "px";
                bar_2.style.height = array[j + 1] * 2 + "px";
            }
            await sleep(speedFactor);
            bar_1.style.background = "#1527d1";
        }
        last_bar = document.getElementById(`${array.length - i - 1}`);
        last_bar.style.background = "green";
    }
}

function merge(low, mid, high) {
    let L = [];
    let R = [];
    for (let i = low; i < mid; i++) {
        L[i - low] = array[i];
    }
    for (let i = mid; i < high; i++) {
        R[i - mid] = array[i];
    }
    let left = 0, right = 0, ind = low;
    while (left < L.length && right < R.length){
        if (L[left] < R[right]) {
            array[ind] = L[left];
            left++;
        } else {
            array[ind] = R[right];
            right++;
        }
        ind++;
    }
    while (left < L.length){
        array[ind] = L[left];
        ind++, left++;
    }
    while (right < R.length){
        array[ind] = R[right];
        ind++, right++;
    }
}

function mergeSort(low, high) {
    if (high <= low) {
        return;
    } else if (high - low === 1){
        if (array[low] > array[high]){
            let temp = array[low];
            array[low] = array[high];
            array[high] = temp;
        }
    }
    let mid = Math.floor(low + (high - low)/2);
    mergeSort(low, mid);
    mergeSort(mid + 1, high);
    merge(low, mid, high);
}
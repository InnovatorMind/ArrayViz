
const container = document.getElementById('container');
const submitBtn = document.querySelector('#submitVal');
const inputBox = document.getElementById('inputBox');
const crossIcon = document.querySelector('.cross');
const addBtn = document.getElementById('addBtn');
const addMulBtn = document.getElementById('addMulBtn');
const removeBtn = document.getElementById('remove');
const removeAllBtn = document.getElementById('removeAll');

let indexVal = 0;
let inputMode = 'single';

// Functions for UI control
function showInputBox(mode = 'single') {
    inputMode = mode; 
    inputBox.style.visibility = 'visible';
    document.getElementById('inputValue').focus();
}

// Event listener for 'Enter' key, added once
const inputField = document.querySelector('#inputValue');
inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitBtn.click();  
    }
});

function submitValue() {
    const value = document.getElementById('inputValue').value.trim();

    if (inputMode === 'single') {
        // Handle single integer input
        const intValue = parseInt(value, 10);
        if (isNaN(intValue) || !Number.isInteger(intValue)) {
            alert('Please enter a valid integer value.');
            return; 
        }
        createElement(intValue); 
    } else if (inputMode === 'multiple') {
        // Handle multiple integer input (space-separated, clean up multiple spaces)
        const cleanedValue = value.replace(/\s+/g, ' '); 
        const values = cleanedValue.split(' ').map(v => parseInt(v.trim(), 10));
        const invalidValues = values.filter(v => isNaN(v) || !Number.isInteger(v));
        if (invalidValues.length > 0) {
            alert('Please enter valid integers separated by spaces.');
            return; 
        }
        values.forEach(createElement); 
    }

    hideInputBox();
    document.getElementById('inputValue').value = ''; 
}

function hideInputBox() {
    inputBox.style.visibility = 'hidden';
}


// Add Element
function createElement(value) {
    if (indexVal == 0) {
        container.innerHTML='';
    }
    
    const eleBox = document.createElement('div');
    eleBox.className = 'eleBox';
    
    const charSpace = createCharacterSpace();
    const element = createValueBox(value);
    const index = createIndexBox(indexVal);

    //Appending Nodes
    eleBox.append(charSpace, element, index);
    container.appendChild(eleBox);
    indexVal++;  // Increment index
}

//---------EleBox emements-----------------------------//
// Create character space
function createCharacterSpace() {
    const charSpace = document.createElement('div');
    charSpace.className = 'charSpace';
    // const img = document.createElement('img');
    // img.src = 'assets/character1.png';
    // img.alt = 'character';
    // charSpace.appendChild(img);
    
    return charSpace;
}

// Create value box
function createValueBox(value) {
    const element = document.createElement('div');
    element.className = 'element';
    element.innerText = value;
    return element;
}

// Create index box
function createIndexBox(indexVal) {
    const index = document.createElement('div');
    index.className = 'index';
    index.innerText = indexVal;
    return index;
}
//-------------------------------------------------------//


// Remove Element 
function removeLastElement() {
    if (container.lastChild) {
        container.removeChild(container.lastChild);
        indexVal--; 
    }
}

function removeAllElement() {
    container.innerHTML='';
    indexVal=0
}



// Event Listeners
addBtn.addEventListener('click', () => showInputBox('single')); 
addMulBtn.addEventListener('click', () => showInputBox('multiple'));
removeBtn.addEventListener('click', removeLastElement);
removeAllBtn.addEventListener('click', removeAllElement);

submitBtn.addEventListener('click', submitValue);
crossIcon.addEventListener('click', hideInputBox);

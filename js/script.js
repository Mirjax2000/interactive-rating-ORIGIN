/** @format */

// --- main elements---
let form = document.querySelector('#form');
let spanNum = document.querySelector('.num');
let thanks = document.querySelector('.thanks');
let spanArray = document.querySelector('.array');
let content = document.querySelector('.content');
let completCheckbox = document.querySelectorAll('.content-checkbox');

// --- only one rule them all ---
completCheckbox.forEach(function (checkbox) {
    checkbox.addEventListener('click', function (event) {
        completCheckbox.forEach(function (otherCheckbox) {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });
    });
});

// --- state getter and declaring
let contentState = getComputedStyle(content);
let thanksState = getComputedStyle(thanks);
contentState = contentState.display;
thanksState = thanksState.display;

// --- default settings: checking state when pages loading
if (contentState === 'block') {
    thanks.style.display = 'none';
} else {
    thanks.style.display = 'block';
}

// --- submit form getter ---
form.addEventListener('submit', function (event) {
    let array = [];
    event.preventDefault();

    completCheckbox.forEach(function (num) {
        array.push(num.checked);
    });

    let vypis = array.indexOf(true);

    thanks.style.display = 'block';
    content.style.display = 'none';
    spanNum.textContent = vypis + 1;
    spanArray.textContent = array.length;
});

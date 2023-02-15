/** @format */

let form = document.querySelector('#form');
let numSpan = document.querySelector('.num');
let thanks = document.querySelector('.thanks');
let content = document.querySelector('.content');
let rating = document.getElementsByName('rating');
let contentSubmit = document.querySelector('.content-submit');

rating.forEach(function (item) {
    item.addEventListener('click', function (event) {
        contentSubmit.removeAttribute('disabled');
    });
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    content.classList.add('hidden');
    thanks.classList.remove('hidden');
    numSpan.textContent = event.target.rating.value;
});

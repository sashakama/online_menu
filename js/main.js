'use strict';


const cartInfo = document.querySelector('.top-cart-info-container');//обертка корзины
const formBLock = document.querySelector('.form-order');
formBLock.style.display = 'none';
const form = document.querySelector('form');
const formInputs = document.querySelectorAll('input');
const regExName = /[A-Za-zА-Яа-яЁё]{3,16}/;
const regExEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;

let isValidate = false;



document.addEventListener('click', function (event) {

    let counter;

    if (event.target.classList.contains('qty__btn-minus') || event.target.classList.contains('qty__btn-plus')) {
        const counterWrapper = event.target.closest('.qty');
        counter = counterWrapper.querySelector('.qty__item');

    }
    if (event.target.classList.contains('qty__btn-minus')) {
        if (parseInt(counter.value) > 0) {
            counter.value = --counter.value;
        }
    }
    if (event.target.classList.contains('qty__btn-plus')) {
        counter.value = ++counter.value;
    }

    if (event.target.classList.contains('product-box__btn')) {
        const productBox = event.target.closest('.product-box__meta');

        //all inform. item is collected in Object
        const productInfo = {
            id: productBox.dataset.id,
            counter: productBox.querySelector('.qty__item').value,
            price: productBox.querySelector('p').innerText,
        };

        const qtyItems = cartInfo.querySelector('[data-product]');
        const priceItems = cartInfo.querySelector('[data-sum]');

        const priceOfIt = parseInt(productInfo.price);
        const countOfIt = parseInt(productInfo.counter);
        let currentPrice = priceOfIt * countOfIt;


        priceItems.innerText = parseInt(priceItems.innerText) + currentPrice;
        qtyItems.innerText = parseInt(qtyItems.innerText) + parseInt(productInfo.counter);
        productBox.querySelector('.qty__item').value = '0';//сбрасываем счетчик

    }

    if (event.target.id === 'btn-top') {
        formBLock.style.display = 'inline-block';

    }

});

document.addEventListener('keyup', function (event) {
    if (event.code === 'Escape') {
        formBLock.style.display = 'none';
    }
})


/*document.addEventListener('keyup', function (event) {
    const key = event.key;
    if (key === 'Escape') {
        formBLock.style.display = 'none';
    }
})*/

//valid form

const submit = function () {
    alert('Спасибо за покупку');
}

form.addEventListener('submit', function (event) {
    event.preventDefault(); //блокировка стандартного поведение браузера
    for (let elem of form.elements) {
        if (elem.tagName != 'BUTTON') {
            if (elem.name === 'userName') {
                if (elem.value === '' || !regExName.test(elem.value)) {
                    elem.style.border = '2px solid red';
                    isValidate = false;
                }
                else {
                    elem.style.border = 'none';
                    isValidate = true;
                }
            }
            if (elem.name === 'userEmail') {
                if (elem.value === '' || !regExEmail.test(elem.value)) {
                    elem.style.border = '2px solid red';
                    isValidate = false;
                }
                else {
                    elem.style.border = 'none';
                    isValidate = true;
                }
            }
        }
    }

    if (isValidate) {
        submit();
        form.reset();
        formBLock.style.display = 'none';
        document.querySelector('[data-product]').innerText = '0';
        document.querySelector('[data-sum]').innerText = '0';

    }
})

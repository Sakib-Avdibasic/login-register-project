'use strict';

// ---UI---

const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');

loginSection.addEventListener('click', () => {
	loginSection.classList.remove('hidden');
	registerSection.classList.add('hidden');
});

registerSection.addEventListener('click', () => {
	registerSection.classList.remove('hidden');
	loginSection.classList.add('hidden');
});

// ---FORM VALIDATION---

const addError = (inputEl, errorTxt) => {
	if (inputEl.nextElementSibling.textContent != errorTxt) {
		removeError(inputEl);
		const errorEl = document.createElement('span');
		errorEl.textContent = errorTxt;
		errorEl.classList.add('error');

		inputEl.parentNode.insertBefore(errorEl, inputEl.nextElementSibling);
	}
};

const removeError = inputEl => {
	if (inputEl.nextElementSibling.classList.contains('error')) {
		inputEl.nextElementSibling.remove();
	}
};

const checkBirth = e => {
	const today = new Date();
	const birthDate = new Date(e.target.value);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	if (age < 18) addError(inputBirth, 'You must be 18 to register');
	else removeError(inputBirth);
};

const checkEmail = e => {
	if (!e.target.value.match(/^\S+@\S+\.\S+$/))
		addError(inputEmail, 'Invalid email address');
	else removeError(inputEmail);
};

const checkPhone = e => {
	if (!e.target.value.match(/^\d{3} \d{3} \d{3,4}$/))
		addError(inputPhone, 'Invalid number format');
	else removeError(inputPhone);
};

document
	.querySelectorAll("input[type='text'], input[type='password']")
	.forEach(input => {
		input.addEventListener('input', () => {
			if (input.value == '') addError(input, 'Please fill out this field');
			else removeError(input);
		});
	});

const inputBirth = document.getElementById('birthdate');
inputBirth.addEventListener('change', function (e) {
	checkBirth(e);
	inputBirth.removeEventListener('change', this);
	inputBirth.addEventListener('input', checkBirth);
});

const inputEmail = document.getElementById('email');
inputEmail.addEventListener('change', function (e) {
	checkEmail(e);
	inputEmail.removeEventListener('change', this);
	inputEmail.addEventListener('input', checkEmail);
});

const inputPhone = document.getElementById('phone');
inputPhone.addEventListener('change', function (e) {
	checkPhone(e);
	inputPhone.removeEventListener('change', this);
	inputPhone.addEventListener('input', checkPhone);
});

document.querySelectorAll('form').forEach(form =>
	form.addEventListener('submit', e => {
		e.target.querySelectorAll('input').forEach(input => {
			if (input.value == '') {
				e.preventDefault();
				addError(input, 'Please fill out this field');
			}
		});

		if (e.target.getElementsByClassName('error').length > 0) e.preventDefault();
	})
);

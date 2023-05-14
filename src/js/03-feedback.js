import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const restoreFormState = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  let formData;

  if (savedData) {
    formData = JSON.parse(savedData);
  } else {
    formData = { email: '', message: '' };
  }

  emailInput.value = formData.email;
  messageInput.value = formData.message;
};

function clearFormState() {
  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
}

const throttledSaveFormState = throttle(saveFormState, 500);

const handleSubmit = (e) => {
  e.preventDefault();

  const emailValue = emailInput.value;
  const messageValue = messageInput.value;

  if (emailValue && messageValue) {
    console.log('Form submitted:', { email: emailValue, message: messageValue });
    clearFormState();
  } else {
    alert('Fill in all the fields');
  }
};

form.addEventListener('input', throttledSaveFormState);
form.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', restoreFormState);


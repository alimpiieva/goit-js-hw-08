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
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
};

const clearFormState = () => {
  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
};

const throttledSaveFormState = throttle(saveFormState, 500);

form.addEventListener('input', throttledSaveFormState);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form submitted:', {
    email: emailInput.value,
    message: messageInput.value,
  });
  clearFormState();
});

document.addEventListener('DOMContentLoaded', restoreFormState);
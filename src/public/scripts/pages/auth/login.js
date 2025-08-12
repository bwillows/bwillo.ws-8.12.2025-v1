const form = document.querySelector("#login-form");

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Stop the form from actually submitting
  let form_data = new FormData(form);

  let email = form_data.get('email');
  let password = form_data.get('password');


  // VALIDATE
});
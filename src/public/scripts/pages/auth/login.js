import { validate_email_format } from "../../validate";

const form = document.querySelector("#login-form");

form.addEventListener('submit', (event) => {
  console.log("event");
  event.preventDefault(); // Stop the form from actually submitting
  let form_data = new FormData(form);

  let email = form_data.get('email');
  console.log(email);
  let password = form_data.get(
    'password');

  if(!validate_email_format(email)) {
    console.log("invalid email");
    if(alert_login_result.classList.contains("hidden")) {
      alert_login_result.classList.remove("hidden");
    }
    alert_login_result_inner_text.innerText = "Please enter a valid email address.";
  }


  // VALIDATE
});
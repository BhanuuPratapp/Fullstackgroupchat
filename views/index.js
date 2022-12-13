//const token = localStorage.getItem('token');
/*
const form=document.getElementById('container')
form.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.className=="forgotbutton"){
        window.location.replace('./forgotpassword.html')

    }

})
  */ 
function userDetails(event) {
    
    event.preventDefault();
    const username = event.target.signupUsername.value;
  
    const email = event.target.signupEmail.value;

    const phone = event.target.signupPhoneNo.value;

    const password = event.target.signupPassword.value;
              
    const obj = {

        username,
        email,
        phone,
        password,
        
    }
   
  axios.post("http://localhost:9000/user/sign-up",obj)
   .then((response) =>{
    
    if(response.status === 201)
    {
      alert(response.data.message)
    console.log(response)
    }

  })
   .catch((err) => {
   
   console.log(err)
   
   })
 
}


function  loginDetails(event){
    event.preventDefault();
    
  
    const email = event.target.loginEmail.value;

    const password = event.target.loginPassword.value;
              
    const obj = {

       
        email,
        password,
        
    }
    axios.post("http://localhost:9000/user/log-in", obj)
    .then(result =>{
        if(result.status === 201){
          console.log("result",result)
          alert(result.data.message)
           localStorage.setItem('token', result.data.token);
        window.location.replace("./chatapp.html")
        }
    }
        )
    .catch(err => console.log(err))
}
const forgotpassword=document.getElementById('linkForgotPassword')
forgotpassword.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.className=="form__link"){
        window.location.replace('./forgotpassword.html')

    }

})
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

       // setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


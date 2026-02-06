const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const msg = document.getElementById("msg");

const welcomeBox = document.getElementById("welcomeBox");
const authCard = document.querySelector(".auth-card");


loginTab.onclick = () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");

  loginForm.classList.remove("hide");
  registerForm.classList.add("hide");

  msg.textContent = "";
};

registerTab.onclick = () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");

  registerForm.classList.remove("hide");
  loginForm.classList.add("hide");

  msg.textContent = "";
};


function register() {

  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;

  if (!user || !pass) {
    msg.style.color = "red";
    msg.textContent = "Fill all fields";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[user]) {
    msg.textContent = "User already exists";
    return;
  }

  users[user] = pass;
  localStorage.setItem("users", JSON.stringify(users));

  msg.style.color = "green";
  msg.textContent = "Registered successfully";

}


function login() {

  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[user] === pass) {

    authCard.style.display = "none";
    welcomeBox.style.display = "block";

  } else {

    msg.style.color = "red";
    msg.textContent = "Wrong login details";

  }

}


function logout() {

  welcomeBox.style.display = "none";
  authCard.style.display = "block";

}

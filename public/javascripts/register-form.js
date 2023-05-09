const registerErrorTooltip = document.getElementById("register-error");
const signinBtn = document.getElementById("signin-btn");

const pageError = new URLSearchParams(location.search);
const params = Object.fromEntries(pageError.entries());

if (!!params.errorMessage) {
  registerErrorTooltip.classList.remove("d-none");
  registerErrorTooltip.innerText = params.errorMessage;
}

signinBtn.onclick = (e) => {
  location.href =
    location.origin + location.pathname.replace("/register", "/login");
};

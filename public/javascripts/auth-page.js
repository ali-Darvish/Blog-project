const renderAuthPage = () => {
  $("#message-card").hide();
  $("#form-card").hide();
  $("#error-tooltip").hide();
  $("#register-message-card").hide().animate({ left: "-2000" });
  $("#register-form-card").hide().animate({ left: "2000" });

  $("#message-card").fadeIn(500).animate({ bottom: "50" });
  $("#form-card").fadeIn(500).animate({ top: "50" });
};

const renderLoginPage = () => {
  $("#register-form-card").animate({ top: "0" }, 500);
  $("#register-message-card").animate({ top: "0" }, 500);
  $("#register-form-card").animate({ left: "2000" }, 500).fadeOut(500);
  $("#register-message-card").animate({ left: "-2000" }, 500).fadeOut(500);
  $("#form-card").fadeIn(500).animate({ top: "50" }, 500);
  $("#message-card").fadeIn(500).animate({ top: "-50" }, 500);
};

const renderRegisterPage = () => {
  $("#message-card").animate({ top: "2000" }, 500).fadeOut(500);
  $("#form-card").animate({ top: "-2000" }, 500).fadeOut(500);
  $("#register-message-card")
    .removeClass("d-none")
    .fadeIn(500)
    .animate({ left: "0" }, 500);
  $("#register-form-card")
    .removeClass("d-none")
    .fadeIn(500)
    .animate({ left: "0" }, 500);
  $("#register-message-card").animate({ top: "-50" }, 500);
  $("#register-form-card").animate({ top: "50" }, 500);
};

const showErrorTooltip = () => {
  $("#error-tooltip").removeClass("d-none").fadeIn(500);
  setTimeout(() => {
    $("#error-tooltip").fadeOut(500);
  }, 4000);
  setTimeout(() => {
    $("#error-tooltip").addClass("d-none");
  }, 4500);
};

const showSuccessTooltip = () => {
  $("#success-tooltip").removeClass("d-none").fadeIn(500);
  setTimeout(() => {
    $("#success-tooltip").fadeOut(500);
  }, 4000);
  setTimeout(() => {
    $("#success-tooltip").addClass("d-none");
  }, 4500);
};

const signInValidation = () => {
  const signInErrors = [];
  const username = $("#login-username").val().trim();
  const password = $("#login-password").val().trim();
  if (!username) {
    signInErrors.push("Username cannot be empty.");
  }
  if (username.length < 3) {
    signInErrors.push("Minimum valid username length is 3.");
  }
  if (username.length > 30) {
    s;
    signInErrors.push("Maximum valid username length is 30.");
  }
  if (!password) {
    signInErrors.push("Password cannot be empty.");
  }
  if (password.length < 8) {
    signInErrors.push("Minimum valid password length is 8.");
  }
  return signInErrors;
};

const registerValidation = ()=>{
  
}
const renderValidationErrors = (validationErrors) => {
  $("#error-title").html(" Invalid Inputs!");
  const formattedErrors = `
  <ul>
  ${validationErrors
    .map((error) => {
      return `
    <li>${error}</li>
    `;
    })
    .join(" ")}
  </ul>
  `;
  $("#error-text").html(formattedErrors);
  showErrorTooltip();
  setTimeout(() => {
    $("#error-title").html("");
    $("#error-text").html("");
  }, 4600);
};

const renderResponseError = (errorTitle, errorMsg) => {
  $("#error-title").html(" " + errorTitle);
  const formattedErrors = `<ul><li>${errorMsg}</li></ul>`;
  $("#error-text").html(formattedErrors);
  showErrorTooltip();
  setTimeout(() => {
    $("#error-title").html("");
    $("#error-text").html("");
  }, 4600);
};
const renderResponseSuccessMsg = (title, msg) => {
  $("#success-title").html(" " + title);
  const formattedErrors = `<ul><li>${msg}</li></ul>`;
  $("#success-text").html(formattedErrors);
  showSuccessTooltip();
  setTimeout(() => {
    $("#success-title").html("");
    $("#success-text").html("");
  }, 4600);
};

$(() => {
  renderAuthPage();
});

$("#create-account").on("click", function () {
  renderRegisterPage();
});

$("#login-account").on("click", function () {
  renderLoginPage();
});

$("#signin-btn").on("click", async function () {
  const validationErrors = signInValidation();
  if (!!validationErrors.length) {
    return renderValidationErrors(validationErrors);
  }
  const loginData = {
    username: $("#login-username").val() ?? null,
    password: $("#login-password").val() ?? null,
  };
  try {
    const loginResponse = await axios.post(
      "http://localhost:3000/api/auth/signin",
      loginData
    );
    $("#login-username").val("");
    $("#login-password").val("");
    renderResponseSuccessMsg("Success", loginResponse.data.message);
    setTimeout(() => {
      location.href = "http://localhost:3000/dashboard";
    }, 1000);
  } catch (error) {
    renderResponseError(error.response.statusText, error.response.data.message);
  }
  // switch(loginResponse.response.statys)
});


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

const registerValidation = () => {
  const formInputs = $("#register-form-card input,select");
  const formInputsArray = Array.from(formInputs);
  const validationErrors = [];
  for (const input of formInputsArray) {
    switch (input.id) {
      case "firstname":
      case "lastname":
      case "username":
        if (!input.value?.trim()) {
          validationErrors.push(`${input.id} cannot be empty`);
        }
        if (input.value.length < 3) {
          validationErrors.push(`Minimum valid ${input.id} length is 3.`);
        }
        if (input.value.length > 30) {
          validationErrors.push(`Maximum valid ${input.id} length is 30.`);
        }
        break;
      case "password":
        if (!input.value) {
          validationErrors.push(`${input.id} cannot be empty`);
        }
        if (input.value.length < 8) {
          validationErrors.push(`Minimum valid ${input.id} length is 8`);
        }
        if (!input.value.match(/^(?=.*[A-Za-z])(?=.*\d).*$/)) {
          validationErrors.push(
            `Password must include at least one letter and one digit`
          );
        }
        break;
      case "phoneNumber":
        if (!input.value?.trim()) {
          validationErrors.push(`${input.id} cannot be empty`);
        }
        if (input.value.length != 11) {
          validationErrors.push(`${input.id}'s length must be 11 characters`);
        }
        if (!input.value.match(/^(0|\+98)9\d{9}$/)) {
          validationErrors.push(
            `${input.id} must match with 09123456789 or +989123456789`
          );
        }
        break;
      default:
        break;
    }
  }
  return validationErrors;
};

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
    const loginResponse = await axios.post("/api/auth/signin", loginData);
    $("#login-username").val("");
    $("#login-password").val("");
    renderResponseSuccessMsg("Success", loginResponse.data.message);
    setTimeout(() => {
      location.pathname = "dashboard";
    }, 1000);
  } catch (error) {
    renderResponseError(
      error?.response?.statusText,
      error?.response?.data?.message
    );
  }
});

$("#signup-btn").on("click", async function () {
  const validationErrors = registerValidation();
  if (!!validationErrors.length) {
    return renderValidationErrors(validationErrors);
  }
  const loginData = {
    firstname: $("#firstname").val() ?? null,
    lastname: $("#lastname").val() ?? null,
    username: $("#username").val() ?? null,
    password: $("#password").val() ?? null,
    phoneNumber: [$("#phoneNumber").val() ?? null],
    gender: $("#gender").val() ?? null,
  };
  try {
    const signUpResponse = await axios.post("/api/auth/register", loginData);
    $("#register-form-card input").val("");
    renderResponseSuccessMsg("Success", signUpResponse.data.message);
    setTimeout(() => {
      location.pathname = "dashboard";
    }, 1000);
  } catch (error) {
    console.log(error);
    renderResponseError(
      error?.response?.statusText,
      error?.response?.data?.message
    );
  }
});

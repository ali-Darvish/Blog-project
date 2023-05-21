const renderAuthPage = () => {
  $("#message-card").hide();
  $("#form-card").hide();

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

$(() => {
  renderAuthPage();

  $("#create-account").on("click", function () {
    renderRegisterPage();
  });
  $("#login-account").on("click", function () {
    renderLoginPage();
  });

  $("#signin-btn").on("click", async function () {
    const loginData = {
      username: $("#login-username").val() ?? null,
      password: $("#login-password").val() ?? null,
    };
    const loginResponse = await axios.post(
      "http://localhost:3000/api/auth/login",
      loginData
    );
    if (loginResponse.status === 200) {
      location.href = "http://localhost:3000/dashboard";
    }
    switch (loginResponse.status) {
      case 401:
        console.log(loginResponse);
        break;

      default:
        console.log(loginResponse);
        break;
    }
  });
});

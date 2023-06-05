// ---------Responsive-navbar-active-animation-----------
function test() {
  var tabsNewAnim = $("#navbarSupportedContent");
  var selectorNewAnim = $("#navbarSupportedContent").find("li").length;
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    top: itemPosNewAnimTop.top + "px",
    left: itemPosNewAnimLeft.left + "px",
    height: activeWidthNewAnimHeight + "px",
    width: activeWidthNewAnimWidth + "px",
  });
  $("#navbarSupportedContent").on("click", "li", function (e) {
    $("#navbarSupportedContent ul li").removeClass("active");
    $(this).addClass("active");
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
  });
}

$(document).ready(function () {
  setTimeout(function () {
    test();
  });
});
$(window).on("resize", function () {
  setTimeout(function () {
    test();
  }, 500);
});
$(".navbar-toggler").click(function () {
  $(".navbar-collapse").slideToggle(300);
  setTimeout(function () {
    test();
  });
  $("#my-articles-container").hide();
});

// --------------add active class-on another-page move----------
jQuery(document).ready(function ($) {
  // Get current path and find target link
  var path = window.location.pathname.split("/").pop();

  // Account for home page with empty path
  if (path == "") {
    path = "index.html";
  }

  var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
  // Add active class to target link
  target.parent().addClass("active");
});

// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     var current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });
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

const updateValidation = () => {
  const inputs = $("#modal-body-content input,select");
  const arrayInputs = Array.from(inputs);
  const errors = [];
  for (const input of arrayInputs) {
    switch (input.id) {
      case "firstname":
      case "lastname":
      case "username":
        if (!input.value?.trim()) {
          errors.push(`${input.id} cannot be empty`);
        }
        if (input.value.length < 3) {
          errors.push(`Minimum valid ${input.id} length is 3.`);
        }
        if (input.value.length > 30) {
          errors.push(`Maximum valid ${input.id} length is 30.`);
        }
        break;
    }
  }
  return errors;
};
const updatePasswordValidation = () => {
  const currentPassword = $("#currentPassword").val();
  const newPassword = $("#newPassword").val();
  const errors = [];
  if (!currentPassword) {
    errors.push("Current password cannot be empty.");
  }
  if (currentPassword.length < 8) {
    errors.push("Minimum valid current password length is 8.");
  }
  if (!newPassword) {
    errors.push("New password cannot be empty.");
  }
  if (newPassword.length < 8) {
    errors.push("Minimum valid new password length is 8.");
  }
  if (!newPassword.match(/^(?=.*[A-Za-z])(?=.*\d).*$/)) {
    errors.push(`New password must include at least one letter and one digit`);
  }
  return errors;
};

const renderModalForUpdateProfile = async (_id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/user/${_id}`);
    const { firstname, lastname, username, gender, userId } =
      response.data.data;
    $("#modal-title").text("Edit Your Profile");

    const modalBody = `
          <div class="form-floating mb-1 px-3">
            <input type="text" class="form-control" id="firstname"
            placeholder="Your First Name" value="${firstname}">
            <label for="firstname" class="ms-3 text-primary">First Name</label>
          </div>
          <div class="form-floating mb-1 px-3">
            <input type="text" class="form-control" id="lastname"
            placeholder="Your Last Name" value="${lastname}">
            <label for="lastname" class="ms-3 text-primary">Last Name</label>
          </div>
          <div class="form-floating mb-1 px-3">
            <input type="text" class="form-control" id="username"
            placeholder="Your Username" value="${username}">
            <label for="username" class="ms-3 text-primary">Username</label>
          </div>
          <div class="form-floating mb-1 px-3">
              <select id="gender" class="form-select">
                <option ${
                  gender === "male" ? "selected" : null
                } value="male">Male</option>
                <option ${
                  gender === "female" ? "selected" : null
                } value="female">Female</option>
                <option ${
                  gender === "not-set" ? "selected" : null
                } value="not-set">Not Set</option>
              </select>
            
            <label for="gender" class="ms-3 text-primary">Gender</label>
          </div>
          
    `;

    $("#modal-body-content").html(modalBody);
    const modalFooter = `
      <button type="button" class="btn btn-secondary"data-bs-dismiss="modal"
        >Close
      </button>
      <button type="button" class="btn btn-primary" onclick="updateProfile('${userId}')">Update Now</button>`;
    $("#modal-footer").html(modalFooter);
    $("#dashboard-modal").modal("show");
  } catch (error) {
    console.log(error);
  }
};
const renderModalForUpdatePassword = async (_id) => {
  $("#modal-title").text("Change Your Password");

  const modalBody = `
          <div class="form-floating mb-1 px-3">
            <input type="password" class="form-control" id="currentPassword"
            placeholder="Current Password" ">
            <label for="currentPassword" class="ms-3 text-primary">Current Password</label>
          </div>
          <div class="form-floating mb-1 px-3">
            <input type="password" class="form-control" id="newPassword"
            placeholder="New Password">
            <label for="newPassword" class="ms-3 text-primary">New Password</label>
          </div>
    `;

  $("#modal-body-content").html(modalBody);
  const modalFooter = `
      <button type="button" class="btn btn-secondary"data-bs-dismiss="modal"
        >Close
      </button>
      <button type="button" class="btn btn-primary" onclick="updatePassword('${_id}')">Change Now</button>`;
  $("#modal-footer").html(modalFooter);
  $("#dashboard-modal").modal("show");
};
const renderModalForUpdateAvatar = async (_id) => {
  $("#modal-title").text("Change Your Avatar");
  const response = await axios.get(`http://localhost:3000/api/user/${_id}`);
  const targetUser = response.data.data;
  const modalBody = `
          <div class="mb-3">
            <label for="avatarForm" class="form-label">Choose Your Image: (jpeg / png - Maximum File Size: 1Mb)</label>
            <input class="form-control" type="file" name="avatar" id="avatarForm">
          </div>
          <img id="avatarPreview" src="/images/avatars/${targetUser.avatar}" class="img-fluid" alt="${targetUser.username}'s Avatar">

    `;

  $("#modal-body-content").html(modalBody);
  const fileInput = $("#avatarForm")[0];

  $(fileInput).on("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    // Set a callback function to handle the file reading
    reader.onload = function (event) {
      // Create a new Blob object from the file data
      const blob = new Blob([event.target.result], { type: file.type });

      // Create a URL for the Blob object
      const blobUrl = URL.createObjectURL(blob);

      // Set the URL as the source of the image element
      document.getElementById("avatarPreview").removeAttribute("src");
      document.getElementById("avatarPreview").setAttribute("src", blobUrl);
    };

    // Read the file contents
    reader.readAsArrayBuffer(file);
  });

  const modalFooter = `
      <button type="button" class="btn btn-secondary"data-bs-dismiss="modal"
        >Close
      </button>
      <button type="button" class="btn btn-primary" onclick="updateAvatar('${_id}')">Change Now</button>`;
  $("#modal-footer").html(modalFooter);
  $("#dashboard-modal").modal("show");
};
const renderModalForDeleteAccount = async (_id) => {
  $("#modal-title").text("Delete Your Account");
  const modalBody = `
          <div class="mb-3">
            <label for="" class="form-label">
              Are you sure you want to delete your account?
            </label>
          </div>
    `;

  $("#modal-body-content").html(modalBody);
  const fileInput = $("#avatarForm")[0];

  $(fileInput).on("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    // Set a callback function to handle the file reading
    reader.onload = function (event) {
      // Create a new Blob object from the file data
      const blob = new Blob([event.target.result], { type: file.type });

      // Create a URL for the Blob object
      const blobUrl = URL.createObjectURL(blob);

      // Set the URL as the source of the image element
      document.getElementById("avatarPreview").removeAttribute("src");
      document.getElementById("avatarPreview").setAttribute("src", blobUrl);
    };

    // Read the file contents
    reader.readAsArrayBuffer(file);
  });

  const modalFooter = `
      <button type="button" class="btn btn-secondary"data-bs-dismiss="modal"
        >Cancel
      </button>
      <button type="button" class="btn btn-danger" onclick="deleteUserAccount('${_id}')">Yes, I'm Sure!</button>`;
  $("#modal-footer").html(modalFooter);
  $("#dashboard-modal").modal("show");
};

const updateProfile = async (userId) => {
  console.log(userId);
  const validationErrors = updateValidation();
  if (!!validationErrors.length) {
    return renderValidationErrors(validationErrors);
  }
  const loginData = {
    firstname: $("#firstname").val(),
    lastname: $("#lastname").val(),
    username: $("#username").val(),
    gender: $("#gender").val(),
  };
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/user/${userId}`,
      loginData
    );
    renderResponseSuccessMsg("Success", response.data.message);
    $("#dashboard-modal").modal("hide");
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    console.log(error);
    renderResponseError(
      error?.response?.data?.status,
      error?.response?.data?.message
    );
  }
};
const updatePassword = async (userId) => {
  const validationErrors = updatePasswordValidation();
  if (!!validationErrors.length) {
    return renderValidationErrors(validationErrors);
  }
  const changePasswordInfo = {
    currentPassword: $("#currentPassword").val(),
    newPassword: $("#newPassword").val(),
  };
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/user/password/${userId}`,
      changePasswordInfo
    );
    renderResponseSuccessMsg("Success", response.data.message);
    $("#dashboard-modal").modal("hide");
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    return renderResponseError(
      error?.response?.data?.status,
      error?.response?.data?.message
    );
  }
};
const updateAvatar = async (userId) => {
  const fileInput = $("#avatarForm")[0];
  const avatar = fileInput.files[0];
  if (!avatar) {
    return renderValidationErrors(["You cannot send an empty avatar"]);
  }
  const avatarData = new FormData();
  avatarData.append("avatar", avatar);
  try {
    const response = await axios.post(
      `http://localhost:3000/api/user/avatar/${userId}`,
      avatarData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    renderResponseSuccessMsg("Success", response.data.message);
    $("#dashboard-modal").modal("hide");
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    console.log(error);
    return renderResponseError(
      error?.response?.data?.status,
      error?.response?.data?.message
    );
  }
};
const deleteUserAccount = async (userId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/user/${userId}`
    );
    renderResponseSuccessMsg("Success", "User Deleted Successfully.");
    $("#dashboard-modal").modal("hide");
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    console.log(error);
    return renderResponseError(
      error?.response?.data?.status,
      error?.response?.data?.message
    );
  }
};

const renderMyArticlesPage = (userId) => {
  $("#dashboard-content").fadeOut(500);
  $("#my-articles-container").fadeIn(500);
  getArticles();
};

const getArticles = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/article/me`);
    const articles = response.data.data;
    renderArticlesList(articles);
  } catch (error) {
    return renderResponseError(
      error?.response?.data?.status,
      error?.response?.data?.message
    );
  }
};

const renderArticlesList = (articlesArray) => {
  $("#my-articles-container").html("");
  const articleContainerBody = articlesArray
    .map((article) => {
      return `
    <div class="card mb-3 col-12">
      <div class="row g-0">
        <div class="col-md-4">
         <img src="/images/thumbnails/${article.thumbnail}"
         class="img-fluid rounded-start" alt="${article.articleId}'s thumbnail">
       </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
         <p class="card-text">${article.brief}</p>
         <p class="card-text"><small class="text-muted">${article.createdAt}</small></p>
         <a type="button" class="btn btn-warning" href="http://localhost:3000/article/${article.articleId}">Read More</a>
      </div>
    </div>
  </div>
</div>
    `;
    })
    .join("");
  $("#my-articles-container").html(articleContainerBody);
  test();
};

const renderMyDashboard = () => {
  $("#my-articles-container").fadeOut(500);
  $("#dashboard-content").fadeIn(500);
};

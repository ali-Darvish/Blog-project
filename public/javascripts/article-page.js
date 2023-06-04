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

window.onload = async function () {
  const articleId = window.location.pathname.replace("/article/", "");
  try {
    const axiosResponse = await axios.get(
      `http://localhost:3000/api/article/${articleId}`
    );
    localStorage.setItem("article", JSON.stringify(axiosResponse.data));
    renderArticleData();
  } catch (error) {
    return renderResponseError(
      error?.response?.data?.status,
      error?.response?.data?.message
    );
  }
};

const renderArticleData = () => {
  const { response, editable } = JSON.parse(localStorage.getItem("article"));
  $("#article-container").html(`
  <div class="card col-12 p-0 border-0 text-center">
  <div class="card-body">
    <img
      src="/images/thumbnails/${response.data.thumbnail}"
      class="img-fluid"
      alt="article thumbnail"
    />
    <h5 class="card-title text-start">${response.data.title}</h5>
    <p class="card-text text-start">${response.data.content}</p>
    <div id="user-avatar-container" class="ms-2 me-2">
      <div class="row">
        <div class="col-6 justify-content-start">
          <img
            src="/images/avatars/${response.data.author.avatar}"
            class="rounded-circle border border-2 border-light"
            width="44px"
            w-25
          />
          <span class="card-text text-end text-muted w-75">
          ${response.data.author.firstname} ${response.data.author.lastname}
          </span>
        </div>
        <div class="col-6">
          <p class="card-text text-end text-muted">${
            response.data.createdAt
          }</p>
        </div>
      </div>
    </div>
  </div>
  ${
    editable
      ? `
    <div class="card-footer">
        <button type="button" class="btn btn-primary">
            Edit Article
        </button>
        <button type="button" class="btn btn-primary">
            Delete Article
        </button>
    </div>`
      : ""
  }
  
</div>
  `);
  
};

(function () {

  var formHTML =
    '<div id="auth-form-wrap" style="display:none; position:fixed; inset:0;' +
    ' background:rgba(0,0,0,0.4); z-index:9999; align-items:center; justify-content:center;">' +
    '  <div style="background:var(--white); padding:2rem; border-radius:12px;' +
    '    width:min(380px,92vw); box-shadow:0 4px 20px rgba(0,0,0,0.2);">' +

    // Heading
    '    <h2 id="auth-form-title" style="margin:0 0 0.25rem; font-size:1.25rem;"></h2>' +
    '    <p style="margin:0 0 1.25rem; font-size:0.85rem; color:var(--text-muted);">' +
    '      <button id="auth-switch-btn" type="button" style="background:none; border:none;' +
    '        color:var(--important); font-size:0.85rem; cursor:pointer; padding:0;' +
    '        text-decoration:underline;"></button>' +
    '    </p>' +

    // Username
    '    <div id="auth-username-wrap">' +
    '      <input id="auth-username" type="text" placeholder="Username"' +
    '        style="width:100%; box-sizing:border-box; padding:0.6rem 0.75rem;' +
    '        margin-bottom:0.5rem; border:1px solid var(--border); border-radius:8px;' +
    '        font-size:1rem; background:var(--panel-bg); color:var(--text);">' +
    '    </div>' +

    // Email
    '    <input id="auth-email" type="email" placeholder="Email"' +
    '      style="width:100%; box-sizing:border-box; padding:0.6rem 0.75rem;' +
    '      margin-bottom:0.5rem; border:1px solid var(--border); border-radius:8px;' +
    '      font-size:1rem; background:var(--panel-bg); color:var(--text);">' +

    // Password field
    '    <input id="auth-password" type="password" placeholder="Password"' +
    '      style="width:100%; box-sizing:border-box; padding:0.6rem 0.75rem;' +
    '      margin-bottom:0.5rem; border:1px solid var(--border); border-radius:8px;' +
    '      font-size:1rem; background:var(--panel-bg); color:var(--text);">' +

    '    <p id="auth-error-msg" style="color:#b91c1c; font-size:0.85rem;' +
    '      margin:0 0 0.75rem; min-height:1.2em;"></p>' +

    '    <button id="auth-submit-btn" type="button"' +
    '      style="width:100%; padding:0.65rem; background:var(--button-dark); color:#fff;' +
    '      border:none; border-radius:8px; font-size:1rem; cursor:pointer; margin-bottom:0.5rem;">' +
    '    </button>' +

    '    <button id="auth-cancel-btn" type="button"' +
    '      style="width:100%; padding:0.5rem; background:none; border:1px solid var(--border);' +
    '      border-radius:8px; font-size:0.9rem; cursor:pointer; color:var(--text);">Cancel</button>' +
    '  </div>' +
    '</div>';

  document.body.insertAdjacentHTML("beforeend", formHTML);

  var wrap        = document.getElementById("auth-form-wrap");
  var title       = document.getElementById("auth-form-title");
  var switchBtn   = document.getElementById("auth-switch-btn");
  var usernameWrap= document.getElementById("auth-username-wrap");
  var usernameEl  = document.getElementById("auth-username");
  var emailEl     = document.getElementById("auth-email");
  var passwordEl  = document.getElementById("auth-password");
  var errorMsg    = document.getElementById("auth-error-msg");
  var submitBtn   = document.getElementById("auth-submit-btn");
  var cancelBtn   = document.getElementById("auth-cancel-btn");

  var mode       = "login";
  var afterLogin = null;

  function setMode(m) {
    mode = m;
    if (mode === "login") {
      title.textContent = "Log In";
      submitBtn.textContent = "Log In";
      switchBtn.textContent = "Need an account? Create one";
      usernameWrap.style.display = "none";
    } else {
      title.textContent = "Create Account";
      submitBtn.textContent = "Create Account";
      switchBtn.textContent = "Already have an account? Log in";
      usernameWrap.style.display = "";
    }
    errorMsg.textContent = "";
  }

  function showForm(callback, startMode) {
    afterLogin = callback || null;
    usernameEl.value = "";
    emailEl.value = "";
    passwordEl.value = "";
    setMode(startMode || "login");
    wrap.style.display = "flex";
    (mode === "signup" ? usernameEl : emailEl).focus();
  }

  function hideForm() {
    wrap.style.display = "none";
    var spinner = document.getElementById("page-spinner");
    if (spinner) spinner.classList.add("hidden");
  }

  switchBtn.addEventListener("click", function () {
    setMode(mode === "login" ? "signup" : "login");
  });

  submitBtn.addEventListener("click", function () {
    var username = usernameEl.value.trim();
    var email    = emailEl.value.trim();
    var password = passwordEl.value;
    errorMsg.textContent = "";

    if (mode === "signup" && !username) {
      errorMsg.textContent = "Please enter a username."; return;
    }
    if (!email || !email.includes("@")) {
      errorMsg.textContent = "Please enter a valid email."; return;
    }
    if (!password) {
      errorMsg.textContent = "Please enter a password."; return;
    }

    Auth.login(mode === "signup" ? username : email.split("@")[0]);
    hideForm();
    updateAccountMenu();
    if (typeof afterLogin === "function") afterLogin();
  });

  emailEl.addEventListener("keydown",    function (e) { if (e.key === "Enter") submitBtn.click(); });
  passwordEl.addEventListener("keydown", function (e) { if (e.key === "Enter") submitBtn.click(); });
  cancelBtn.addEventListener("click", hideForm);
  wrap.addEventListener("click", function (e) { if (e.target === wrap) hideForm(); });

  function requireAuth(action) {
    if (Auth.isLoggedIn()) { action(); } else { showForm(action); }
  }

  function updateAccountMenu() {
    var user      = Auth.getUser();
    var signinBtn = document.getElementById("menu-signin-btn");
    var logoutBtn = document.getElementById("menu-logout-btn");

    var existing = document.getElementById("auth-user-info");
    if (existing) existing.remove();

    if (user) {
      var actionsDiv = document.querySelector(".account-menu-actions");
      if (actionsDiv) {
        var info = document.createElement("p");
        info.id = "auth-user-info";
        info.style.cssText = "margin:0 0 0.75rem; font-weight:600; font-size:0.95rem;";
        info.textContent = "Signed in as " + user.username;
        actionsDiv.insertAdjacentElement("beforebegin", info);
      }
      if (signinBtn) signinBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "";
    } else {
      if (signinBtn) signinBtn.style.display = "";
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  }

  function gatePostLinks() {
    document.querySelectorAll('a[href="listing.html"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (!Auth.isLoggedIn()) {
          e.preventDefault();
          showForm(function () { window.location.href = "listing.html"; }, "signup");
        }
      });
    });
  }

  function gateOfferButton() {
    var btn = document.getElementById("offerBtn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      requireAuth(function () {
        var titleEl = document.getElementById("productTitle");
        var itemName = titleEl ? titleEl.textContent.trim() : "this item";
        var sellerName = "Seller Name";

        var heroImg = document.querySelector(".product-hero-image");
        var productImage = heroImg ? heroImg.src : null;

        var productId = new URLSearchParams(window.location.search).get("id");

        if (window.Inbox) {
          window.Inbox.record({
            seller:    sellerName,
            item:      itemName,
            image:     productImage,
            productId: productId,
            returnUrl: window.location.href
          });
        }

        var returnUrl = encodeURIComponent(window.location.href);
        var url = "message.html"
          + "?seller=" + encodeURIComponent(sellerName)
          + "&item="   + encodeURIComponent(itemName)
          + "&from="   + returnUrl;
        window.location.href = url;
      });
    });
  }

  function gateListingPage() {
    if (window.location.href.includes("listing.html") && !Auth.isLoggedIn()) {
      window.location.replace("index.html");
    }
  }

  function wireSigninButton() {
    var signinBtn = document.getElementById("menu-signin-btn");
    if (!signinBtn) return;
    signinBtn.addEventListener("click", function () {
      showForm();
    });
  }

  function wireLogout() {
    var logoutBtn = document.getElementById("menu-logout-btn");
    if (!logoutBtn) return;
    logoutBtn.addEventListener("click", function () { Auth.logout(); });
  }

  gateListingPage();
  gateOfferButton();

  window.AuthModal = { requireAuth: requireAuth };

  function waitForHeader(fn) {
    if (document.querySelector(".account-menu-actions")) { fn(); return; }
    var interval = setInterval(function () {
      if (document.querySelector(".account-menu-actions")) {
        clearInterval(interval);
        fn();
      }
    }, 50);
  }

  waitForHeader(function () {
    updateAccountMenu();
    gatePostLinks();
    wireSigninButton();
    wireLogout();
  });

})();

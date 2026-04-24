var Auth = {
  getUser: function () {
    var raw = sessionStorage.getItem("marketplace_user");
    return raw ? JSON.parse(raw) : null;
  },

  isLoggedIn: function () {
    return Auth.getUser() !== null;
  },

  login: function (username) {
    sessionStorage.setItem("marketplace_user", JSON.stringify({ username: username }));
  },

  logout: function () {
    sessionStorage.removeItem("marketplace_user");
    location.reload();
  }
};

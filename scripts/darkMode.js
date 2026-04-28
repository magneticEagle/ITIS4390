(function () {
  "use strict";

  const STORAGE_KEY = "marketplace_theme";

  function isDark() {
    return document.documentElement.classList.contains("dark");
  }

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(STORAGE_KEY, "light");
    }
    updateAllToggles();
  }

  function toggle() {
    applyTheme(!isDark());
  }

  function updateAllToggles() {
    document.querySelectorAll(".dark-mode-toggle").forEach(function (btn) {
      btn.textContent = isDark() ? "☀️  Light Mode" : "🌙  Dark Mode";
      btn.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  function injectIntoAccountMenu() {
    const actionsDiv = document.querySelector(".account-menu-actions");
    if (!actionsDiv || actionsDiv.querySelector(".dark-mode-toggle")) return;

    const placeholder = Array.from(
      actionsDiv.querySelectorAll(".account-menu-action")
    ).find(function (btn) {
      return btn.textContent.trim().toLowerCase().includes("dark");
    });

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "account-menu-action dark-mode-toggle";
    btn.addEventListener("click", toggle);

    function syncLabel() {
      btn.textContent = isDark() ? "☀️  Light Mode" : "🌙  Dark Mode";
    }
    syncLabel();

    if (placeholder) {
      placeholder.replaceWith(btn);
    } else {
      actionsDiv.appendChild(btn);
    }
  }

  function waitFor(selector, callback) {
    if (document.querySelector(selector)) { callback(); return; }
    const observer = new MutationObserver(function () {
      if (document.querySelector(selector)) {
        observer.disconnect();
        callback();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  waitFor(".account-menu-actions", function () {
    injectIntoAccountMenu();
    updateAllToggles();
  });

})();

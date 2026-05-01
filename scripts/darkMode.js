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
    var checkbox = document.querySelector(".dark-mode-toggle");
    if (checkbox) checkbox.checked = dark;
  }

  function toggle() {
    applyTheme(!isDark());
  }

  function injectIntoAccountMenu() {
    const actionsDiv = document.querySelector(".account-menu-actions");
    if (!actionsDiv || document.querySelector(".dark-mode-toggle-row")) return;

    const placeholder = Array.from(
      actionsDiv.querySelectorAll(".account-menu-action")
    ).find(function (btn) {
      return btn.textContent.trim().toLowerCase().includes("dark");
    });
    if (placeholder) placeholder.remove();

    const row = document.createElement("div");
    row.className = "dark-mode-toggle-row";

    const label = document.createElement("span");
    label.className = "dark-mode-toggle-label";
    label.textContent = "Dark Mode";

    const toggleWrap = document.createElement("label");
    toggleWrap.className = "ios-toggle";
    toggleWrap.setAttribute("aria-label", "Toggle dark mode");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "dark-mode-toggle";
    input.checked = isDark();
    input.addEventListener("change", function () {
      applyTheme(input.checked);
    });

    const slider = document.createElement("span");
    slider.className = "ios-toggle-slider";

    toggleWrap.appendChild(input);
    toggleWrap.appendChild(slider);

    row.appendChild(label);
    row.appendChild(toggleWrap);

    actionsDiv.insertAdjacentElement("beforebegin", row);
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
  });

})();

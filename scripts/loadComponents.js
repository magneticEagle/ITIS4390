function markActiveHeaderNav(scope) {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "";
  const currentFile =
    !last || !last.includes(".") ? "index.html" : last.toLowerCase();

  scope.querySelectorAll("header nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").split(/[?#]/)[0];
    const linkFile = (href.split("/").pop() || "").toLowerCase();

    if (linkFile && linkFile === currentFile) {
      a.setAttribute("aria-current", "page");
    }
  });
}

document.querySelectorAll("[data-component]").forEach((el) => {
  const file = el.getAttribute("data-component");

  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      el.innerHTML = data;

      if (file.includes("header")) {
        markActiveHeaderNav(el);

        const pageSpinner = document.getElementById("page-spinner");

        document.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");

            if (
              link.hostname === window.location.hostname &&
              href &&
              !href.startsWith("#")
            ) {
              
              setTimeout(function () {
                if (!event.defaultPrevented) {
                  pageSpinner.classList.remove("hidden");
                }
              }, 0);
            }
          });
        });

        window.addEventListener("pageshow", () => {
          setTimeout(() => {
            pageSpinner.classList.add("hidden");
          }, 1500);
        });

        if (window.Inbox && window.Inbox.wireDropdown) {
          window.Inbox.wireDropdown(el);
        }

        const accountTrigger = el.querySelector(".account-menu-trigger");
        const accountOverlay = el.querySelector("#account-menu-overlay");
        const accountClose = el.querySelector(".account-menu-close");
        const accountPanel = el.querySelector("#account-menu-panel");

        if (accountTrigger && accountOverlay && accountClose && accountPanel) {
          function openAccountMenu() {
          accountOverlay.classList.remove("hidden");

          accountOverlay.offsetHeight;

          accountOverlay.classList.add("active");
          accountTrigger.setAttribute("aria-expanded", "true");
          accountOverlay.setAttribute("aria-hidden", "false");
          document.body.classList.add("account-menu-open");
}

          function closeAccountMenu() {
            accountOverlay.classList.remove("active");
            accountTrigger.setAttribute("aria-expanded", "false");
            accountOverlay.setAttribute("aria-hidden", "true");
            document.body.classList.remove("account-menu-open");

            setTimeout(() => {
              accountOverlay.classList.add("hidden");
            }, 300);
          }

          accountTrigger.addEventListener("click", openAccountMenu);
          accountClose.addEventListener("click", closeAccountMenu);

          accountOverlay.addEventListener("click", (event) => {
            if (event.target === accountOverlay) {
              closeAccountMenu();
            }
          });

          document.addEventListener("keydown", (event) => {
            if (
              event.key === "Escape" &&
              !accountOverlay.classList.contains("hidden")
            ) {
              closeAccountMenu();
            }
          });

          accountPanel.addEventListener("click", (event) => {
            const btn = event.target.closest(".account-menu-action");
            if (btn && btn.textContent.trim() === "Saved Items") {
              if (window.SavedItems) {
                window.SavedItems.openSavedItemsPanel(accountOverlay, closeAccountMenu);
              }
            }
          });
        }

        const mobileNavTrigger = el.querySelector("#mobileNavTrigger");
        const mobileNavOverlay = el.querySelector("#mobile-nav-overlay");
        const mobileNavClose = el.querySelector(".mobile-nav-close");

        if (mobileNavTrigger && mobileNavOverlay && mobileNavClose) {
          function openMobileNav() {
            mobileNavOverlay.classList.remove("hidden");
            mobileNavOverlay.offsetHeight;
            mobileNavOverlay.classList.add("active");
            mobileNavTrigger.setAttribute("aria-expanded", "true");
            mobileNavOverlay.setAttribute("aria-hidden", "false");
            document.body.classList.add("account-menu-open");
          }

          function closeMobileNav() {
            mobileNavOverlay.classList.remove("active");
            mobileNavTrigger.setAttribute("aria-expanded", "false");
            mobileNavOverlay.setAttribute("aria-hidden", "true");
            document.body.classList.remove("account-menu-open");
            setTimeout(() => {
              mobileNavOverlay.classList.add("hidden");
            }, 300);
          }

          mobileNavTrigger.addEventListener("click", openMobileNav);
          mobileNavClose.addEventListener("click", closeMobileNav);

          mobileNavOverlay.addEventListener("click", (event) => {
            if (event.target === mobileNavOverlay) closeMobileNav();
          });

          document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !mobileNavOverlay.classList.contains("hidden")) {
              closeMobileNav();
            }
          });
        }
      }

      if (file.includes("footer")) {
        const pageSpinner = document.getElementById("page-spinner");

        el.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", function () {
            const href = link.getAttribute("href");

            if (
              link.hostname === window.location.hostname &&
              href &&
              !href.startsWith("#")
            ) {
              pageSpinner.classList.remove("hidden");
            }
          });
        });
      }
    })
    .catch((err) => console.error(`Error loading ${file}:`, err));
});

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

      // Header behavior
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

        // Account menu behavior
        const accountTrigger = el.querySelector(".account-menu-trigger");
        const accountOverlay = el.querySelector("#account-menu-overlay");
        const accountClose = el.querySelector(".account-menu-close");
        const accountPanel = el.querySelector("#account-menu-panel");

        if (accountTrigger && accountOverlay && accountClose && accountPanel) {
          function openAccountMenu() {
          accountOverlay.classList.remove("hidden");

  // Force browser to recognize the starting position first
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

          // close if user clicks the dimmed background only
          accountOverlay.addEventListener("click", (event) => {
            if (event.target === accountOverlay) {
              closeAccountMenu();
            }
          });

          // close on Escape key
          document.addEventListener("keydown", (event) => {
            if (
              event.key === "Escape" &&
              !accountOverlay.classList.contains("hidden")
            ) {
              closeAccountMenu();
            }
          });
        }
      }

      // Footer spinner for navigation
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

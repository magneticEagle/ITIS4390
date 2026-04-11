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

document.querySelectorAll("[data-component]").forEach(el => {
  const file = el.getAttribute("data-component");

  fetch(file)
    .then(res => res.text())
    .then(data => {
      el.innerHTML = data;

      // Header spinner for navigation
      if (file.includes("header")) {
        markActiveHeaderNav(el);
        const pageSpinner = document.getElementById("page-spinner");

        document.querySelectorAll("a").forEach(link => {
          link.addEventListener("click", function(e) {
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

        window.addEventListener("pageshow", () => {
          setTimeout(() => {
            pageSpinner.classList.add("hidden");
          }, 1500);
        });
      }

      // Footer spinner for navigation
      if (file.includes("footer")) {
        const pageSpinner = document.getElementById("page-spinner");

        el.querySelectorAll("a").forEach(link => {
          link.addEventListener("click", function(e) {
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
    .catch(err => console.error(`Error loading ${file}:`, err));
});

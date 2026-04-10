// handles live suggestions while typing + loading spinner when pressing enter
function initSearch() {
  const searchInput = document.getElementById("search-input");
  const resultsList = document.getElementById("search-results");
  const loadingOverlay = document.getElementById("loading-overlay");

  // if the search input doesn't exist yet (the header hasn't loaded yet), exit
  if (!searchInput) return;  

  // stores the list of products
  let products = [];
  // used to prevent too many searches while typing fast
  let debounceTimer = null;

  // loads product data from products.js or uses fallback
  function loadProducts() {
    if (typeof mockProducts !== "undefined" && mockProducts.length > 0) {
      products = mockProducts;
    } else {
        // fallback data  in case products.js hasn't loaded
      products = [
        { title: "Wireless Headphones" },
        { title: "Gaming Mouse" },
        { title: "Mechanical Keyboard" },
        { title: "Monitor 24\"" }
      ];
    }
  }

  loadProducts();

  // Live suggestions while typing
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    // clears previous timer to avoid multiple rapid searches
    if (debounceTimer) clearTimeout(debounceTimer);

    // clears old suggestions
    resultsList.innerHTML = "";

    if (query === "") {
      resultsList.classList.add("hidden");
      return;
    }

    // waits a little bit before showing results to prevent lag when typing fast
    debounceTimer = setTimeout(() => {
      const matches = products.filter(product =>
        product.title.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No results found";
        li.classList.add("no-results");
        resultsList.appendChild(li);
      } else {
        matches.forEach(product => {
          const li = document.createElement("li");
          li.textContent = product.title;
          resultsList.appendChild(li);
        });
      }

      resultsList.classList.remove("hidden");
    }, 180);
  });

  // Press Enter → show spinner and redirect
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query === "") return;

      // hides suggestions and shows loading spinner
      resultsList.classList.add("hidden");
      loadingOverlay.classList.remove("hidden");

      //simulates loading delay, then goes to search page
      setTimeout(() => {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
      }, 1200);
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrap")) {
      resultsList.classList.add("hidden");
    }
  });
}

// Run initSearch after header is loaded
document.addEventListener("DOMContentLoaded", () => {
  // try to initialize search immediately
  initSearch();

  // watch for the header being injected into the page
  const observer = new MutationObserver(() => {
    if (document.getElementById("search-input")) {
      initSearch();
      // stops watching once found
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
const mockProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: "$59.99",
    priceNum: 59.99,
    shipping: "Free shipping",
    image: "images/headphones.jpeg",
    category: "gaming",
    postedDays: 2,
    condition: "like-new",
    model: "N/A",
    city: "Charlotte, NC",
    mapLat: 35.2271,
    mapLng: -80.8431,
    description: "Great pair of over-ear wireless headphones with 30-hour battery life and noise isolation. Used lightly for remote work — sound quality is excellent, padding still in great shape. Comes with original charging cable and carry pouch.",
    sellerName: "Marcus T.",
    sellerReviews: 34,
    sellerStars: "4.8/5"
  },
  {
    id: 2,
    title: "Gaming Mouse",
    price: "$29.99",
    priceNum: 29.99,
    shipping: "$5 shipping",
    image: "images/gaming_mouse.jpg",
    category: "gaming",
    postedDays: 0,
    condition: "new",
    model: "N/A",
    city: "Concord, NC",
    mapLat: 35.4088,
    mapLng: -80.5795,
    description: "Brand new in box, never used. Picked up a second one by mistake. Lightweight ergonomic design with adjustable DPI, programmable side buttons, and a braided cable. Perfect for FPS or everyday use.",
    sellerName: "Jordan K.",
    sellerReviews: 12,
    sellerStars: "4.5/5"
  },
  {
    id: 3,
    title: "Mechanical Keyboard",
    price: "$89.99",
    priceNum: 89.99,
    shipping: "Free shipping",
    image: "images/keyboard.jpeg",
    category: "gaming",
    postedDays: 14,
    condition: "used-good",
    model: "N/A",
    city: "Monroe, NC",
    mapLat: 34.9854,
    mapLng: -80.5490,
    description: "Tactile mechanical switches (brown) with satisfying feedback and a solid aluminum frame. Backlighting works perfectly. Some light keycap wear visible on WASD but nothing that affects performance. Great board for work or gaming.",
    sellerName: "Priya S.",
    sellerReviews: 57,
    sellerStars: "4.9/5"
  },
  {
    id: 4,
    title: "Monitor 24\"",
    price: "$149.99",
    priceNum: 149.99,
    shipping: "$15 shipping",
    image: "images/monitor.jpg",
    category: "gaming",
    postedDays: 45,
    condition: "used-okay",
    model: "N/A",
    city: "Gastonia, NC",
    mapLat: 35.2621,
    mapLng: -81.1873,
    description: "24-inch 1080p IPS monitor with crisp colors and wide viewing angles. Minor scuff on the bottom bezel — not visible during use. Includes HDMI and power cable. Great second monitor or starter display.",
    sellerName: "Devon R.",
    sellerReviews: 8,
    sellerStars: "3.9/5"
  },
  {
    id: 5,
    title: "PC Gaming Setup",
    price: "$1599.99",
    priceNum: 1599.99,
    shipping: "$15 shipping",
    image: "images/gaming-setup.jpeg",
    category: "gaming",
    postedDays: 5,
    condition: "like-new",
    model: "N/A",
    city: "Rock Hill, SC",
    mapLat: 34.9249,
    mapLng: -81.0251,
    description: "Full gaming rig — tower, peripherals, and dual monitors included. Specs: Ryzen 7, RTX 3070, 32GB RAM, 1TB NVMe SSD. Handles anything you throw at it. Upgrading to a new build, priced to move fast.",
    sellerName: "Tyler M.",
    sellerReviews: 21,
    sellerStars: "4.7/5"
  },
  {
    id: 6,
    title: "Ergonomic Desk",
    price: "$249.00",
    priceNum: 249,
    shipping: "$25 shipping",
    image: "images/desk.jpeg",
    category: "furniture",
    postedDays: 1,
    condition: "used-good",
    model: "N/A",
    city: "Kannapolis, NC",
    mapLat: 35.4874,
    mapLng: -80.6215,
    description: "Adjustable-height sit-stand desk with a smooth electric motor and memory presets. Solid wood top with minimal surface wear. Disassembled for easy pickup or delivery. Perfect for a home office upgrade.",
    sellerName: "Aaliyah W.",
    sellerReviews: 43,
    sellerStars: "4.6/5"
  },
  {
    id: 7,
    title: "Office Chair",
    price: "$179.50",
    priceNum: 179.5,
    shipping: "$20 shipping",
    image: "images/chair.jpeg",
    category: "furniture",
    postedDays: 60,
    condition: "used-okay",
    model: "N/A",
    city: "Salisbury, NC",
    mapLat: 35.6710,
    mapLng: -80.4742,
    description: "Mesh-back office chair with lumbar support and adjustable armrests. Foam has softened slightly over time but is still comfortable for long sessions. A few small scuffs on the base — functionally perfect.",
    sellerName: "Brian L.",
    sellerReviews: 6,
    sellerStars: "4.2/5"
  },
  {
    id: 8,
    title: "Limited Figure",
    price: "$85.00",
    priceNum: 85,
    shipping: "$8 shipping",
    image: "images/figure.jpeg",
    category: "collectibles",
    postedDays: 0,
    condition: "new",
    model: "N/A",
    city: "Mooresville, NC",
    mapLat: 35.5849,
    mapLng: -80.8098,
    description: "Limited-edition resin figure from a popular series, still factory sealed in original box. Purchased as a collector's item — never opened or displayed. A great addition to any shelf.",
    sellerName: "Zoe C.",
    sellerReviews: 19,
    sellerStars: "5.0/5"
  },
  {
    id: 9,
    title: "Vintage Poster",
    price: "$0",
    priceNum: 0,
    shipping: "Free shipping",
    image: "images/poster.jpeg",
    category: "collectibles",
    postedDays: 90,
    condition: "used-good",
    model: "N/A",
    city: "Statesville, NC",
    mapLat: 35.7826,
    mapLng: -80.8873,
    description: "Vintage-style screen-printed poster in good condition with a few small edge creases from storage. Not framed. Dimensions approx. 18×24 inches. Free to a good home — just come pick it up.",
    sellerName: "Ramon G.",
    sellerReviews: 31,
    sellerStars: "4.4/5"
  }
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function formatConditionLabel(condition) {
  const map = {
    new: "New",
    "like-new": "Like new",
    "used-good": "Used — Good",
    "used-okay": "Used — Okay"
  };
  return map[condition] || condition;
}

function formatPostedLabel(postedDays) {
  if (postedDays === 0) return "Listed today";
  if (postedDays === 1) return "Listed 1 day ago";
  return `Listed ${postedDays} days ago`;
}

function formatCategoryLabel(category) {
  const map = {
    gaming: "Gaming",
    furniture: "Furniture",
    collectibles: "Collectibles"
  };
  return map[category] || category;
}

function renderProductCardHTML(product, template) {
  let cardHTML = template;
  cardHTML = cardHTML.replace(/\{\{id\}\}/g, String(product.id));
  cardHTML = cardHTML.replace(/\{\{title\}\}/g, escapeHtml(product.title));
  cardHTML = cardHTML.replace(/\{\{price\}\}/g, escapeHtml(product.price));
  cardHTML = cardHTML.replace(/\{\{image\}\}/g, escapeHtml(product.image));
  cardHTML = cardHTML.replace(
    /\{\{conditionLabel\}\}/g,
    escapeHtml(formatConditionLabel(product.condition))
  );
  cardHTML = cardHTML.replace(
    /\{\{postedLabel\}\}/g,
    escapeHtml(formatPostedLabel(product.postedDays))
  );
  return cardHTML;
}

(function initProductDetailPage() {
  const root = document.querySelector(".product-page");
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) return;

  const product = mockProducts.find((p) => String(p.id) === String(id));
  if (!product) return;

  const titleEl = root.querySelector(".product-heading-text .section-title");
  if (titleEl) titleEl.textContent = product.title;

  const priceEl = root.querySelector(".product-price");
  if (priceEl) priceEl.textContent = product.price;

  const listedEl = root.querySelector(".product-heading-text .small-text");
  if (listedEl) listedEl.textContent = formatPostedLabel(product.postedDays);

  const ph = root.querySelector(".product-image-wrap .placeholder-box.image-box");
  if (ph) {
    const img = document.createElement("img");
    img.className = "product-hero-image";
    img.src = product.image;
    img.alt = product.title;
    img.width = 800;
    img.height = 600;
    ph.replaceWith(img);
  }

  const items = root.querySelectorAll(".details-list li");
  if (items[0]) {
    items[0].textContent = `Category: ${formatCategoryLabel(product.category)}`;
  }
  if (items[1]) {
    items[1].textContent = `Condition: ${formatConditionLabel(product.condition)}`;
  }
  if (items[2]) {
    items[2].textContent = `Model: ${product.model || "N/A"}`;
  }

  const locationEl = root.querySelector("#productLocationText");
  if (locationEl && product.city) locationEl.textContent = product.city;

  const descEl = root.querySelector("#productDescriptionText");
  if (descEl && product.description) descEl.textContent = product.description;

  const sellerNameEl = root.querySelector(".seller-block .muted-text");
  if (sellerNameEl && product.sellerName) sellerNameEl.textContent = product.sellerName;
  const sellerStatsEl = root.querySelector(".seller-block .small-text");
  if (sellerStatsEl && product.sellerReviews) {
    sellerStatsEl.textContent = `${product.sellerReviews} reviews · ${product.sellerStars} stars`;
  }

  const avatarEl = root.querySelector(".seller-avatar");
  if (avatarEl && product.sellerName) {
    const initial = product.sellerName.charAt(0).toUpperCase();
    avatarEl.textContent = initial;
    avatarEl.classList.add("seller-avatar-initial");
  }

  // OpenStreetMap
  const mapPlaceholder = root.querySelector("#productMapPlaceholder");
  if (mapPlaceholder && product.mapLat && product.mapLng) {
    const zoom = 13;
    const lat = product.mapLat;
    const lng = product.mapLng;
    const mapFrame = document.createElement("iframe");
    mapFrame.className = "product-map-embed";
    mapFrame.title = `Map showing ${product.city}`;
    mapFrame.loading = "lazy";
    mapFrame.referrerPolicy = "no-referrer-when-downgrade";
    mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05},${lat - 0.03},${lng + 0.05},${lat + 0.03}&layer=mapnik&marker=${lat},${lng}`;
    mapPlaceholder.replaceWith(mapFrame);
  }
})();

(function initCatalogCards() {
  const grid = document.getElementById("product-grid");
  const homeSections = document.querySelectorAll(
    ".content-section[data-home-category]"
  );
  if (!grid && homeSections.length === 0) return;

  function initHomeSections(template) {
    homeSections.forEach((section) => {
      const cat = section.getAttribute("data-home-category");
      const g = section.querySelector(".card-grid");
      if (!cat || !g) return;
      const items = mockProducts.filter((p) => p.category === cat).slice(0, 3);
      g.innerHTML = items
        .map((p) => renderProductCardHTML(p, template))
        .join("");
    });
    if (window.SavedItems) window.SavedItems.wireAllCardButtons();
  }

  if (grid) {
    const state = {
      category: "all",
      recency: null,
      condition: null,
      priceSort: null,
      freeOnly: false
    };

    let cardTemplate = null;

    function matchesRecency(postedDays) {
      if (!state.recency) return true;
      switch (state.recency) {
        case "24h":
          return postedDays <= 1;
        case "1w":
          return postedDays <= 7;
        case "30d":
          return postedDays <= 30;
        case "30plus":
          return postedDays > 30;
        default:
          return true;
      }
    }

    function getListings() {
      let list = mockProducts.slice();

      const params = new URLSearchParams(window.location.search);
      const q = (params.get("q") || "").trim().toLowerCase();
      if (q) {
        list = list.filter((p) => p.title.toLowerCase().includes(q));
      }

      list = list.filter((p) => {
        if (state.category !== "all" && p.category !== state.category) {
          return false;
        }
        if (state.condition && p.condition !== state.condition) return false;
        if (!matchesRecency(p.postedDays)) return false;
        if (state.freeOnly && p.priceNum > 0) return false;
        return true;
      });

      if (state.priceSort === "asc") {
        list.sort((a, b) => a.priceNum - b.priceNum);
      } else if (state.priceSort === "desc") {
        list.sort((a, b) => b.priceNum - a.priceNum);
      }

      return list;
    }

    function renderCards(products) {
      if (!cardTemplate) return;
      grid.innerHTML = "";
      if (products.length === 0) {
        grid.innerHTML =
          '<p class="search-empty">No products match these filters.</p>';
        return;
      }
      products.forEach((product) => {
        grid.innerHTML += renderProductCardHTML(product, cardTemplate);
      });
      if (window.SavedItems) window.SavedItems.wireAllCardButtons();
    }

    function refresh() {
      renderCards(getListings());
    }

    function applyFilterKey(key, value) {
      switch (key) {
        case "category":
          state.category = value === "all" ? "all" : value;
          break;
        case "recency":
          state.recency =
            value === "all" || value === "any" ? null : value;
          break;
        case "price":
          state.freeOnly = value === "free";
          if (value === "asc") {
            state.priceSort = "asc";
          } else if (value === "desc") {
            state.priceSort = "desc";
          } else {
            state.priceSort = null;
          }
          break;
        case "condition":
          state.condition =
            value === "all" || value === "any" ? null : value;
          break;
        default:
          break;
      }
      refresh();
    }

    fetch("components/productCard.html")
      .then((res) => res.text())
      .then((template) => {
        cardTemplate = template;
        refresh();
        initHomeSections(template);
      })
      .catch((err) => console.error("Error loading product card:", err));

    const filters = document.querySelectorAll(".filter");
    filters.forEach((filterEl) => {
      const button = filterEl.querySelector(".filter-btn");
      const key = filterEl.getAttribute("data-filter-key");

      button.addEventListener("click", () => {
        filters.forEach((f) => {
          if (f !== filterEl) f.classList.remove("active");
        });
        filterEl.classList.toggle("active");
      });

      filterEl.querySelectorAll(".filter-dropdown p[data-value]").forEach((p) => {
        p.addEventListener("click", (e) => {
          e.stopPropagation();
          if (key) applyFilterKey(key, p.getAttribute("data-value"));
          const label = p.textContent.trim();
          if (label) button.textContent = `${label} ▾`;
          filterEl.classList.remove("active");
        });
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".filter")) {
        filters.forEach((f) => f.classList.remove("active"));
      }
    });

    return;
  }

  fetch("components/productCard.html")
    .then((res) => res.text())
    .then((template) => initHomeSections(template))
    .catch((err) => console.error("Error loading product card:", err));
})();

const mockProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: "$59.99",
    priceNum: 59.99,
    shipping: "Free shipping",
    image: "images/WirelessHeadphonesCover.jpg",
    images: [
      "images/WirelessHeadphonesCover.jpg",
      "images/WirelessHeadphones2.jpg"
    ],
    category: "gaming",
    postedDays: 2,
    condition: "new",
    model: "Kali Audio",
    city: "Charlotte, NC",
    mapLat: 35.2271,
    mapLng: -80.8431,
    description: "Great pair of over-ear wireless headphones with 30-hour battery life and noise isolation. Used lightly for remote work. Sound quality is excellent, padding still in great shape. Comes with original charging cable and carry pouch.",
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
    image: "images/GamingMouseCover.jpg",
    images: [
      "images/GamingMouseCover.jpg",
      "images/GamingMouse2.jpg",
      "images/GamingMouse3.jpg"
    ],
    category: "gaming",
    postedDays: 0,
    condition: "used-okay",
    model: "Bloody Gaming",
    city: "Concord, NC",
    mapLat: 35.4088,
    mapLng: -80.5795,
    description: "Okay condition. Lightweight ergonomic design with adjustable DPI, programmable side buttons, and a braided cable. Perfect for FPS or everyday use.",
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
    image: "images/MechKeyCover.jpg",
    images: [
      "images/MechKeyCover.jpg",
      "images/MechKey2.jpg",
      "images/MechKey3.jpg"
    ],
    category: "gaming",
    postedDays: 14,
    condition: "used-good",
    model: "Ducky",
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
    image: "images/MonitorCover.jpg",
    images: [
      "images/MonitorCover.jpg",
      "images/Monitor2.jpg",
      "images/Monitor3.jpg",
      "images/Monitor4.jpg"
    ],
    category: "gaming",
    postedDays: 45,
    condition: "like-new",
    model: "BenQ Zowie",
    city: "Gastonia, NC",
    mapLat: 35.2621,
    mapLng: -81.1873,
    description: "24-inch 1080p IPS monitor with crisp colors and wide viewing angles. Minor scuff on the bottom bezel, but it's not visible during use. Includes HDMI and power cable. Great second monitor or starter display.",
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
    image: "images/PCSetupCover.jpg",
    images: [
      "images/PCSetupCover.jpg",
      "images/PCSetup2.jpg",
      "images/PCSetup3.jpg"
    ],
    category: "gaming",
    postedDays: 5,
    condition: "used-good",
    model: "N/A",
    city: "Rock Hill, SC",
    mapLat: 34.9249,
    mapLng: -81.0251,
    description: "Full gaming tower, peripherals, and dual monitors included. Specs: Ryzen 7, RTX 3070, 32GB RAM, 1TB NVMe SSD. Handles any game really. Upgrading to a new build, priced to move fast.",
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
    image: "images/ErgoDeskCover.png",
    images: [
      "images/ErgoDeskCover.png",
      "images/ErgoDesk2.jpg",
      "images/ErgoDesk3.jpg",
      "images/ErgoDesk4.jpg"
    ],
    category: "furniture",
    postedDays: 1,
    condition: "used-good",
    model: "Herman Miller",
    city: "Kannapolis, NC",
    mapLat: 35.4874,
    mapLng: -80.6215,
    description: "Adjustable-height desk. Solid plastic top with minimal surface wear. I can disassemble it if you need it shipped or for easy pickup. Perfect for a home office upgrade.",
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
    image: "images/OfficeChairCover.jpg",
    images: [
      "images/OfficeChairCover.jpg",
      "images/OfficeChair2.jpg",
      "images/OfficeChair3.jpg"
    ],
    category: "furniture",
    postedDays: 60,
    condition: "used-good",
    model: "Herman Miller",
    city: "Salisbury, NC",
    mapLat: 35.6710,
    mapLng: -80.4742,
    description: "Mesh-back office chair with lumbar support and adjustable armrests. Foam has softened slightly over time but is still comfortable for long sessions. A few small scuffs on the base, but functionally perfect.",
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
    image: "images/FigurineCover.jpg",
    images: [
      "images/FigurineCover.jpg",
      "images/Figurine2.jpg",
      "images/Figurine3.jpg",
      "images/Figurine4.jpg"
    ],
    category: "collectibles",
    postedDays: 0,
    condition: "new",
    model: "Disney",
    city: "Mooresville, NC",
    mapLat: 35.5849,
    mapLng: -80.8098,
    description: "Limited-edition Disney figure, in new condition. Purchased as a collector's item. A great addition to any shelf.",
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
    image: "images/PosterCover.jpg",
    images: [
      "images/PosterCover.jpg",
      "images/Poster2.jpg",
      "images/Poster3.jpg",
      "images/Poster4.jpg"
    ],
    category: "collectibles",
    postedDays: 90,
    condition: "used-good",
    model: "Porsche",
    city: "Statesville, NC",
    mapLat: 35.7826,
    mapLng: -80.8873,
    description: "Vintage-style screen-printed poster in good condition with a few small edge creases from storage. Not framed. Dimensions approx. 18×24 inches. Free to a good home, just come pick it up.",
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

  const imageWrap = root.querySelector(".product-image-wrap");
  const ph = imageWrap ? imageWrap.querySelector(".placeholder-box.image-box, #productImagePlaceholder") : null;

  const allImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  if (imageWrap && ph) {
    const carousel = document.createElement("div");
    carousel.className = "carousel-container";

    const track = document.createElement("div");
    track.className = "carousel-track";

    allImages.forEach((src, i) => {
      const img = document.createElement("img");
      img.className = "carousel-slide" + (i === 0 ? " active" : "");
      img.src = src;
      img.alt = `${product.title} photo ${i + 1}`;
      img.draggable = false;
      track.appendChild(img);
    });

    carousel.appendChild(track);

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox-overlay";
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Image viewer");

    const lbImg = document.createElement("img");
    lbImg.className = "lightbox-img";
    lbImg.alt = product.title;

    const lbClose = document.createElement("button");
    lbClose.className = "lightbox-close";
    lbClose.setAttribute("aria-label", "Close image viewer");
    lbClose.innerHTML = "&times;";

    const lbCounter = document.createElement("span");
    lbCounter.className = "lightbox-counter";

    const lbPrev = document.createElement("button");
    lbPrev.className = "lightbox-arrow lightbox-arrow-left";
    lbPrev.setAttribute("aria-label", "Previous image");
    lbPrev.innerHTML = "&#8249;";

    const lbNext = document.createElement("button");
    lbNext.className = "lightbox-arrow lightbox-arrow-right";
    lbNext.setAttribute("aria-label", "Next image");
    lbNext.innerHTML = "&#8250;";

    lightbox.appendChild(lbImg);
    lightbox.appendChild(lbClose);
    lightbox.appendChild(lbCounter);
    if (allImages.length > 1) {
      lightbox.appendChild(lbPrev);
      lightbox.appendChild(lbNext);
    }
    document.body.appendChild(lightbox);

    let lbCurrent = 0;

    function openLightbox(index) {
      lbCurrent = index;
      lbImg.src = allImages[lbCurrent];
      lbImg.alt = `${product.title} photo ${lbCurrent + 1}`;
      lbCounter.textContent = `${lbCurrent + 1} / ${allImages.length}`;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    function lbGoTo(index) {
      lbCurrent = (index + allImages.length) % allImages.length;
      lbImg.src = allImages[lbCurrent];
      lbImg.alt = `${product.title} photo ${lbCurrent + 1}`;
      lbCounter.textContent = `${lbCurrent + 1} / ${allImages.length}`;
    }

    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    lbPrev && lbPrev.addEventListener("click", (e) => { e.stopPropagation(); lbGoTo(lbCurrent - 1); });
    lbNext && lbNext.addEventListener("click", (e) => { e.stopPropagation(); lbGoTo(lbCurrent + 1); });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbGoTo(lbCurrent - 1);
      if (e.key === "ArrowRight") lbGoTo(lbCurrent + 1);
    });

    track.addEventListener("click", () => {
      const slides = track.querySelectorAll(".carousel-slide");
      let activeIndex = 0;
      slides.forEach((s, i) => { if (s.classList.contains("active")) activeIndex = i; });
      openLightbox(activeIndex);
    });
    track.style.cursor = "zoom-in";

    if (allImages.length > 1) {
      const btnPrev = document.createElement("button");
      btnPrev.className = "carousel-arrow carousel-arrow-left";
      btnPrev.setAttribute("aria-label", "Previous image");
      btnPrev.innerHTML = "&#8249;";

      const btnNext = document.createElement("button");
      btnNext.className = "carousel-arrow carousel-arrow-right";
      btnNext.setAttribute("aria-label", "Next image");
      btnNext.innerHTML = "&#8250;";

      carousel.appendChild(btnPrev);
      carousel.appendChild(btnNext);

      const counter = document.createElement("span");
      counter.className = "carousel-counter";
      counter.textContent = `1 / ${allImages.length}`;
      carousel.appendChild(counter);

      let current = 0;
      const slides = track.querySelectorAll(".carousel-slide");

      function goTo(index) {
        slides[current].classList.remove("active");
        current = (index + allImages.length) % allImages.length;
        slides[current].classList.add("active");
        counter.textContent = `${current + 1} / ${allImages.length}`;
      }

      btnPrev.addEventListener("click", (e) => { e.stopPropagation(); goTo(current - 1); });
      btnNext.addEventListener("click", (e) => { e.stopPropagation(); goTo(current + 1); });
    }

    ph.replaceWith(carousel);
  }

  const dotsEl = root.querySelector(".carousel-dots");
  if (dotsEl) dotsEl.remove();

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

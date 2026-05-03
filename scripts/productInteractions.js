const wishlistButton = document.querySelector(".wishlist-btn");

if (wishlistButton) {
  const productId = new URLSearchParams(window.location.search).get("id");
  if (productId) {
    wishlistButton.dataset.productId = productId;
  }

  if (window.SavedItems && productId && window.SavedItems.isSaved(productId)) {
    window.SavedItems.applyWishlistButtonState(wishlistButton, true);
  }

  wishlistButton.addEventListener("click", () => {
    if (window.SavedItems && productId) {
      const doSave = () => {
        const titleEl = document.querySelector(".product-heading-text .section-title");
        const priceEl = document.querySelector(".product-price");
        const imgEl   = document.querySelector(".product-hero-image");
        const meta = {
          title: titleEl ? titleEl.textContent.trim() : "Product",
          price: priceEl ? priceEl.textContent.trim() : "",
          image: imgEl   ? imgEl.src : ""
        };
        const nowSaved = window.SavedItems.toggle(productId, meta);
        window.SavedItems.applyWishlistButtonState(wishlistButton, nowSaved);
      };
      if (window.AuthModal && !window.Auth.isLoggedIn()) {
        window.AuthModal.requireAuth(doSave);
      } else {
        doSave();
      }
    } else {
      wishlistButton.classList.toggle("is-liked");
      const isLiked = wishlistButton.classList.contains("is-liked");
      wishlistButton.setAttribute("aria-pressed", isLiked);
      wishlistButton.textContent = isLiked ? "Saved" : "Save";
    }
  });
}

(function loadCustomPostedListing() {
  const params = new URLSearchParams(window.location.search);
  const isCustomListing = params.get("listing") === "custom";

  if (!isCustomListing) {
    return;
  }

  const savedListing = localStorage.getItem("currentMarketplaceListing");

  if (!savedListing) {
    return;
  }

  const listing = JSON.parse(savedListing);
  const titleEl = document.getElementById("productTitle");
  const locationEl = document.getElementById("productLocationText");
  const listedEl = document.getElementById("productListedText");
  const priceEl = document.getElementById("productPrice");
  const detailsList = document.getElementById("productDetailsList");
  const descriptionEl = document.getElementById("productDescriptionText");
  const mapPlaceholder = document.getElementById("productMapPlaceholder");
  const imagePlaceholder = document.getElementById("productImagePlaceholder");
  const imageThumbs = document.getElementById("productImageThumbs");

  if (titleEl) {
    titleEl.textContent = listing.title || "Untitled Listing";
  }

  if (locationEl) {
    locationEl.textContent = listing.zip ? "ZIP Code: " + listing.zip : "Location not provided";
  }

  if (listedEl) {
    listedEl.textContent = "Listed just now";
  }

  if (priceEl) {
    priceEl.textContent = listing.price || "$0";
  }

  if (detailsList) {
    detailsList.innerHTML = "";

    const details = [
      ["Category", listing.category],
      ["Condition", listing.condition],
      ["Size", listing.size],
      ["Brand", listing.brand],
      ["Model", listing.model]
    ];

    details.forEach(function (detail) {
      const label = detail[0];
      const value = detail[1];

      if (!value) {
        return;
      }

      const li = document.createElement("li");
      li.textContent = label + ": " + value;
      detailsList.appendChild(li);
    });

    if (!detailsList.children.length) {
      const li = document.createElement("li");
      li.textContent = "No extra product details provided";
      detailsList.appendChild(li);
    }
  }

  if (descriptionEl) {
    descriptionEl.textContent = listing.description || "No description provided.";
  }

  if (mapPlaceholder) {
    mapPlaceholder.textContent = listing.zip ? "ZIP Code: " + listing.zip : "Location not provided";
  }

  if (listing.images && listing.images.length && imagePlaceholder) {
    const heroImage = document.createElement("img");
    heroImage.className = "product-hero-image";
    heroImage.src = listing.images[0];
    heroImage.alt = listing.title || "Posted listing image";
    heroImage.width = 800;
    heroImage.height = 600;
    imagePlaceholder.replaceWith(heroImage);
  }

  if (imageThumbs) {
    imageThumbs.innerHTML = "";

    if (listing.images && listing.images.length) {
      listing.images.forEach(function (imageSrc, index) {
        const thumb = document.createElement("img");
        thumb.className = "product-image-thumb";
        thumb.src = imageSrc;
        thumb.alt = (listing.title || "Listing") + " thumbnail " + (index + 1);
        thumb.width = 56;
        thumb.height = 56;
        imageThumbs.appendChild(thumb);
      });
    } else {
      const countText = document.createElement("p");
      countText.className = "product-image-count";
      countText.textContent = "No listing photos were uploaded.";
      imageThumbs.appendChild(countText);
    }
  }
})();

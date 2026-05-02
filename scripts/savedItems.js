(function () {
  var STORAGE_KEY = "marketplace_saved_items";

  var store = (function () {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  })();

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
    }
  }
 
  function toggle(id, meta) {
    var key = String(id);
    if (store[key]) {
      delete store[key];
      persist();
      syncAllButtons(key, false);
      return false;
    } else {
      store[key] = Object.assign({ id: key }, meta);
      persist();
      syncAllButtons(key, true);
      return true;
    }
  }

  function isSaved(id) {
    return Boolean(store[String(id)]);
  }

  function getAll() {
    return Object.values(store);
  }

 
  function syncAllButtons(id, saved) {
    document.querySelectorAll(".save-btn[data-product-id=\"" + id + "\"]").forEach(function (btn) {
      applyCardButtonState(btn, saved);
    });

    var wishlistBtn = document.querySelector(".wishlist-btn");
    if (wishlistBtn && String(wishlistBtn.dataset.productId) === String(id)) {
      applyWishlistButtonState(wishlistBtn, saved);
    }
  }

  function applyCardButtonState(btn, saved) {
    if (saved) {
      btn.classList.remove("is-saved");
      void btn.offsetWidth;
      btn.classList.add("is-saved");
      btn.textContent = "Saved";
    } else {
      btn.classList.remove("is-saved");
      btn.textContent = "Save";
    }
    btn.setAttribute("aria-pressed", String(saved));
  }

  function applyWishlistButtonState(btn, saved) {
    if (saved) {
      btn.classList.add("is-liked");
      btn.setAttribute("aria-pressed", "true");
      btn.textContent = "Saved";
    } else {
      btn.classList.remove("is-liked");
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = "Save";
    }
  }


  function wireCardButton(btn) {
    var id = btn.dataset.productId;
    if (!id) return;

    applyCardButtonState(btn, isSaved(id));

    if (btn.dataset.wired) return;
    btn.dataset.wired = "1";

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var meta = {
        title: btn.dataset.productTitle || "Unknown Product",
        price: btn.dataset.productPrice || "",
        image: btn.dataset.productImage || ""
      };
      toggle(id, meta);
    });
  }


  function wireAllCardButtons() {
    document.querySelectorAll(".save-btn[data-product-id]").forEach(wireCardButton);
  }


  function openSavedItemsPanel(accountOverlay, closeAccountMenu) {
    var panel = document.getElementById("account-menu-panel");
    if (!panel) return;

    var items = getAll();
    var panelContent = panel.querySelector(".account-menu-content");
    if (!panelContent) return;

    var html = '<div class="account-menu-header">' +
      '<div>' +
        '<p class="account-menu-eyebrow">Account</p>' +
        '<h2 id="account-menu-title">Saved Items</h2>' +
      '</div>' +
      '<button class="account-menu-close" id="saved-panel-back" type="button" aria-label="Back to menu">←</button>' +
    '</div>';

    if (items.length === 0) {
      html += '<p style="padding:1rem 0; color:var(--text-muted); font-size:0.95rem;">No saved items yet.</p>';
    } else {
      html += '<ul class="saved-items-list">';
      items.forEach(function (item) {
        html += '<li class="saved-item-row">' +
          (item.image ? '<img src="' + escapeAttr(item.image) + '" alt="' + escapeAttr(item.title) + '" class="saved-item-thumb" width="48" height="48">' : '<div class="saved-item-thumb saved-item-thumb--placeholder"></div>') +
          '<div class="saved-item-info">' +
            '<a href="product.html?id=' + escapeAttr(item.id) + '" class="saved-item-title">' + escapeHtml(item.title) + '</a>' +
            (item.price ? '<span class="saved-item-price">' + escapeHtml(item.price) + '</span>' : '') +
          '</div>' +
          '<button class="saved-item-remove" data-remove-id="' + escapeAttr(item.id) + '" type="button" aria-label="Remove ' + escapeAttr(item.title) + '">✕</button>' +
        '</li>';
      });
      html += '</ul>';
    }

    panelContent.innerHTML = html;

    // Back button → restore normal account menu
    var backBtn = document.getElementById("saved-panel-back");
    if (backBtn) {
      backBtn.addEventListener("click", function () {
        restoreAccountMenuContent(panelContent, closeAccountMenu);
      });
    }


    panelContent.querySelectorAll(".saved-item-remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var removeId = btn.dataset.removeId;
        if (removeId) {
          toggle(removeId, {});
  
          openSavedItemsPanel(accountOverlay, closeAccountMenu);
        }
      });
    });
  }

  function restoreAccountMenuContent(panelContent, closeAccountMenu) {
    panelContent.innerHTML =
      '<div class="account-menu-header">' +
        '<div>' +
          '<p class="account-menu-eyebrow">Account</p>' +
          '<h2 id="account-menu-title">Your Menu</h2>' +
        '</div>' +
        '<button class="account-menu-close" type="button" aria-label="Close account menu">✕</button>' +
      '</div>' +
      '<div class="account-menu-actions">' +
        '<button class="account-menu-action" type="button">Profile</button>' +
        '<button class="account-menu-action saved-items-btn" type="button">Saved Items</button>' +
        '<button class="account-menu-action" type="button">Dark Mode / Light Mode</button>' +
        '<button class="account-menu-action" id="menu-signin-btn" type="button">Sign In / Create Account</button>' +
        '<button class="account-menu-action logout" id="menu-logout-btn" type="button">Log Out</button>' +
      '</div>';

    // Re-wire the new close button
    var newClose = panelContent.querySelector(".account-menu-close");
    if (newClose && closeAccountMenu) {
      newClose.addEventListener("click", closeAccountMenu);
    }

    // Re-wire Saved Items button
    var savedBtn = panelContent.querySelector(".saved-items-btn");
    if (savedBtn) {
      savedBtn.addEventListener("click", function () {
        openSavedItemsPanel(null, closeAccountMenu);
      });
    }

    wireDarkModeButton(panelContent);
    wireAuthButtons(panelContent);
  }

  function wireDarkModeButton(scope) {
    var dmBtn = scope.querySelector(".account-menu-action:not(.saved-items-btn):not(.logout):not(#menu-signin-btn):not(#menu-logout-btn)");
  }

  function wireAuthButtons(scope) {

  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return String(str).replace(/"/g, "&quot;");
  }

  // Public API
  window.SavedItems = {
    toggle: toggle,
    isSaved: isSaved,
    getAll: getAll,
    wireAllCardButtons: wireAllCardButtons,
    wireCardButton: wireCardButton,
    openSavedItemsPanel: openSavedItemsPanel,
    applyWishlistButtonState: applyWishlistButtonState,
    syncAllButtons: syncAllButtons
  };
})();

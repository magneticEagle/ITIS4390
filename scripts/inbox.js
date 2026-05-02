(function () {
  "use strict";

  var STORAGE_KEY = "marketplace_inbox";

  function getThreads() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveThreads(threads) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
    } catch (e) {}
  }

  function upsertThread(thread) {
    var threads = getThreads();
    var idx = threads.findIndex(function (t) {
      return t.seller === thread.seller && t.item === thread.item;
    });
    if (idx !== -1) {
      threads[idx].timestamp = thread.timestamp;
      threads[idx].image = thread.image || threads[idx].image;
    } else {
      threads.unshift(thread); // newest first
    }
    saveThreads(threads);
  }

  window.Inbox = {
    record: function (opts) {
      upsertThread({
        seller:    opts.seller    || "Seller",
        item:      opts.item      || "Item",
        image:     opts.image     || null,
        productId: opts.productId || null,
        returnUrl: opts.returnUrl || null,
        timestamp: Date.now()
      });
    },
    getThreads: getThreads,
    count: function () { return getThreads().length; }
  };


  window.Inbox.wireDropdown = function (headerScope) {
    var trigger  = headerScope.querySelector(".inbox-trigger");
    var panel    = headerScope.querySelector("#inbox-panel");
    var badge    = headerScope.querySelector("#inboxBadge");
    var listEl   = headerScope.querySelector("#inboxList");

    if (!trigger || !panel) return;

    function renderList() {
      var threads = getThreads();

      if (threads.length > 0) {
        badge.textContent = threads.length > 9 ? "9+" : String(threads.length);
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }

      if (threads.length === 0) {
        listEl.innerHTML = '<li class="inbox-empty">No messages yet</li>';
        return;
      }

      listEl.innerHTML = "";
      threads.forEach(function (t) {
        var li = document.createElement("li");
        li.className = "inbox-thread";

        var mins = Math.round((Date.now() - t.timestamp) / 60000);
        var timeLabel = mins < 1 ? "Just now"
          : mins < 60 ? mins + "m ago"
          : Math.round(mins / 60) + "h ago";

        var avatarHTML = t.image
          ? '<img class="inbox-avatar" src="' + escHtml(t.image) + '" alt="" width="40" height="40">'
          : '<div class="inbox-avatar inbox-avatar-placeholder">'
              + escHtml(t.seller.charAt(0).toUpperCase())
            + '</div>';

        var href = "message.html"
          + "?seller=" + encodeURIComponent(t.seller)
          + "&item="   + encodeURIComponent(t.item)
          + (t.returnUrl ? "&from=" + encodeURIComponent(t.returnUrl) : "");

        li.innerHTML =
          '<a class="inbox-thread-link" href="' + escHtml(href) + '">'
          + avatarHTML
          + '<div class="inbox-thread-body">'
          +   '<span class="inbox-thread-seller">' + escHtml(t.seller) + '</span>'
          +   '<span class="inbox-thread-item">'   + escHtml(t.item)   + '</span>'
          + '</div>'
          + '<span class="inbox-thread-time">' + escHtml(timeLabel) + '</span>'
          + '</a>';

        listEl.appendChild(li);
      });
    }

    function escHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;");
    }

    function openPanel() {
      renderList();
      panel.classList.remove("hidden");
      trigger.setAttribute("aria-expanded", "true");
    }

    function closePanel() {
      panel.classList.add("hidden");
      trigger.setAttribute("aria-expanded", "false");
    }

    function togglePanel() {
      if (panel.classList.contains("hidden")) {
        openPanel();
      } else {
        closePanel();
      }
    }

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      togglePanel();
    });

    document.addEventListener("click", function (e) {
      if (!panel.classList.contains("hidden")
          && !panel.contains(e.target)
          && e.target !== trigger) {
        closePanel();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.classList.contains("hidden")) {
        closePanel();
      }
    });

    renderList();
  };

})();

(function () {
  "use strict";

  var params     = new URLSearchParams(window.location.search);
  var sellerName = params.get("seller") || "Seller";
  var itemName   = params.get("item")   || "this item";
  var returnUrl  = params.get("from")   || "product.html";

  var sellerEl = document.getElementById("messageSellerName");
  var itemEl   = document.getElementById("messageItemName");
  if (sellerEl) sellerEl.textContent = sellerName;
  if (itemEl)   itemEl.textContent   = "Re: " + decodeURIComponent(itemName);

  var backBtn = document.getElementById("messageBackBtn");
  if (backBtn) {
    backBtn.addEventListener("click", function () {
      window.location.href = decodeURIComponent(returnUrl);
    });
  }

  function getTimestamp() {
    var now = new Date();
    var h   = now.getHours();
    var m   = now.getMinutes();
    var ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return h + ":" + (m < 10 ? "0" + m : m) + " " + ampm;
  }

  var input    = document.getElementById("messageInput");
  var sendBtn  = document.getElementById("messageSendBtn");
  var chatArea = document.getElementById("messageChatArea");

  function sendMessage() {
    var text = input ? input.value.trim() : "";
    if (!text) return;

    var wrap = document.createElement("div");
    wrap.className = "message-bubble-wrap";

    var bubble = document.createElement("div");
    bubble.className = "message-bubble sent";
    bubble.textContent = text;

    var ts = document.createElement("span");
    ts.className = "message-timestamp";
    ts.textContent = getTimestamp();

    wrap.appendChild(bubble);
    wrap.appendChild(ts);

    if (chatArea) {
      chatArea.appendChild(wrap);
      chatArea.scrollTop = chatArea.scrollHeight;
    }

    input.value = "";
    input.focus();
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
  }

  if (input) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") sendMessage();
    });
    input.focus();
  }

})();

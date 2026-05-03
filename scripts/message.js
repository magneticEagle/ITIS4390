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

  var avatarEl = document.querySelector(".message-seller-avatar");
  if (avatarEl && sellerName) {
    avatarEl.textContent = sellerName.charAt(0).toUpperCase();
  }

  var backBtn = document.getElementById("messageBackBtn");
  if (backBtn) {
    backBtn.addEventListener("click", function () {
      window.location.href = decodeURIComponent(returnUrl);
    });
  }

  var THREAD_KEY = "marketplace_msgs__" +
    encodeURIComponent(sellerName) + "__" +
    encodeURIComponent(decodeURIComponent(itemName));

  function loadMessages() {
    try {
      return JSON.parse(localStorage.getItem(THREAD_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function persistMessage(text, timestampStr) {
    var msgs = loadMessages();
    msgs.push({ text: text, timestamp: timestampStr, time: Date.now() });
    try {
      localStorage.setItem(THREAD_KEY, JSON.stringify(msgs));
    } catch (e) {}
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

  function renderBubble(text, timestampStr) {
    var wrap = document.createElement("div");
    wrap.className = "message-bubble-wrap";

    var bubble = document.createElement("div");
    bubble.className = "message-bubble sent";
    bubble.textContent = text;

    var ts = document.createElement("span");
    ts.className = "message-timestamp";
    ts.textContent = timestampStr;

    wrap.appendChild(bubble);
    wrap.appendChild(ts);
    return wrap;
  }

  if (chatArea) {
    var saved = loadMessages();
    saved.forEach(function (msg) {
      chatArea.appendChild(renderBubble(msg.text, msg.timestamp));
    });
    if (saved.length) chatArea.scrollTop = chatArea.scrollHeight;
  }

  function sendMessage() {
    var text = input ? input.value.trim() : "";
    if (!text) return;

    var timestampStr = getTimestamp();

    if (chatArea) {
      chatArea.appendChild(renderBubble(text, timestampStr));
      chatArea.scrollTop = chatArea.scrollHeight;
    }

    persistMessage(text, timestampStr);

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

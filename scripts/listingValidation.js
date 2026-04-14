const form = document.getElementById("listingForm");
const title = document.getElementById("title");
const price = document.getElementById("price");
const zip = document.getElementById("zip");
const category = document.getElementById("category");
const condition = document.getElementById("condition");
const postBtn = document.getElementById("postBtn");

function showError(input, messageEl, message) {
  input.classList.add("invalid");
  input.classList.remove("valid");
  messageEl.textContent = message;
  messageEl.classList.add("error");
  messageEl.classList.remove("success");
}

function showSuccess(input, messageEl, message) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  messageEl.textContent = message;
  messageEl.classList.remove("error");
  messageEl.classList.add("success");
}

function validateTitle() {
  const msg = document.getElementById("titleMessage");
  const value = title.value.trim();

  if (value.length === 0) {
    showError(title, msg, "Enter a title");
    return false;
  }

  if (value.length > 50) {
    showError(title, msg, "Title must be 50 characters or less");
    return false;
  }

  showSuccess(title, msg, "Title is valid");
  return true;
}

function validatePrice() {
  const msg = document.getElementById("priceMessage");
  const value = price.value.trim();

  if (value.length === 0) {
    showError(price, msg, "Enter a price ($0 - $9,999,999)");
    return false;
  }

  const pricePattern = /^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?$/;

  if (!pricePattern.test(value)) {
    showError(price, msg, "Enter a valid price using numbers only (e.g., 1234.56 or 1,234.56)");
    return false;
  }

  const num = Number(value.replace(/,/g, ""));

  if (isNaN(num)) {
    showError(price, msg, "Enter a valid price like 124.54 or 1,424.42");
    return false;
  }

  if (num < 0 || num > 9999999) {
    showError(price, msg, "Price must be between $0 and $9,999,999");
    return false;
  }

  showSuccess(price, msg, "Price is valid");
  return true;
}

function validateZip() {
  const msg = document.getElementById("zipMessage");
  const value = zip.value.trim();

  if (value.length === 0) {
    showError(zip, msg, "Enter a ZIP Code");
    return false;
  }

  if (!/^\d{5}$/.test(value)) {
    showError(zip, msg, "ZIP Code must be exactly 5 numbers");
    return false;
  }

  showSuccess(zip, msg, "ZIP is valid");
  return true;
}

function validateCategory() {
  const msg = document.getElementById("categoryMessage");

  if (category.value === "") {
    showError(category, msg, "Select a category");
    return false;
  }

  showSuccess(category, msg, "Category selected");
  return true;
}

function validateCondition() {
  const msg = document.getElementById("conditionMessage");

  if (condition.value === "") {
    showError(condition, msg, "Select a condition");
    return false;
  }

  showSuccess(condition, msg, "Condition selected");
  return true;
}

title.addEventListener("input", validateTitle);
title.addEventListener("blur", validateTitle);

price.addEventListener("input", validatePrice);
price.addEventListener("blur", validatePrice);

zip.addEventListener("input", validateZip);
zip.addEventListener("blur", validateZip);

category.addEventListener("change", validateCategory);
category.addEventListener("blur", validateCategory);

condition.addEventListener("change", validateCondition);
condition.addEventListener("blur", validateCondition);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const titleValid = validateTitle();
  const priceValid = validatePrice();
  const zipValid = validateZip();
  const categoryValid = validateCategory();
  const conditionValid = validateCondition();

  if (!titleValid || !priceValid || !zipValid || !categoryValid || !conditionValid) {
    return;
  }

  postBtn.disabled = true;
  postBtn.textContent = "Posting...";

  setTimeout(function () {
    window.location.href = "product.html?posted=1";
  }, 1200);
});

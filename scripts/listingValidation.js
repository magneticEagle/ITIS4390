const form = document.getElementById("listingForm");
const title = document.getElementById("title");
const price = document.getElementById("price");
const zip = document.getElementById("zip");
const category = document.getElementById("category");
const condition = document.getElementById("condition");
const postBtn = document.getElementById("postBtn");
const imageInput = document.getElementById("listingImages");
const imageMessage = document.getElementById("imageMessage");
const imagePreviewGrid = document.getElementById("imagePreviewGrid");

const MAX_IMAGES = 10;
let selectedImageFiles = [];

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

function renderImagePreviews() {
  imagePreviewGrid.innerHTML = "";

  selectedImageFiles.forEach(function (file, index) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      const previewCard = document.createElement("div");
      previewCard.className = "image-preview-card";

      const img = document.createElement("img");
      img.src = reader.result;
      img.alt = "Listing image preview " + (index + 1);

      const count = document.createElement("span");
      count.className = "image-preview-count";
      count.textContent = String(index + 1);

      previewCard.appendChild(img);
      previewCard.appendChild(count);
      imagePreviewGrid.appendChild(previewCard);
    });

    reader.readAsDataURL(file);
  });
}

function validateImages() {
  const uploadBox = document.querySelector(".image-upload-box");

  uploadBox.classList.remove("invalid", "valid");

  if (selectedImageFiles.length === 0) {
    imageMessage.textContent = "No images selected yet. You can still post without photos.";
    imageMessage.classList.remove("error");
    imageMessage.classList.add("success");
    uploadBox.classList.add("valid");
    return true;
  }

  if (selectedImageFiles.length > MAX_IMAGES) {
    imageMessage.textContent = "You can upload up to 10 images.";
    imageMessage.classList.add("error");
    imageMessage.classList.remove("success");
    uploadBox.classList.add("invalid");
    return false;
  }

  imageMessage.textContent = selectedImageFiles.length + " image(s) selected";
  imageMessage.classList.remove("error");
  imageMessage.classList.add("success");
  uploadBox.classList.add("valid");
  return true;
}

function handleImageSelection() {
  const chosenFiles = Array.from(imageInput.files || []);

  if (chosenFiles.length > MAX_IMAGES) {
    selectedImageFiles = chosenFiles.slice(0, MAX_IMAGES);
    imageMessage.textContent = "Only the first 10 images were kept.";
    imageMessage.classList.add("error");
    imageMessage.classList.remove("success");
  } else {
    selectedImageFiles = chosenFiles;
  }

  renderImagePreviews();
  validateImages();
}

function readFileAsDataURL(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      resolve(reader.result);
    });

    reader.addEventListener("error", function () {
      reject(new Error("Could not read image file."));
    });

    reader.readAsDataURL(file);
  });
}

function formatStoredPrice(value) {
  return value.trim().startsWith("$") ? value.trim() : "$" + value.trim();
}

function getCategoryLabel(value) {
  const labels = {
    furniture: "Furniture",
    electronics: "Electronics",
    clothing: "Clothing"
  };

  return labels[value] || value;
}

function getConditionLabel(value) {
  const labels = {
    new: "New",
    "like-new": "Like New",
    used: "Used"
  };

  return labels[value] || value;
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

imageInput.addEventListener("change", handleImageSelection);
validateImages();

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const titleValid = validateTitle();
  const priceValid = validatePrice();
  const zipValid = validateZip();
  const categoryValid = validateCategory();
  const conditionValid = validateCondition();
  const imagesValid = validateImages();

  if (!titleValid || !priceValid || !zipValid || !categoryValid || !conditionValid || !imagesValid) {
    return;
  }

  postBtn.disabled = true;
  postBtn.textContent = "Posting...";

  try {
    const imageData = await Promise.all(
      selectedImageFiles.map(function (file) {
        return readFileAsDataURL(file);
      })
    );

    const listingData = {
      title: title.value.trim(),
      price: formatStoredPrice(price.value),
      zip: zip.value.trim(),
      category: getCategoryLabel(category.value),
      condition: getConditionLabel(condition.value),
      description: document.getElementById("description").value.trim(),
      size: document.getElementById("size").value.trim(),
      brand: document.getElementById("brand").value.trim(),
      model: document.getElementById("model").value.trim(),
      images: imageData,
      postedAt: new Date().toISOString()
    };

    localStorage.setItem("currentMarketplaceListing", JSON.stringify(listingData));

    setTimeout(function () {
      window.location.href = "product.html?posted=1&listing=custom";
    }, 1200);
  } catch (error) {
    postBtn.disabled = false;
    postBtn.textContent = "Post";
    imageMessage.textContent = "Something went wrong while reading the selected images.";
    imageMessage.classList.add("error");
    imageMessage.classList.remove("success");
  }
});

// Wishlist interaction for the product page
const wishlistButton = document.querySelector(".wishlist-btn");

if (wishlistButton) {
  wishlistButton.addEventListener("click", () => {
    // Toggle saved state
    wishlistButton.classList.toggle("is-liked");

    // Update state
    const isLiked = wishlistButton.classList.contains("is-liked");
    wishlistButton.setAttribute("aria-pressed", isLiked);

    // Changes button text
    wishlistButton.textContent = isLiked ? "Wishlisted" : "Wishlist";
  });
}
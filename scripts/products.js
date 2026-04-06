// Mock data
const mockProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: "$59.99",
    shipping: "Free shipping",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 2,
    title: "Gaming Mouse",
    price: "$29.99",
    shipping: "$5 shipping",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 3,
    title: "Mechanical Keyboard",
    price: "$89.99",
    shipping: "Free shipping",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 4,
    title: "Monitor 24\"",
    price: "$149.99",
    shipping: "$15 shipping",
    image: "https://via.placeholder.com/300x200"
  }
];

const grid = document.getElementById("product-grid");

// Load template first
fetch("components/productCard.html")
  .then(res => res.text())
  .then(template => {
    
    mockProducts.forEach(product => {
      let cardHTML = template;

      // Replace placeholders
      cardHTML = cardHTML.replace(/{{title}}/g, product.title);
      cardHTML = cardHTML.replace(/{{price}}/g, product.price);
      cardHTML = cardHTML.replace(/{{shipping}}/g, product.shipping);
      cardHTML = cardHTML.replace(/{{image}}/g, product.image);

      grid.innerHTML += cardHTML;
    });

  })
  .catch(err => console.error("Error loading product card:", err));

  const filters = document.querySelectorAll(".filter");

// Handle filter dropdowns
filters.forEach(filter => {
  const button = filter.querySelector(".filter-btn");

  button.addEventListener("click", () => {
    // Close other dropdowns
    filters.forEach(f => {
      if (f !== filter) f.classList.remove("active");
    });

    // Toggle this one
    filter.classList.toggle("active");
  });
});

// Optional: click outside to close
document.addEventListener("click", (e) => {
  if (!e.target.closest(".filter")) {
    filters.forEach(f => f.classList.remove("active"));
  }
});

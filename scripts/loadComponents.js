document.querySelectorAll("[data-component]").forEach(el => {
  const file = el.getAttribute("data-component");

  fetch(file)
    .then(res => res.text())
    .then(data => {
      el.innerHTML = data;
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
});
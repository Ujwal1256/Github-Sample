async function fetchProducts() {
  let category = document.getElementById("category").value.toLowerCase();
  let minPrice = parseFloat(document.getElementById("min-price").value) || 0;
  let maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;

  let messageDiv = document.getElementById("message");
  let productList = document.getElementById("product-list");

  productList.innerHTML = "";
  messageDiv.textContent = "Loading...";

  let url = `https://6820588072e59f922ef8614b.mockapi.io/products`;

  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let products = await response.json();

    if (category) {
      products = products.filter(product => product.category.toLowerCase() === category);
    }

    products = products.filter(product => {
      let price = parseFloat(product.price);
      return price >= minPrice && price <= maxPrice;
    });

    products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    if (products.length === 0) {
      messageDiv.textContent = "No products found.";
      return;
    }

    messageDiv.textContent = "";
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Price : $${product.price}</p>
        <p>Category :${product.category}</p>
      `;
      productList.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    messageDiv.textContent = "Failed to load products. Please try again.";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

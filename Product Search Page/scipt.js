async function fetchProducts() {

    let category = document.getElementById("category").value;
    let minPrice = document.getElementById("minPrice").value;
    let maxPrice = document.getElementById("maxPrice").value;
    let messageDiv = document.getElementById("message");
    let productList = document.getElementById("productList");

    productList.innerHTML = ""; 
    messageDiv.textContent = "Loading...";
    let url = `https://68203f4b72e59f/products?category=${category}&min_price=${minPrice}&max_price=${maxPrice}&sort=asc`;

   try {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    let products = await response.json();
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
        <p>$${product.price}</p>
      `;
      productList.appendChild(card);
    });


   } catch (error) {
    console.error(error);
    messageDiv.textContent = "Failed to load products. Please try again.";
   }

}
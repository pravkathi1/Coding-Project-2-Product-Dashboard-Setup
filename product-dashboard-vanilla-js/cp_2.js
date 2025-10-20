// step 3 define function
function fetchProductsThen() {
  fetch("https://www.course-api.com/javascript-store-products")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Products fetched successfully!");
      data.forEach((product) => {
        console.log(product.fields.name);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error.message);
    });
}
// call the function to run it when the script loads
fetchProductsThen();

// step 4 create a function fetchProductsAsync()
async function fetchProductsAsync() {
  try {
    const response = await fetch("https://www.course-api.com/javascript-store-products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();
    displayProducts(products); // call display function
  } catch (error) {
    handleError(error); // call error handler
  }
}

// function to display products
function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // clear before adding new items

  products.forEach((product) => {
    const { name, price, image } = product.fields;
    const imgURL = image[0].url;

    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${imgURL}" alt="${name}">
      <h3>${name}</h3>
      <p>$${(price / 100).toFixed(2)}</p>
    `;

    container.appendChild(productCard);
  });
}

// function to handle errors
function handleError(error) {
  console.error("Error loading products:", error.message);
  const container = document.getElementById("product-container");
  container.innerHTML = `<p style="color: red;">Failed to load products. Please try again later.</p>`;
}

// call the async function
fetchProductsAsync();

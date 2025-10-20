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


// function to handle errors
function handleError(error) {
  console.error("Error loading products:", error.message);
  const container = document.getElementById("product-container");
  container.innerHTML = `<p style="color: red;">Failed to load products. Please try again later.</p>`;
}

// call the async function
fetchProductsAsync();

//step 5 displayProducts(products)
function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // Clear previous content

  // limit to first 5 products
  const topProducts = products.slice(0, 5);

  topProducts.forEach((product) => {
    const { name, price, image } = product.fields;
    const imgURL = image[0].url;

    // create product card
    const card = document.createElement("div");
    card.classList.add("product-card");

    // add product details
    card.innerHTML = `
      <img src="${imgURL}" alt="${name}" class="product-img">
      <h3 class="product-name">${name}</h3>
      <p class="product-price">$${(price / 100).toFixed(2)}</p>
    `;

    // app to container
    container.appendChild(card);
  });
}


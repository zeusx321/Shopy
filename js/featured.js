let categories;
let categoriesDiv = document.querySelector(".categories");
let arrowLeft = document.querySelector(".arrow-left");
let arrowRight = document.querySelector(".arrow-right");
let featuredProducts = document.querySelector(".featured-products")


let count = 1;

async function getPFroducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    data = await response.json();
    console.log(categories);

    const res = data.products.slice(7, 13);

    console.log(res)
    
    res.forEach((item) => {
      featuredProducts.innerHTML += `
        <div class="featured-product-div" key=${item.id}>
          <div class="product-img-div">
            <img src=${item.thumbnail} alt=${item.title}>
          </div>
          <div class="avaliable-product-div
          ${(item.availabilityStatus ==="In Stock")? "green-stock" : "low-stock"}
          "><p>${item.availabilityStatus}</p></div>
          <h3>${item.title}</h3>
          <div class="brand-product-div"><p>${item.brand}</p></div>
          <div class="description-product-div"><p>${item.description}</p></div>
          <div class="price-product-div">
            <p>${item.price}$</p>
            <div class="counter-div">
              <button class="black-button product-button minus-botton">-</button>
              <p class="counter">${count}</p>
              <button class="black-button product-button plus-botton">+</button>
            </div>
          </div>
          <button class="black-button product-button">Add To Card</button>
        </div>
      `
    })
    

  } catch (error) {
    console.error(error);
  }
}

getPFroducts();

featuredProducts.addEventListener("click", (e) => {
  const countEl = e.target.parentElement.querySelector(".counter");
  const counter = parseInt(countEl.textContent, 10) || 1;

  if (e.target.classList.contains("minus-botton")) {
    if (counter > 1) {
      countEl.textContent = counter - 1;
    }
  }

  if (e.target.classList.contains("plus-botton")) {
    if (counter < 10) {
      countEl.textContent = counter + 1;
    }
  }
})


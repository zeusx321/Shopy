let data;
let categories;
let categoriesDiv = document.querySelector(".categories");
let arrowLeft = document.querySelector(".arrow-left");
let arrowRight = document.querySelector(".arrow-right");

async function getCategories() {
  try {
    const response = await fetch("https://dummyjson.com/products/categories");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    categories = await response.json();
    console.log(categories);

    let categoriesHTML = "";
    categories.forEach((item) => {
      categoriesHTML += `<h3>${item.name}</h3>`;
    });

    categoriesDiv.insertAdjacentHTML("beforeend", categoriesHTML);

  } catch (error) {
    console.error(error);
  }
}

getCategories();

if (arrowLeft) {
    arrowLeft.onclick = () => {
        categoriesDiv.scrollBy({ left: -250, behavior: "smooth" });
    };
}

if (arrowRight) {
    arrowRight.onclick = () => {
        categoriesDiv.scrollBy({ left: 250, behavior: "smooth" });
    };
}

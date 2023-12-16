import { formatPrice } from "./utils.js";
import { addToCart } from "./cart/setupCart.js";
const display = (products, element, filters) => {
  element.innerHTML = products
    .map((product) => {
      const { id, name, image, price } = product;
      return `<article class="product">
          <div class="product-container">
            <img src="${image}" class="product-img img" alt="${name}" />
            <div class="product-icons">
              <a href="./product.html?id=${id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-card-btn product-icon" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">$${formatPrice(price)}</h4>
          </footer>
        </article>`;
    })
    .join("");
  // console.log(products, element);
  // we handle the bag with the filters
  if (filters) return;
  element.addEventListener("click", function (e) {
    const parent = e.target.parentElement;
    if (parent.classList.contains("product-card-btn")) {
      addToCart(parent.dataset.id);
    }
    //console.log(parent);
  });
};

export default display;

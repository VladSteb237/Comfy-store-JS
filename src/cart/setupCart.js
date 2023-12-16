// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items
const addToCartItems = getElement(".cart-item-count");
const cartItemsDom = getElement(".cart-items");
const cartTotalDom = getElement(".cart-total");

let cart = getStorageItem("cart");

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    let product = findProduct(id);
    // add item to cart
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    // add item to DOM
    addToCartDOM(product);
  } else {
    // update values
    const amount = increaseAmount(id);
    const items = [...cartItemsDom.querySelectorAll(".cart-item-amount")];
    const newAmount = items.find((item) => item.dataset.id === id);
    newAmount.textContent = amount;
  }
  // add one to the item count
  displayCartItemsCount();
  // display cart totals
  displayCartTotal();
  // set cart to local storage
  setStorageItem("cart", cart);
  // more staff coming up
  openCart();
};
function displayCartItemsCount() {
  const amount = cart.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);
  addToCartItems.innerHTML = amount;
}
function displayCartTotal() {
  let total = cart.reduce((acc, curr) => {
    return (acc += curr.price * curr.amount);
  }, 0);
  cartTotalDom.innerHTML = `Total: ${formatPrice(total)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function setupCartFunctionality() {
  cartItemsDom.addEventListener("click", function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    //remove
    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(id);
      //parent.parentElement.remove();
      element.parentElement.parentElement.remove();
    }
    //increase
    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    //decrease
    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    // based on function
    displayCartItemsCount();
    displayCartTotal();
    setStorageItem("cart", cart);
  });
}

const init = () => {
  // display amount and price
  displayCartItemsCount();
  // display total
  displayCartTotal();
  // add all cart items to DOM
  displayCartItemsDOM();
  // setup cart functionality
  setupCartFunctionality();
  //console.log(cart);
};
init();

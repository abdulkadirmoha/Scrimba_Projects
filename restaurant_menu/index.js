import { menuArray } from "./data.js";

// DOM Elements
const orderContainer = document.getElementById("order-container");
const orderItemsContainer = document.getElementById("order-items-container");
const totalPriceEl = document.getElementById("total-price");
const paymentDetails = document.getElementById("payment-details");
const orderCompletedMessage = document.getElementById("order-complited");
const paymentForm = document.getElementById("payment-form");

let orderItems = [];

// Initial render of the menu
function renderMenu() {
  const menuContainer = document.getElementById("menu-container");

  const menuHtml = menuArray
    .map((item) => {
      const ingredients = item.ingredients.join(", ");
      return `
            <div class="menu-item">
                <span class="item-emoji">${item.emoji}</span>
                <div class="item-info">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-desc">${ingredients}</p>
                    <span class="item-price">$${item.price}</span>
                </div>
                <button class="add-btn" data-id="${item.id}">+</button>
            </div>
        `;
    })
    .join("");

  menuContainer.innerHTML = menuHtml;
}

// Update the order summary section
function renderOrder() {
  if (orderItems.length === 0) {
    orderContainer.classList.add("hidden");
    return;
  }

  orderContainer.classList.remove("hidden");

  const orderHtml = orderItems
    .map(
      (item, index) => `
        <div class="order-item">
            <strong class="item-name">${item.name}</strong>
            <span class="remove-text" data-index="${index}">remove</span>
            <span class="item-price">$${item.price}</span>
        </div>
    `
    )
    .join("");

  const total = orderItems.reduce((sum, item) => sum + item.price, 0);

  orderItemsContainer.innerHTML = orderHtml;
  totalPriceEl.textContent = `$${total}`;
}

// Utility functions
function toggleVisibility(element, show) {
  element.classList.toggle("hidden", !show);
}

function resetOrder() {
  orderItems = [];
  renderOrder();
}

// Event delegation
document.addEventListener("click", function (e) {
  const { id, dataset, classList } = e.target;

  if (dataset.id) {
    const itemId = parseInt(dataset.id);
    const selectedItem = menuArray.find((item) => item.id === itemId);
    orderCompletedMessage.classList.add("hidden");
    orderItems.push(selectedItem);
    renderOrder();
  }

  if (classList.contains("complete-btn")) {
    toggleVisibility(paymentDetails, true);
  }

  if (classList.contains("remove-text")) {
    const index = parseInt(dataset.index);
    orderItems.splice(index, 1);
    renderOrder();
  }

  if (id === "pay-btn") {
    e.preventDefault();

    if (paymentForm.reportValidity()) {
      toggleVisibility(orderContainer, false);
      toggleVisibility(paymentDetails, false);
      toggleVisibility(orderCompletedMessage, true);
      resetOrder(); // Optional: clears cart after payment
    }
  }
});

// Initialize the menu on page load
renderMenu();

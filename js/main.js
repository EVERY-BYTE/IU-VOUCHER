// Load content dynamically
document.getElementById("home-content").innerHTML = fetchHtml("home.html");
document.getElementById("profile-content").innerHTML =
  fetchHtml("profile.html");

// Navigation logic
document.getElementById("nav-home").addEventListener("click", function () {
  document.getElementById("home-section").classList.remove("d-none");
  document.getElementById("profile-section").classList.add("d-none");
  setActiveNav(this);
});

document.getElementById("nav-profile").addEventListener("click", function () {
  document.getElementById("profile-section").classList.remove("d-none");
  document.getElementById("home-section").classList.add("d-none");
  setActiveNav(this);
});

function setActiveNav(activeElement) {
  document.querySelectorAll(".bottom-nav .nav-link").forEach((nav) => {
    nav.classList.remove("active");
  });
  activeElement.classList.add("active");
}

function fetchHtml(filePath) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", filePath, false);
  xhr.send(null);
  return xhr.responseText;
}

document.addEventListener("DOMContentLoaded", () => {
  const totalItemsElement = document.getElementById("total-items");
  const totalPriceCell = document.getElementById("total-price-cell");
  let totalItems = 0;
  let totalPrice = 0;

  document.querySelectorAll(".voucher-card").forEach((card) => {
    const btnContainer = card.querySelector(".btn-container");
    const price = parseInt(card.getAttribute("data-price"), 10);

    btnContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-beli")) {
        btnContainer.innerHTML = `
          <div class="quantity-control">
            <button class="decrease">-</button>
            <span class="quantity">1</span>
            <button class="increase">+</button>
            <button class="delete-icon">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        `;
        totalItems += 1;
        totalPrice += price;
        updateTotals();
      }
    });

    btnContainer.addEventListener("click", (event) => {
      const quantitySpan = btnContainer.querySelector(".quantity");
      let quantity = parseInt(quantitySpan.textContent, 10);

      if (event.target.classList.contains("increase")) {
        quantity += 1;
        totalItems += 1;
        totalPrice += price;
      } else if (event.target.classList.contains("decrease")) {
        if (quantity > 1) {
          quantity -= 1;
          totalItems -= 1;
          totalPrice -= price;
        } else {
          resetToBeli(btnContainer, price);
          return;
        }
      } else if (event.target.closest(".delete-icon")) {
        resetToBeli(btnContainer, price * quantity);
        return;
      }
      quantitySpan.textContent = quantity;
      updateTotals();
    });
  });

  function resetToBeli(container, deductedPrice) {
    container.innerHTML = '<button class="btn-beli">Beli</button>';
    totalItems -=
      deductedPrice /
      parseInt(
        container.closest(".voucher-card").getAttribute("data-price"),
        10
      );
    totalPrice -= deductedPrice;
    updateTotals();
  }

  function updateTotals() {
    totalItemsElement.textContent = totalItems;
    totalPriceCell.textContent = `Rp${totalPrice.toLocaleString()}`;
  }
});

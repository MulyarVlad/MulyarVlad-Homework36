const myOrdersBtn = document.querySelector(".my-orders-btn");
const categoryInfos = document.querySelectorAll(".category-info");

// Show orders list when My Orders button is clicked
myOrdersBtn.addEventListener("click", () => {
  // Hide all category infos
  categoryInfos.forEach((info) => {
    info.style.display = "none";
  });

  // Check if there are any saved orders in localStorage
  const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  // Show the orders list
  const ordersList = document.createElement("ul");
  ordersList.classList.add("orders-list");

  if (savedOrders.length > 0) {
    // Add saved order items
    savedOrders.forEach((order) => {
      const orderItem = document.createElement("li");
      orderItem.textContent = order.date + ": $" + order.price;
      ordersList.appendChild(orderItem);
    });
  } else {
    // Add sample order items
    const orderItem1 = document.createElement("li");
    orderItem1.textContent = "2023-05-01: $100";

    const orderItem2 = document.createElement("li");
    orderItem2.textContent = "2023-04-30: $80";

    ordersList.appendChild(orderItem1);
    ordersList.appendChild(orderItem2);
  }

  myOrdersBtn.parentElement.appendChild(ordersList);

  // Add event listener to remove an order when clicked
  ordersList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      const orderText = event.target.textContent;
      const orderDate = orderText.split(": ")[0];
      const orderPrice = orderText.split(": $")[1];

      // Remove the clicked order from saved orders in localStorage
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const newOrders = savedOrders.filter(
        (order) => order.date !== orderDate || order.price !== orderPrice
      );
      localStorage.setItem("orders", JSON.stringify(newOrders));

      // Remove the clicked order from the orders list
      event.target.remove();
    }
  });

  // Hide the My Orders button
  myOrdersBtn.style.display = "none";
});

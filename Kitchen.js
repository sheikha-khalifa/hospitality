function loadOrders() {
  const container = document.getElementById("orders");
  container.innerHTML = "";

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  if (orders.length === 0) {
    container.innerHTML = `<p class="text-center col-span-full text-white/50">
      لا توجد طلبات حالياً
    </p>`;
    return;
  }

  orders.forEach((order, index) => {
    const card = document.createElement("div");
    card.className = "bg-[#2d1e1a] p-4 rounded shadow";

    card.innerHTML = `
      <h3 class="text-lg font-bold mb-2">${order.drink}</h3>
      <p class="text-sm">سكر: ${order.sugar || "بدون"}</p>
      <p class="text-sm">حليب: ${order.milk || "بدون"}</p>
      <p class="text-sm">ملاحظات: ${order.notes || "-"}</p>
      <p class="text-xs text-white/50 mt-2">${order.time}</p>

      <button onclick="completeOrder(${index})"
        class="mt-4 w-full bg-green-600 py-2 rounded font-bold">
        تم التنفيذ
      </button>
    `;

    container.appendChild(card);
  });
}

function completeOrder(index) {
  let orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  loadOrders();
}

// تحديث تلقائي كل 2 ثانية
setInterval(loadOrders, 2000);
loadOrders();

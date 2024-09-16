async function main() {
    if (sessionStorage.TokenKey === undefined) {
        location.href = `${location.origin}/register`;
        return;
    }

    const orderId = getParam("orderId");
    const order = await getOrder(orderId);

    const orderIdLabel = document.getElementById("orderId");
    orderIdLabel.innerHTML = `Заказ №${orderId}`;

    const orderStatus = document.getElementById("orderStatus");
    orderStatus.innerHTML = order.orderStatus;

    let backgroundColor;
    let borderColor;

    switch (order.orderStatus) {
        case "Готов к выдаче":
            backgroundColor = "rgb(15, 196, 0)";
            borderColor = "#02730e";
            break;
        case "Выдан":
            backgroundColor = "rgb(230, 230, 230)";
            borderColor = "#b0b0b0";
            break;
        case "В пути":
            backgroundColor = "rgb(224, 221, 0)";
            borderColor = "#718500";
            break;
        case "Отменён":
            backgroundColor = "rgb(240, 88, 53)";
            borderColor = "#730000";
            break;
    }

    orderStatus.style.backgroundColor = backgroundColor;
    orderStatus.style.borderColor = borderColor

    const orderComposition = document.getElementById("orderComposition");

    order.orderDetails.forEach(orderDetail => {

        const row = document.createElement("tr");

        const product = document.createElement("td");
        product.innerHTML = orderDetail.productVariant.name;

        const count = document.createElement("td");
        count.innerHTML = orderDetail.count;

        const price = document.createElement("td");
        price.innerHTML = `${orderDetail.price} руб.`;

        const totalCost = document.createElement("td");
        totalCost.innerHTML = `${orderDetail.count * orderDetail.price} руб.`;

        row.appendChild(product);
        row.appendChild(count);
        row.appendChild(price);
        row.appendChild(totalCost);

        orderComposition.appendChild(row);
    });

    const totalCost = document.getElementById("orderTotalCost");
    totalCost.innerHTML = `Общая сумма заказа: ${order.totalCost} руб.`;

    const deliveryType = document.getElementById("orderDeliveryType");
    deliveryType.innerHTML = `${order.deliveryType}`;

    const shop = document.getElementById("orderShop");
    const shopLabel = document.getElementById("orderShopLabel");
    const address = document.getElementById("orderAddress");
    const addressLabel = document.getElementById("orderAddressLabel");

    switch (order.deliveryType) {
        case "Самовывоз":
            shop.innerHTML = order.deliveryAddress;
            address.style.visibility = "collapse";
            addressLabel.style.visibility = "collapse";
            break;
        case "Доставка":
            address.innerHTML = order.deliveryAddress;
            shop.style.visibility = "collapse";
            shopLabel.style.visibility = "collapse";
            break;
    }

    const deliveryDate = document.getElementById("orderDeliveryDate");
    deliveryDate.innerHTML = order.deliveryDate;

    const paymentType = document.getElementById("orderPaymentType");
    paymentType.innerHTML = order.paymentType;
}

function getParam(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}
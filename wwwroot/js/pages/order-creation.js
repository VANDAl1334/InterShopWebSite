let basket;

async function main() {
    if (sessionStorage.TokenKey === undefined) {
        location.href = `${location.origin}/register`;
        return;
    }

    let order;
    basket = await getBasket();

    const orderComposition = document.getElementById("orderComposition");

    let totalCost = 0;

    basket.forEach(detail => {

        const row = document.createElement("tr");

        const product = document.createElement("td");
        product.innerHTML = detail.productVariant.name;

        const count = document.createElement("td");
        count.innerHTML = detail.count;

        const price = document.createElement("td");
        price.innerHTML = `${detail.productVariant.cost} руб.`;

        const rowTotalCost = document.createElement("td");
        rowTotalCost.innerHTML = `${detail.totalCost} руб.`;

        row.appendChild(product);
        row.appendChild(count);
        row.appendChild(price);
        row.appendChild(rowTotalCost);

        totalCost += detail.totalCost;

        orderComposition.appendChild(row);
    });

    const orderTotalCost = document.getElementById("orderTotalCost");
    orderTotalCost.innerHTML = `Общая сумма заказа: ${totalCost} руб.`;

    const orderDeliveryTypes = document.getElementById("orderDeliveryTypes");
    const deliveryTypes = await getDeliveryTypes();

    // Типы доставки
    deliveryTypes.forEach(deliveryType => {
        const option = document.createElement("option");
        option.innerHTML = deliveryType.name;
        option.value = deliveryType.name;

        orderDeliveryTypes.appendChild(option);
    });

    const orderShops = document.getElementById("orderShops");
    const shopLabel = document.getElementById("orderShopLabel");
    const address = document.getElementById("orderAddresses");
    const addressLabel = document.getElementById("orderAddressLabel");

    const shops = await getShops();
    shops.forEach(shop => {
        const option = document.createElement("option");
        option.innerHTML = shop.address;
        option.value = shop.address;
        
        orderShops.appendChild(option); 
    });

    orderDeliveryTypes.addEventListener("change", e => {
        switch (e.currentTarget.value) {
            case "Самовывоз":
                address.style.visibility = "collapse";
                addressLabel.style.visibility = "collapse";

                orderShops.style.visibility = "visible";
                shopLabel.style.visibility = "visible";
                break;
            case "Доставка":
                orderShops.style.visibility = "collapse";
                shopLabel.style.visibility = "collapse";
                
                address.style.visibility = "visible";
                addressLabel.style.visibility = "visible";
                break;
        }
    });    

    // Примерная дата доставки
    const deliveryDate = document.getElementById("orderDeliveryDate");
    date = generateRandomDate();
    deliveryDate.innerHTML = date;

    // Виды оплаты
    const orderPaymentType = document.getElementById("orderPaymentTypes");
    const paymentTypes = await getPaymentTypes();
    paymentTypes.forEach(paymentType => {
        const option = document.createElement("option");
        option.innerHTML = paymentType.name;
        option.value = paymentType.name;
        
        orderPaymentType.appendChild(option); 
    });

    // Добавление заказа
    const createOrder = document.getElementById("orderCreateOrder");
    createOrder.addEventListener("click", async e => {
        e.preventDefault();

        const paymentType = document.getElementById("orderPaymentTypes").value;
        const deliveryDate = document.getElementById("orderDeliveryDate").innerHTML;
        const deliveryType = document.getElementById("orderDeliveryTypes").value;
        const deliveryAddress = deliveryType == "Самовывоз"
            ? document.getElementById("orderShops").value : 
              document.getElementById("orderAddresses").value;

        const orderDetails = [];
        basket.forEach(detail => {
            orderDetails.push({
                productVariant: detail.productVariant,
                count: detail.count,
                price: detail.productVariant.cost
            });
        });

        postOrder({
            paymentType: paymentType,
            deliveryType: deliveryType,
            deliveryAddress: deliveryAddress,
            deliveryDate: deliveryDate,
            orderDetails: orderDetails
        });
    });
}

function generateRandomDate()
{
    let date = new Date();
    date.setMilliseconds(date.getMilliseconds() + 345600000);

    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = dd + '-' + mm + '-' + yyyy;

    return date; 
}
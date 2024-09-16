async function getOrder(orderId) {
    if (sessionStorage.TokenKey === undefined) {
        return undefined;
    }

    const response = await fetch(`/api/order/${orderId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${sessionStorage.TokenKey}`
        }
    })

    if (response.ok)
    {
        return await response.json();
    }
    else
    {
        console.log(`[m_order] status: ${response.status}`);
        ParseError(response);
    }
}

async function getOrders() {
    if (sessionStorage.TokenKey === undefined) {
        return undefined;
    }

    const response = await fetch("/api/order", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${sessionStorage.TokenKey}`
        }
    })

    if (response.ok)
    {
        return response.json();
    }
    else
    {
        console.log(`[m_order] status: ${response.status}`);
        ParseError(response);
    }
}

async function createOrderList(orders) {
    const root = document.createElement("div");
    root.setAttribute("id", "orderList");

    for (let i = 0; i < orders.length; i++) {
        // Контейнер заказа
        const orderContainer = document.createElement("div");
        orderContainer.setAttribute("class", "orderContainer");
        // В качестве id контейнера задаём индекс массива
        orderContainer.setAttribute("id", i);
        orderContainer.setAttribute("orderId", orders[i].id);

        let orderDiv = document.createElement("div");
        // Номер заказа
        const orderNumber = document.createElement("label");
        orderNumber.setAttribute("class", "orderNumber");
        orderNumber.innerHTML = `Заказ №${orders[i].id}`;
        orderDiv.appendChild(orderNumber);

        // Статус заказа
        const orderStatus = document.createElement("span");
        orderStatus.setAttribute("class", "orderStatus");
        orderStatus.innerHTML = `${orders[i].orderStatus}`;

        let backgroundColor;
        let borderColor;

        switch (orders[i].orderStatus) {
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

        orderDiv.appendChild(orderStatus);

        // Статус оплаты
        const orderPayStatus = document.createElement("span");
        orderPayStatus.setAttribute("class", "orderPayStatus");
        orderPayStatus.innerHTML = `${orders[i].payStatus}`;
        
        switch (orders[i].payStatus) {
            case "Оплачен":
                backgroundColor = "rgb(15, 196, 0)";
                borderColor = "#02730e";
                break;
            case "Не оплачен":
                backgroundColor = "rgb(240, 88, 53)";
                borderColor = "#730000";
                break;
        }

        orderPayStatus.style.backgroundColor = backgroundColor;
        orderPayStatus.style.borderColor = borderColor

        orderDiv.appendChild(orderPayStatus);

        // Тип доставки
        const orderDeliveryType = document.createElement("span");
        orderDeliveryType.setAttribute("class", "orderDeliveryType");
        orderDeliveryType.innerHTML = `${orders[i].deliveryType}`;

        switch (orders[i].deliveryType) {
            case "Самовывоз":
                backgroundColor = "rgb(202, 202, 202)";
                borderColor = "#555555";
                break;
            case "Доставка":
                backgroundColor = "#f9a1db";
                borderColor = "#ff4bc2";
                break;
        }

        orderDeliveryType.style.backgroundColor = backgroundColor;
        orderDeliveryType.style.borderColor = borderColor

        orderDiv.appendChild(orderDeliveryType);

        orderContainer.appendChild(orderDiv);

        orderDiv = document.createElement("div");

        // Сумма заказа
        const orderTotalCost = document.createElement("p");
        orderTotalCost.setAttribute("class", "orderTotalCost");
        orderTotalCost.innerHTML = `Сумма: ${orders[i].totalCost} руб.`;
        orderDiv.appendChild(orderTotalCost);

        // Дата доставки
        const orderDeliveryDate = document.createElement("p");
        orderDeliveryDate.setAttribute("class", "orderDeliveryDate");
        orderDeliveryDate.innerHTML = `Дата доставки: ${orders[i].deliveryDate}`;
        orderDiv.appendChild(orderDeliveryDate);

        orderContainer.appendChild(orderDiv);

        const orderDetails = document.createElement("button");
        orderDetails.setAttribute("class", "orderDetails");
        orderDetails.innerHTML = "Подробнее";
        orderDetails.addEventListener("click", async e => {
            e.preventDefault();

            location.href = `${location.origin}/order?orderId=${e.currentTarget.parentElement.getAttribute("orderId")}`;
        });

        orderContainer.appendChild(orderDetails);

        root.appendChild(orderContainer);
    }

    return root;
}

async function postOrder(order)
{
    if (sessionStorage.TokenKey === undefined) {
        return undefined;
    }

    const response = await fetch("/api/order", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.TokenKey}`
        },
        body: JSON.stringify(order)
    })

    if (response.ok)
    {
        alert("Заказ оформлен!");
        return response.json();
    }
    else
    {
        console.log(`[m_order] status: ${response.status}`);
        ParseError(response);
    }
}

async function getDeliveryTypes()
{
    const response = await fetch("/api/deliveryType", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if(response.ok)
    {
        return response.json();
    }
    else
    {
        console.log("[m_order] status: " + response.status);
    }
}

async function getPaymentTypes()
{
    const response = await fetch("/api/paymentType", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if(response.ok)
    {
        return response.json();
    }
    else
    {
        console.log("[m_order] status: " + response.status);
    }
}
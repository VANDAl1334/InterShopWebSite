async function getBasket() {
    if (sessionStorage.TokenKey === undefined) {
        return undefined;
    }
    const response = await fetch("/api/basket", {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${sessionStorage.TokenKey}`
        }
    })

    if (response.ok) {
        return await response.json();
    }
    else {
        console.log("[m_basket]: status " + response.status);
    }
}

async function deleteBasket(productVariantId) {
    if (sessionStorage.TokenKey === undefined) {
        return undefined;
    }

    const response = await fetch(`/api/basket?productVariantId=${productVariantId}`, {
        "method": "DELETE",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${sessionStorage.TokenKey}`
        }
    })

    if (response.ok) {
        return await response.json();
    }
    else {
        console.log("[m_basket]: status " + response.status);
    }
}

async function createBasketList(basket) {
    var root = document.createElement("productList");
    root.setAttribute("id", "productList");

    for (let i = 0; i < basket.length; i++) {
        // Контейнер товара 
        const container = document.createElement("div");
        // В качестве id контейнера задаём id товара
        container.setAttribute("id", i);
        container.setAttribute("productId", basket[i].product.id);
        container.setAttribute("class", "productContainer");

        // Превью товара
        const preview = document.createElement("img");
        preview.setAttribute("src", `../images/products/${basket[i]["product"]["previewPath"]}`)
        preview.setAttribute("class", "productPreview");
        container.appendChild(preview);

        // Название товара
        const name = document.createElement("p");
        name.innerHTML = basket[i]["product"]["name"];
        name.setAttribute("class", "productName");
        // задаём обработчик нажатия
        name.addEventListener("click", async e => {
            e.preventDefault();

            location.href = `${location.origin}/product?productId=${e.currentTarget.parentElement.id}`;
        });

        // Описание товара
        const description = document.createElement("p");
        description.innerHTML = basket[i]["product"]["description"];
        description.setAttribute("class", "productDescription");

        container.appendChild(name);
        container.appendChild(description);

        // Кнопка удаления из корзины
        const remove = document.createElement("button");
        remove.setAttribute("class", "productRemove");
        remove.addEventListener("click", async e => {
            e.preventDefault();

            const productVariantId = basket[i].productVariant.id;

            deleteBasket(productVariantId);

            basket[e.currentTarget.parentElement.id] = undefined;
            e.currentTarget.parentElement.remove();
        });

        container.appendChild(remove);

        // Выбранный вариант товара
        const variant = document.createElement("p");
        variant.setAttribute("class", "productVariant");
        variant.innerHTML = "Вариант: " + basket[i].productVariant.name;
        container.appendChild(variant);

        // Количество товара в корзине
        const divProductCount = document.createElement("div");
        divProductCount.setAttribute("class", "divProductCount");
        container.appendChild(divProductCount);

        const productCountLabel = document.createElement("p");
        productCountLabel.innerHTML = "Количество: ";
        divProductCount.appendChild(productCountLabel);

        const productCount = document.createElement("input");
        productCount.addEventListener("change", async e => {
            e.preventDefault();

            const id = Number(e.currentTarget.parentElement.parentElement.id);

            basket[id].count = Number(e.currentTarget.value);
            e.currentTarget.parentElement.parentElement.getElementsByClassName("productTotalPrice")[0]
                .innerHTML = `Сумма: ${calcTotalSum(basket[i].productVariant.cost, basket[i].count, discount)} руб.`;
        });
        productCount.setAttribute("class", "productCount");
        productCount.setAttribute("value", basket[i].count);
        productCount.setAttribute("min", "1");
        productCount.setAttribute("max", "1024");
        productCount.setAttribute("type", "number");
        divProductCount.appendChild(productCount);

        // Блок для цены и цены по скидке
        const divCost = document.createElement("div");
        divCost.setAttribute("class", "divProductCost");

        // Цена без скидки
        const cost = document.createElement("span");

        var costValue = basket[i]["productVariant"]["cost"];
        cost.innerHTML = `Стоимость: ${costValue} руб.`;
        cost.setAttribute("class", "productCost");
        divCost.appendChild(cost);

        let discount = basket[i]["product"]["discount"];

        var costDisount;
        // Если существует хотя бы одна скидка
        if (discount != 0) {

            costDisount = document.createElement("span");
            costDisount.innerHTML = `${costValue - costValue * (discount / 100)} руб.`;
            costDisount.setAttribute("class", "productDiscount");
            cost.setAttribute("style", "color: rgb(180, 180, 180);text-decoration: line-through;");
            divCost.appendChild(costDisount);
        }

        container.appendChild(divCost);

        // Сумма
        const totalSum = calcTotalSum(basket[i].productVariant.cost, basket[i].count, discount);
        const productTotalSum = document.createElement("p");
        productTotalSum.setAttribute("class", "productTotalPrice");
        productTotalSum.innerHTML = `Сумма: ${totalSum} руб.`;

        container.appendChild(productTotalSum);
        root.appendChild(container);

        

        window.onunload = async e => {

            e.preventDefault()

            for(let y = 0; y < basket.length; y++)
            {
                if(basket[y] === undefined)
                    basket.splice(y, 1);
            }

            const response = await fetch("/api/basket", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.TokenKey}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(basket)
            });

            if (!response.ok)
                alert("Хуйня");
        };
    }

    return root;
}

function calcTotalSum(price, count, discount)
{
    const totalSum = discount == 0 ? price * count :  price * count -  price * count * (discount / 100);

    return totalSum;
}
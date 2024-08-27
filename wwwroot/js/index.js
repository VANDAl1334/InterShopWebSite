
// Загрузка скидок
async function loadDiscounts() {

    const response = await fetch(`/api/Product?discountOnly=true`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (response.ok) {
        data = await response.json();
        generateDiscounts(data, "Акции");
    }
}

// загружает список товаров указанной категории
async function loadCategory(categoryId)
{
    const response = await fetch(`/api/Product?categoryId=${categoryId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (response.ok) {
        data = await response.json();
        generateDiscounts(data, data[0]['categoryName']);
    }
}

function generateDiscounts(jsonData, sectionName) {

    var root = document.getElementById("content");

    const discountLabel = document.createElement("p");
    discountLabel.innerHTML = sectionName;
    discountLabel.setAttribute("class", "label");

    const discounts = document.createElement("div");
    discounts.setAttribute("class", "discounts");

    root.appendChild(discountLabel);
    root.appendChild(discounts);

    for (let i = 0; i < jsonData.length; i++)
    {
        // Контейнер
        const container = document.createElement("div");
        // В качестве id контейнера задаём id товара
        container.setAttribute("id", jsonData[i]["id"]);
        container.setAttribute("class", "productContainer");

        // Превью товара
        const preview = document.createElement("img");
        preview.setAttribute("src", `../images/products/${jsonData[i]["previewPath"]}`)
        preview.setAttribute("class", "productPreview");
        container.appendChild(preview);

        // Название товара
        const name = document.createElement("p");
        name.innerHTML = `${jsonData[i]["name"]}`;
        name.setAttribute("class", "productName");
        // задаём обработчик нажатия
        name.addEventListener("click", async e => {
            e.preventDefault();

            location.href = `${location.origin}/product?productId=${e.currentTarget.parentElement.id}`;
        });

        // Описание товара
        const description = document.createElement("p");
        description.innerHTML = `${jsonData[i]["description"]}`;
        description.setAttribute("class", "productDescription");

        container.appendChild(name);
        container.appendChild(description);
        // Блок для цены и цены по скидке
        const divCost = document.createElement("div");
        divCost.setAttribute("class", "divProductCost");

        // Цена без скидки
        const cost = document.createElement("span");

        var costValue = jsonData[i]["productVariants"][0]["priceHistories"][0]["price"];
        cost.innerHTML = `${costValue} руб.`;
        cost.setAttribute("class", "productCost");
        divCost.appendChild(cost);

        let lastDiscount = jsonData[i]["discountHistories"][0];

        var costDisount;
        // Если существует хотя бы одна скидка
        if (lastDiscount != undefined) {
            let lastDiscountValue = jsonData[i]["discountHistories"][0]["discount"];
            const currentDate = new Date();

            // Проверяем вхождение текущей даты в диапазон скидки
            if (currentDate >= new Date(lastDiscount["dateFrom"]) && currentDate <= new Date(lastDiscount["dateTo"])) {
                // Если скидка входит в диапазон (действует), то формируем тег для скидки
                costDisount = document.createElement("span");
                costDisount.innerHTML = `${costValue - costValue * (lastDiscountValue / 100)} руб.`;
                costDisount.setAttribute("class", "productDiscount");
                cost.setAttribute("style", "color: rgb(180, 180, 180);text-decoration: line-through;");
                divCost.appendChild(costDisount);
            }
        }

        container.appendChild(divCost);

        // Кнопка "В корзину"
        const btnBasket = document.createElement("btn");
        btnBasket.innerHTML = "В корзину"
        btnBasket.setAttribute("class", "productToBasket");
        container.appendChild(btnBasket);

        discounts.append(container);
    }
}

loadDiscounts();

// Загрузка секций с товарами определённой категории
// В дальнейшем предполагается получение id категорий с сервера
loadCategory(8);
loadCategory(9);
// Кнопка поиска
document.getElementById("btn_search").addEventListener("click", async e => {
    e.preventDefault();

    const search = document.getElementById("tb_search");
    loadProducts(search.value);

});

// Загрузка товаров
async function loadProducts(nameFilter)
{
    deletePreviousResults();

    const response = await fetch(`/api/Product?nameFilter=${nameFilter}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if(response.ok)
    {
        data = await response.json();
        generateProducts(data);
    }
}

// Удаление предыдущих результатов 
function deletePreviousResults()
{
    const root = document.getElementById("results");

    root.innerHTML = "";
}

// Создание списка товаров
async function generateProducts(jsonData)
{
    var root = document.getElementById("results");

    // Строка "Результаты поиска"
    const resultString = document.createElement("p");
    resultString.setAttribute("style", "font-size: 30px; margin: 10px;");
    resultString.innerHTML = "Результаты поиска";
    root.appendChild(resultString);

    // Количество найденых товаров
    const result = document.createElement("p");
    result.innerHTML = `Всего найдено ${jsonData.length} товаров`;
    result.setAttribute("style", "margin: 10px");

    root.append(result);

    for(let i = 0; i < jsonData.length; i++)
    {
        // Контейнер результатов 
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
        name.innerHTML = `Название: ${jsonData[i]["name"]}`;
        name.setAttribute("class", "productName");

        // Описание товара
        const description = document.createElement("p");
        description.innerHTML = `Описание: ${jsonData[i]["description"]}`;
        description.setAttribute("class", "productDescription");

        container.appendChild(name);        
        container.appendChild(description);   
        
        // Кнопка добавления в избранное
        const toFavourite = document.createElement("button");
        toFavourite.setAttribute("class", "productFavourite");
        
        container.appendChild(toFavourite);

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
        if(lastDiscount != undefined)
        {
            let lastDiscountValue = jsonData[i]["discountHistories"][0]["discount"];
            const currentDate = new Date();
            
            // Проверяем вхождение текущей даты в диапазон скидки
            if(currentDate >= new Date(lastDiscount["dateFrom"]) && currentDate <= new Date(lastDiscount["dateTo"]))
            {
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
                
        root.append(container);
    }
}

// Загружаем товары при загрузке страницы
loadProducts("");
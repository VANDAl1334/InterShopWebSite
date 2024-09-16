let productData;

async function main()
{
    productData = await getProduct(getParam("productId"));
    document.head.title = `InterShop | ${productData["name"]}`;
    generateProductPage();
}

function generateProductPage() {

    // Название товара
    const productName = document.getElementById("productName");
    productName.innerHTML = `${productData.name}`;

    // Задаём превью 
    const productPreview = document.getElementById("productPreview");
    productPreview.setAttribute("src", `/images/products/${productData["previewPath"]}`);

    // Создаём дополнительные изображения
    const imgs = document.getElementById("otherImages");

    productData["imagesOfProduct"].forEach(image => {
        let img = document.createElement("img");
        img.setAttribute("src", `/images/products/${image["path"]}`);
        imgs.appendChild(img);
    });

    const descriptionTag = document.getElementById("description");

    // Создаём описание
    const descriptionLabel = document.createElement("p");
    descriptionLabel.innerHTML = "Описание:";
    const description = document.createElement("pre");
    description.innerHTML = productData["description"];
    descriptionTag.appendChild(descriptionLabel);
    descriptionTag.appendChild(description);

    // Список основных вариантов
    const variantsLabel = document.createElement("label");
    variantsLabel.setAttribute("for", "selVariants");
    variantsLabel.innerHTML = "Вариант товара: ";

    const variants = document.createElement("select");
    variants.setAttribute("id", "selVariants");
    variants.addEventListener("change", async e => {
        e.preventDefault();

        // Получение выбранного варианта
        let selectedVariant;

        productData["productVariants"].forEach(element => {
            if (element.id == e.currentTarget.value)
                selectedVariant = element;
        });

        const characts = document.getElementById("characts");

        // Заполнение характеристик
        var charactsValue = "";
        selectedVariant["productVariantCharacteristics"].forEach(charact => {
            charactsValue += `\n${charact["characteristic"]}: ${charact["value"]} ${charact["unit"] === null ? "" : charact["unit"]}`;
        });
        characts.innerHTML = charactsValue;

        // Цена
        let cost = selectedVariant["priceHistories"][0].price;

        const costDefault = document.getElementById("productCost");
        costDefault.innerHTML = `${cost} руб.`;

        // Если существует скидка
        if (productData["discountHistories"].length > 0) {
            const costDisount = document.getElementById("productDiscount");

            let discount = productData["discountHistories"][0].discount;
            costDisount.innerHTML = `${cost - cost * (discount / 100)} руб.`;
            costDefault.setAttribute("style", "color: rgb(180, 180, 180);text-decoration: line-through;");
        }
    });

    productData["productVariants"].forEach(variant => {

        const option = document.createElement("option");
        option.setAttribute("value", variant.id);
        option.innerHTML = variant.name;

        variants.appendChild(option);
    });

    descriptionTag.appendChild(variantsLabel);
    descriptionTag.appendChild(variants);

    // Получение основного варианта
    let mainVariant;
    productData["productVariants"].forEach(element => {
        if (element.isMain)
            mainVariant = element;
    });

    // Создаём характеристики (основного варианта товара)
    const charactsLabel = document.createElement("p");
    charactsLabel.innerHTML = "Характеристики:";
    const characts = document.createElement("pre");
    characts.setAttribute("id", "characts");

    var charactsValue = "";
    mainVariant["productVariantCharacteristics"].forEach(charact => {
        charactsValue += `\n${charact["characteristic"]}: ${charact["value"]} ${charact["unit"] === null ? "" : charact["unit"]}`;
    });
    characts.innerHTML = charactsValue;
    descriptionTag.appendChild(charactsLabel);
    descriptionTag.appendChild(characts);

    // Цена
    let cost = mainVariant["priceHistories"][0].price;
    const costDiv = document.createElement("div");
    costDiv.setAttribute("id", "divProductCost");

    const costHeader = document.createElement("p");
    costHeader.innerHTML = "Цена: ";

    const costDefault = document.createElement("p");
    costDefault.setAttribute("id", "productCost");
    costDefault.innerHTML = `${cost} руб.`;

    costDiv.appendChild(costHeader);
    costDiv.appendChild(costDefault);

    // Если существует скидка
    if (productData["discountHistories"].length > 0) {
        const costDisount = document.createElement("p");
        costDisount.setAttribute("id", "productDiscount");

        let discount = productData["discountHistories"][0].discount;
        costDisount.innerHTML = `${cost - cost * (discount / 100)} руб.`;
        costDefault.setAttribute("style", "color: rgb(180, 180, 180);text-decoration: line-through;");

        costDiv.appendChild(costDisount);
    }

    descriptionTag.appendChild(costDiv);

    // Рейтинг
    const rating = document.getElementById("rating");
    rating.innerHTML = `Рейтинг: ${productData["rating"]} / 5`;

    // Работа с комментариями

    // Выводим количество комментариев на товар
    const commentsCount = document.getElementById("commentsCount");
    commentsCount.innerHTML = productData["comments"].length;

    // Добавляем комментарии
    const comments = document.getElementById("comments");

    productData["comments"].forEach(commentInfo => {

        const comment = document.createElement("div");
        comment.setAttribute("class", "comment");

        const userIcon = document.createElement("img");
        userIcon.setAttribute("class", "userIcon");
        userIcon.setAttribute("src", "../icons/Profile.png");
        comment.appendChild(userIcon);

        const userLogin = document.createElement("p");
        userLogin.setAttribute("class", "userLogin");
        userLogin.innerHTML = commentInfo["login"];
        comment.appendChild(userLogin);

        const userRating = document.createElement("p");
        userRating.setAttribute("class", "userRating");
        userRating.innerHTML = `Оценка: ${commentInfo["rating"]} / 5`;
        comment.appendChild(userRating);

        const userMessage = document.createElement("p");
        userMessage.setAttribute("class", "commentMessage");
        userMessage.innerHTML = commentInfo["message"];
        comment.appendChild(userMessage);

        comments.appendChild(comment);
    });
}

async function onVariantSelected(e) {
    e.preventDefault();
}

function getParam(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

document.getElementById("btnShowCommentForm").addEventListener("click", async e => {
    if (sessionStorage.TokenKey === undefined) {
        alert("Для оставления отзыва необходимо войти в аккаунт");
        return;
    }

    const commentForm = document.getElementById("commentForm");
    commentForm.hidden = false;
});

document.getElementById("btnPutComment").addEventListener("click", async e => {
    e.preventDefault();

    var response = await fetch("/api/auth/Authorize", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.TokenKey}`
        }
    });

    const user = await response.json();

    const comment =
    {
        login: user["userJson"]["login"],
        message: document.getElementById("userMessage").value,
        rating: document.getElementById("userRating").value,
        productId: getParam("productId")
    };

    response = await fetch("/api/Comment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.TokenKey}`
        },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        alert("Отзыв добавлен");
        location.reload();
    }
    else {
        ParseError(response, true);
        console.log("Comment add: status " + response.status);
    }
});

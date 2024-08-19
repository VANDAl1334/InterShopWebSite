let productId = getParam("productId");

let productData; // = getProductData(productId);

getProductData(productId);



async function getProductData(id) {
    const response = await fetch(`/api/Product/${productId}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

    productData = await response.json();

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

    // Создаём характеристики
    const charactsLabel = document.createElement("p");
    charactsLabel.innerHTML = "Характеристики:";
    const characts = document.createElement("pre");

    var charactsValue = "Характеристики:";
    productData["productVariants"][0]["productVariantCharacteristics"].forEach(charact => {
        charactsValue += `\n${charact["characteristic"]}: ${charact["value"]}`;
    });
    characts.innerHTML = charactsValue;
    descriptionTag.appendChild(charactsLabel);
    descriptionTag.appendChild(characts);

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
        userMessage.setAttribute("class", "userMessage");
        userMessage.innerHTML = commentInfo["message"];
        comment.appendChild(userMessage);

        comments.appendChild(comment);
    });


}

function getParam(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}
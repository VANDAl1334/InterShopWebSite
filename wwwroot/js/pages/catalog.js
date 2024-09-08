

async function main() {
    let favouriteProducts;
    let nameFilter = getParam("nameFilter");
    nameFilter = nameFilter === undefined ? "" : nameFilter;

    const search = document.getElementById("tb_search");
    search.value = nameFilter;
    favouriteProducts = await getFavouriteProducts();

    // Загружаем товары при загрузке страницы
    let products = await getProducts(nameFilter);

    const content = document.getElementById("content");

    const resultLabel = document.createElement("label");
    resultLabel.innerHTML = "Результаты поиска:";
    content.appendChild(resultLabel);

    const result = document.createElement("p");
    const productsCount = products.length;
    let ending = "ов";
    if (productsCount % 10 == 1)
        ending = "";
    else if (productsCount % 10 > 1 && productsCount % 10 < 5)
        ending = "а";
    result.innerHTML = `Найден${productsCount % 10 == 1 ? "" : "о"} ${products.length} товар${ending}`;
    content.appendChild(result);

    const productList = await createProductList(products, favouriteProducts);

    content.appendChild(productList);
    //let oldContainer = document.getElementById("productList");

    //oldContainer.replaceWith(productList);
}

function getParam(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))

        return decodeURIComponent(name[1]);
}
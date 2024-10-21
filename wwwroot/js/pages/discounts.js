async function main()
{
    // Заугрузка всплывающего окна
    $("#popupContainer").load("../../popup.html");

    let favouriteProducts = await getFavouriteProducts();
    let products = await getProducts("", 0, true);

    if(products.length == 0)
    {
        const noResults = document.createElement("h2");
        noResults.innerHTML = "Товары не найдены";
        noResults.setAttribute("id", "errorMessage");

        content.style.alignContent = "center";
        content.appendChild(noResults);

        return;
    }

    const content = document.getElementById("content");
    const label = document.createElement("label");
    label.innerHTML = "Акции";
    content.appendChild(label);

    const productList = await createProductList(products, favouriteProducts);
    content.appendChild(productList);
}
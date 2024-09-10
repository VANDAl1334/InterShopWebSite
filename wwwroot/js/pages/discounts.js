async function main()
{
    // Заугрузка всплывающего окна
    $("#popupContainer").load("../../popup.html");

    let favouriteProducts = await getFavouriteProducts();
    let products = await getProducts("", 0, true);

    const content = document.getElementById("content");
    const label = document.createElement("label");
    label.innerHTML = "Акции";
    content.appendChild(label);

    const productList = await createProductList(products, favouriteProducts);
    content.appendChild(productList);
}
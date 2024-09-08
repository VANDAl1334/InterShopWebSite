async function main()
{
    let favouriteProducts = await getFavouriteProducts();
    let products = await getProducts("", 0, true);

    const content = document.getElementById("content");
    const label = document.createElement("label");
    label.innerHTML = "Акции";
    content.appendChild(label);

    const productList = await createProductList(products, favouriteProducts);
    content.appendChild(productList);
}
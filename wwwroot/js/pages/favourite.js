async function main()
{
    if (sessionStorage.TokenKey === undefined) {
        location.href = `${location.origin}/register`;
    }
    else {
        // Заугрузка всплывающего окна
        $("#popupContainer").load("../../popup.html");

        const content = document.getElementById("content");
        const label = document.createElement("label");
        label.innerHTML = "Избранное";
        content.appendChild(label);

        let favouriteProductsId = await getFavouriteProducts(false);
        let favouriteProducts = await getFavouriteProducts(true);
        const productList = await createProductList(favouriteProducts, favouriteProductsId);
        content.appendChild(productList);
    }
}
async function main()
{
    if (sessionStorage.TokenKey === undefined) {
        location.href = `${location.origin}/register`;
    }
    else {
        // Заугрузка всплывающего окна
        $("#popupContainer").load("../../popup.html");

        const content = document.getElementById("content");
        

        let favouriteProductsId = await getFavouriteProducts(false);
        let favouriteProducts = await getFavouriteProducts(true);

        if(favouriteProducts.length == 0)
    {
        const noResults = document.createElement("h2");
        noResults.innerHTML = "Список избранных товаров пуст :(";
        noResults.setAttribute("id", "errorMessage");

        content.style.alignContent = "center";
        content.appendChild(noResults);

        return;
    }
        const label = document.createElement("h1");
        label.innerHTML = "Избранное";
        content.appendChild(label);
        
        const productList = await createProductList(favouriteProducts, favouriteProductsId);
        content.appendChild(productList);
    }
}
const categories = ["Офисные компьютеры", "Игровые компьютеры"];

async function main()
{
    let favouriteProductsId = await getFavouriteProducts(false);

    const root = document.getElementById("content");

    const discountLabel = document.createElement("label");
    discountLabel.innerHTML = "Акции";
    const discounts = await getProducts("", 0, true);
    const discountsList = await createProductList(discounts, favouriteProductsId);
    root.appendChild(discountLabel);
    root.appendChild(discountsList);

    for(let i = 0; i < 2; i++)
    {
        const categoryLabel = document.createElement("label");
        categoryLabel.innerHTML = categories[i];
        root.appendChild(categoryLabel);
        // Загрузка секций с товарами определённой категории
        // В дальнейшем предполагается получение id категорий с сервера
        const products = await getProducts("", i + 8, false);
        const productList = await createProductList(products, favouriteProductsId);
        root.appendChild(productList);
    }
}
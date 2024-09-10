async function main()
{
    if(sessionStorage.TokenKey === undefined)
    {
        location.href = `${location.origin}/register`;
        return;
    }

    const products = await getBasket();
    const basketList = await createBasketList(products);

    const content = document.getElementById("content");
    content.appendChild(basketList); 
}
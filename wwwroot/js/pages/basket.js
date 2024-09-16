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

    const createOrder = document.createElement("button");
    createOrder.setAttribute("id", "createOrder");
    createOrder.innerHTML = "Перейти к оформлению заказа";
    content.appendChild(createOrder);
    createOrder.addEventListener("click", async e => {
        
        let isEmpty = true;
        
        products.forEach(product => {
            if(product !== undefined)
                isEmpty = false;
        });

        if(isEmpty)
            alert("Корзина пуста!");
        else
            location.href = `${location.origin}/order-creation`;
    });
}
async function main()
{
    if(sessionStorage.TokenKey === undefined)
    {
        location.href = `${location.origin}/register`;
        return;
    }

    const content = document.getElementById("content");

    const products = await getBasket();

    if(products.length == 0)
    {
        const noResults = document.createElement("h2");
        noResults.innerHTML = "Корзина пуста )";
        noResults.setAttribute("id", "errorMessage");

        content.style.alignContent = "center";
        content.appendChild(noResults);

        return;
    }

    const basketList = await createBasketList(products);    
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
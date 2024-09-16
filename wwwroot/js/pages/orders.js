async function main()
{
    if(sessionStorage.TokenKey === undefined)
    {
        location.href = `${location.origin}/register`;
        return;
    }
    
    const orders = await getOrders();
    const orderList = await createOrderList(orders);

    const label = document.createElement("h1");
    label.innerHTML = "Ваши заказы";

    const content = document.getElementById("content");    
    content.appendChild(label);
    content.appendChild(orderList);    
}
async function getShops()
{
    const response = await fetch("/api/shop", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if(response.ok)
    {
        return response.json();
    }
    else
    {
        console.log(`[m_shop] status: ${response.status}`);
    }
}
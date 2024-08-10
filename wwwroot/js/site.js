document.getElementById("favourite").addEventListener("click", async e => {
    e.preventDefault();

    window.location.href = `${location.origin}/Favourite`;
})

document.getElementById("basket").addEventListener("click", async e => {
    e.preventDefault();
    window.location.href = `${location.origin}/Basket`;
})

document.getElementById("profile").addEventListener("click", async e => {
    e.preventDefault();

    window.location.href = `${location.origin}/Profile`;
})
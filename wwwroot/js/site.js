document.getElementById("favourite").addEventListener("click", async e => {
    e.preventDefault();

    var newLocation = window.location.protocol + '//' + window.location.host + "/Favourite";
    window.location.href = newLocation;
})

document.getElementById("basket").addEventListener("click", async e => {
    e.preventDefault();

    var newLocation = window.location.protocol + '//' + window.location.host + "/Basket";
    window.location.href = newLocation;
})

document.getElementById("profile").addEventListener("click", async e => {
    e.preventDefault();

    var newLocation = window.location.protocol + '//' + window.location.host + "/Profile";
    window.location.href = newLocation;
})
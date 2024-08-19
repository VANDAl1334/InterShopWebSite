﻿var ShopsHeader = document.getElementById("Shops");
var CatalogHeader = document.getElementById("Catalog");
var DiscountsHeader = document.getElementById("Discounts");
var ProfileHeader = document.getElementById("profile");
var BasketHeader = document.getElementById("basket");
var FavouriteHeader = document.getElementById("favourite");
window.onload = () => {
    if(/Catalog\b/.test(location.pathname)) { FocusHeader(CatalogHeader); return; }
    if(/Shops\b/.test(location.pathname)) { FocusHeader(ShopsHeader); return; }        
    if(/Discounts\b/.test(location.pathname)) { FocusHeader(DiscountsHeader); return; }
    if(/Profile\b/.test(location.pathname)) { FocusHeader(ProfileHeader); return; }    
    if(/Basket\b/.test(location.pathname)) { FocusHeader(BasketHeader); return; }
    if(/Favourite\b/.test(location.pathname)) { FocusHeader(FavouriteHeader); return; }
}
// ShopsHeader.addEventListener('click', () => { FocusHeader(ShopsHeader); });
// CatalogHeader.addEventListener('click', () => { FocusHeader(CatalogHeader); });
// DiscountsHeader.addEventListener('click', () => { FocusHeader(DiscountsHeader);  });
function FocusHeader(chapter) {    
    chapter.style.background = "#797979";
    chapter.style.color = "#ffffff";
    chapter.style.borderRadius = "15px";
}
FavouriteHeader.addEventListener("click", async e => {
    e.preventDefault();

    window.location.href = `${location.origin}/Favourite`;
})

BasketHeader.addEventListener("click", async e => {
    e.preventDefault();
    window.location.href = `${location.origin}/Basket`;
})

ProfileHeader.addEventListener("click", async e => {
    e.preventDefault();

    window.location.href = `${location.origin}/Profile`;
})

// Кнопка поиска
document.getElementById("btn_search").addEventListener("click", async e => {
    e.preventDefault();
    const search = document.getElementById("tb_search");        
    loadProducts(search.value);
    history.pushState(null, "", `${location.origin}/Catalog?nameFilter=${search.value}`); // переход на страницу без ее обновления
    // FocusHeader("Catalog");
    //location.href = `${location.origin}/Catalog?nameFilter=${search.value}`;
});

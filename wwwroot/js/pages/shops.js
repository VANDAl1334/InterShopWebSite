// var shops = [
//     [ 45.063859, 38.995674, "https://yandex.ru/maps/35/krasnodar/?ll=38.997031%2C45.063108&mode=poi&poi%5Bpoint%5D=38.995674%2C45.063859&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1002617669&z=17.36"],
//     [ 45.120432, 39.025423, "https://yandex.ru/maps/35/krasnodar/?ll=39.027754%2C45.121731&mode=poi&poi%5Bpoint%5D=39.025423%2C45.120432&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1239480739&z=14.72"],
//     [ 45.011862, 38.964455, "https://yandex.ru/maps/org/spetsializirovannaya_klinicheskaya_psikhiatricheskaya_bolnitsa_1/8285523058/?display-text=%D0%BF%D1%81%D0%B8%D1%85%D0%B8%D0%B0%D1%82%D1%80%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20%D0%B1%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D0%B0&ll=38.965700%2C45.011395&mode=search&sctx=ZAAAAAgBEAAaKAoSCdh%2BMsaHgUNAESYA%2F5QqhUZAEhIJQpjbvdwnsz8RAmISLuQRnD8iBgABAgMEBSgKOABAI0gBYh5yZWxldl9zZXJ2aWNlX2FyZWFfcGVyY2VudD0xMDBqAnJ1nQHNzEw9oAEAqAEAvQE%2Brh7qwgEQ8pjs7h73krT%2BA8P37%2BTZAYICL9C%2F0YHQuNGF0LjQsNGC0YDQuNGH0LXRgdC60LDRjyDQsdC%2B0LvRjNC90LjRhtCwigIsNTM0MzcyNjA1NTkkMTg0MTA1OTU2JDE4NDEwNTk1OCQxOTgzOTUyODk1NDKSAgCaAgxkZXNrdG9wLW1hcHOqAgwyMjQ1MTg3MTQ5NjM%3D&sll=38.968201%2C45.011395&sspn=0.013704%2C0.006857&text=%D0%BF%D1%81%D0%B8%D1%85%D0%B8%D0%B0%D1%82%D1%80%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20%D0%B1%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D0%B0&z=16.72"]
// ];

async function main() {
    const shops = await getShops();
    printAddresses(shops);
    initMap(shops);
}

async function printAddresses(shops) {
    const addresses = document.getElementById("addresses");

    shops.forEach(shop => {
        const address = document.createElement("p");
        address.setAttribute("class", "address");
        address.innerHTML = shop.address;

        addresses.appendChild(address);
    });
}

async function initMap(shops) {
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

    const map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: [38.983756, 45.048001],
                zoom: 10
            }
        }
    );

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    shops.forEach(shop => {
        const shopMarker = document.createElement('a');
        var myPlacemark = new ymaps3.YMapMarker(
            {
                coordinates: [shop.latitude, shop.longtitute],
                draggable: false
            },
            shopMarker
        );

        map.addChild(myPlacemark);
        shopMarker.setAttribute("class", "geoPoint");
        shopMarker.setAttribute("href", shop.yandexLink);
    });
}
export function init(atmsData) {
  let center = [55.755864, 37.617698];
  let balloon = {
    balloonContentHeader: 'Coin',
    balloonContentBody: 'Банкомат',
  };

  let map = new ymaps.Map('map', {
    center: center,
    zoom: 10.4,
  });

  map.controls.remove('geolocationControl'); // удаляем геолокацию
  map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove('zoomControl'); // удаляем контрол зуммирования

  if (atmsData && atmsData.length > 0) {
    atmsData.forEach((atm) => {
      let bankPlacemark = new ymaps.Placemark([atm.lat, atm.lon], balloon, {
        iconLayout: 'default#image',
      });

      map.geoObjects.add(bankPlacemark);
    });
  }

  // function changeMap() {
  //   if (window.screen.width < 657) {
  //     map.setCenter([55.761852, 37.631892]);
  //     map.setZoom(14);
  //   }
  // }

  // window.addEventListener('resize', function () {
  //   changeMap();
  // });

  // changeMap();
}

const form = document.forms[0];
const search = document.getElementsByTagName("input")[0];
const details = document.querySelectorAll(".details p");
let map;
let marker;

const locate = () => {
  if (search.value) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_nlC2yVCzYoeidvILkKGnBXLqbYkrw&ipAddress=${search.value}`
    )
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data) => {
        details[0].textContent = data.ip;
        details[1].textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
        details[2].textContent = `UTC ${data.location.timezone}`;
        details[3].textContent = data.isp;
        map.panTo(new L.latLng(data.location.lat, data.location.lng));
        marker.setLatLng(L.latLng(data.location.lat, data.location.lng));

        search.value = "";
      })
      .catch(() => {
        alert("An error occurred, please try again");
      });
  } else {
    fetch(
      "https://geo.ipify.org/api/v2/country,city?apiKey=at_nlC2yVCzYoeidvILkKGnBXLqbYkrw"
    )
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data) => {
        details[0].textContent = data.ip;
        details[1].textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
        details[2].textContent = `UTC ${data.location.timezone}`;
        details[3].textContent = data.isp;

        map = L.map("map", {
          center: [data.location.lat, data.location.lng],
          zoom: 18,
          zoomControl: false,
        });
        L.tileLayer(
          "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=MXsJ5e0B7SZOvcTRu5c3",
          {
            attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>
    <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`,
          }
        ).addTo(map);
        let icon = L.icon({
          iconUrl: "images/icon-location.svg",
          iconSize: [30, 38],
          iconAnchor: [22, 94],
        });
        marker = L.marker([data.location.lat, data.location.lng], {
          icon: icon,
        }).addTo(map);

        search.value = "";
      })
      .catch(() => {
        alert("An error occurred, please try again");
      });
  }
};

document.addEventListener("DOMContentLoaded", locate);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(search.value)) locate();
  else {
    alert("Enter a valid IP address");
    search.value = "";
  }
});

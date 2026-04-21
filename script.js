function openPDF(file) {
  window.open(file, '_blank');
}

const apiKey = "0373e4c920312c723b3a1b98cae35ea4"; // Replace with your OpenWeatherMap API key
const city = "Kalaburagi";

async function getWeather() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},in&appid=${apiKey}&units=metric`
    );

    const data = await res.json();
    console.log(data); // Debugging

    const container = document.getElementById("weather-container");
    container.innerHTML = "";

    // Take data every 8 steps (~24 hours)
    for (let i = 0; i < data.list.length; i += 8) {
      let item = data.list[i];

      let temp = item.main.temp;
      let date = new Date(item.dt_txt);
      let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      let fullDate = date.toLocaleDateString();

      // ⚡ Efficiency logic
      let efficiency;
      if (temp < 35) efficiency = "85%";
      else if (temp < 30) efficiency = "80%";
      else if (temp < 25) efficiency = "70%";
      else efficiency = "60%";

      let weather = item.weather[0].main;

      container.innerHTML += `
        <div class="weather-card">
          <h3>${dayName}</h3>
          <small>${fullDate}</small>
          <p>🌡 Temp: ${temp.toFixed(1)}°C</p>
          <p>☁ Condition: ${weather}</p>
          <p>⚡ Efficiency: <strong>${efficiency}</strong></p>
        </div>
      `;
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

getWeather();
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  links.classList.toggle("active");
});


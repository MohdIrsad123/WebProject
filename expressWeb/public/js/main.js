const submitBtn = document.querySelector("#submitBtn");
const cityName = document.querySelector("#cityName");
const city_Name = document.querySelector("#city_name");
const temp_real_value = document.querySelector("#temp-real-value");
const temp_status = document.querySelector("#temp_status");
const data_hide = document.querySelector(".middle_layer");
const day = document.querySelector("#day");
const today_date = document.querySelector("#today_date");

// Function to get day and date
const getCurrentDayAndDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    day.innerText = today.toLocaleDateString('en-US', { weekday: 'long' });
    today_date.innerText = today.toLocaleDateString('en-US', options);
};

const getInfo = async (event) => {
    event.preventDefault();

    let cityVal = cityName.value;
    if (cityVal === "") {
        city_Name.innerText = `Please write the name before searching`;
        data_hide.classList.add("data_hide");
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=0b1c3b9ace1f2fd7ebe3cb8812f214de&units=metric`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === '404') {
                city_Name.innerText = `City not found`;
                data_hide.classList.add("data_hide");
                return;
            }

            const arrData = [data];

            city_Name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_value.innerText = `${arrData[0].main.temp}`; // Added degree Celsius symbol

            const tempMood = arrData[0].weather[0].main;

            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }
            data_hide.classList.remove("data_hide");

            // Call function to display current day and date
            getCurrentDayAndDate();
        } catch (error) {
            city_Name.innerText = `Please enter the city name properly`;
            data_hide.classList.add("data_hide");
        }
    }
};

submitBtn.addEventListener("click", getInfo);

// Call function to display current day and date when the page loads
getCurrentDayAndDate();
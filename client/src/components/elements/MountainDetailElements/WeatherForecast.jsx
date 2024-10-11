import React from "react";
import '../../../style/Pages/MountainDetail.css';

export default function WeatherForecast({ weatherData }) {
    
    // To format the date
    function formatDate(dateString) {
        const dateParts = dateString.split("-");
        const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    if (!weatherData || !weatherData.forecast) {
        return null;
    }

    return (
        <div className="weather-display">
            {weatherData.forecast.forecastday.map((day) => (
                <div key={day.date} className="weather-day">
                    <p id="date">{formatDate(day.date)}</p>
                    <p id="condition">{day.day.condition.text}</p>
                    <div className="temperature">
                        <p>High: {day.day.maxtemp_f.toFixed(1)}°F</p>
                        <p>Low: {day.day.mintemp_f.toFixed(1)}°F</p>
                    </div>
                    <img src={day.day.condition.icon} alt={day.day.condition.text} />
                </div>
            ))}
        </div>
    );
}
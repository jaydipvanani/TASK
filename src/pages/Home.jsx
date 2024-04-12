import React from 'react'
import { useState } from 'react';

const Home = () => {

    const [sliderValue, setSliderValue] = useState(1000); // Initial slider value
    const [data, setData] = useState([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]); // Sample data

    // Function to update filtered data based non slider value
    const updateFilteredData = (value) => {
        const filteredData = data.filter(item => item >= value);
        return filteredData;
    }

    // Event handler for slider input
    const handleSliderChange = (event) => {
        const value = parseInt(event.target.value);
        setSliderValue(value);
    }
    return (
        <>
            <div className="App">
                <h1>Filter Data</h1>
                <div className="slider-container">
                    <label htmlFor="slider">Filter by Range:</label>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={sliderValue}
                        className="slider"
                        id="slider"
                        onChange={handleSliderChange}
                    />
                    <p>Value: {sliderValue}</p>
                </div>
                <div id="filtered-data">
                    <p>Filtered Data: {updateFilteredData(sliderValue).join(', ')}</p>
                </div>
            </div>

        </>
    )
}

export default Home

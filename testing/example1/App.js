const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Define the API endpoint and bus stop code
const API_ENDPOINT =
  "http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2";
const BUS_STOP_CODE = "83139";

// Route to handle the request for bus arrival information
app.get("/", async (req, res) => {
  try {
    // Make the API request
    const response = await axios.get(API_ENDPOINT, {
      headers: {
        AccountKey: "kOKzxUfITCChcI9j/YNwUw==", // Replace with your actual account key
        accept: "application/json",
      },
      params: {
        BusStopCode: BUS_STOP_CODE,
      },
    });

    // Extract the relevant data from the API response
    const { NextBus, NextBus2, NextBus3 } = response.data;

    // Prepare the response data
    const buses = [];

    if (NextBus) {
      buses.push({
        busNumber: NextBus.ServiceNo,
        loadStatus: NextBus.Load ?? "Unknown",
      });
    }

    if (NextBus2) {
      buses.push({
        busNumber: NextBus2.ServiceNo,
        loadStatus: NextBus2.Load ?? "Unknown",
      });
    }

    if (NextBus3) {
      buses.push({
        busNumber: NextBus3.ServiceNo,
        loadStatus: NextBus3.Load ?? "Unknown",
      });
    }

    // Send the response as JSON
    res.json(buses);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

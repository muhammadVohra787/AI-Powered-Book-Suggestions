import React, { useEffect, useState } from "react";

const DeviceInfo = ({ deviceInfo, setDeviceInfo, geoLocation, setGeoLocation }) => {
  const GEOPIFY_API_KEY = process.env.REACT_APP_GEOPIFY_API_KEY;

  useEffect(() => {
    const initializeDeviceInfo = () => {
      const userAgent = window.navigator.userAgent;
      const os = userAgent.includes("Win")
        ? "Windows"
        : userAgent.includes("Mac")
        ? "MacOS"
        : userAgent.includes("Linux")
        ? "Linux"
        : "Unknown";

      const browser = userAgent.includes("Chrome")
        ? "Chrome"
        : userAgent.includes("Firefox")
        ? "Firefox"
        : userAgent.includes("Safari")
        ? "Safari"
        : "Unknown";

      const screenSize = `${window.innerWidth}x${window.innerHeight}`;
      const isMobile = /Mobi|Android/i.test(userAgent);

      setDeviceInfo({ os, browser, screenSize, isMobile });
    };

    const fetchGeoLocation = async () => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/ipinfo?apiKey=${GEOPIFY_API_KEY}`
        );
        const result = await response.json();
        setGeoLocation({
          country: result.country?.name || "Unknown",
          city: result.city?.name || "Unknown",
          state: result.state?.name || "Unknown",
          latitude: result.location?.latitude || "Unknown",
          longitude: result.location?.longitude || "Unknown",
          countryCode: result.country?.iso_code || "Unknown",
          countryFlag: result.country?.flag || "Unknown",
          capital: result.country?.capital || "Unknown",
          currency: result.country?.currency || "Unknown",
        });
        console.log("Fetched")
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      }
    };

    initializeDeviceInfo();
    if (!geoLocation || !geoLocation.country) {
      fetchGeoLocation();
    }
  }, [GEOPIFY_API_KEY, geoLocation, setDeviceInfo, setGeoLocation]);

  return (
    <div>
      <h2>Device Information</h2>
      <p>Operating System: {deviceInfo.os}</p>
      <p>Browser: {deviceInfo.browser}</p>
      <p>Is Mobile: {deviceInfo.isMobile ? "Yes" : "No"}</p>

      <h2>Location Data (from IP)</h2>
      <div>
        <p><strong>Country:</strong> {geoLocation?.country} {geoLocation?.countryFlag}</p>
        <p><strong>City:</strong> {geoLocation?.city}</p>
        <p><strong>State:</strong> {geoLocation?.state}</p>
        <p><strong>Latitude:</strong> {geoLocation?.latitude}</p>
        <p><strong>Longitude:</strong> {geoLocation?.longitude}</p>
        <p><strong>Country Code:</strong> {geoLocation?.countryCode}</p>
        <p><strong>Capital:</strong> {geoLocation?.capital}</p>
        <p><strong>Currency:</strong> {geoLocation?.currency}</p>
      </div>
    </div>
  );
};

export default DeviceInfo;

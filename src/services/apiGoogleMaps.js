// This module handles all Google Maps API integrations, including loading the Maps script,
// reverse geocoding to get an address from coordinates, and calculating distance & ETA.

import { Loader } from '@googlemaps/js-api-loader';

const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

// Ensure the Google Maps API key is set in the environment variables
if (!googleMapsKey)
  throw new Error(
    'Google Maps API key is missing. Please set VITE_GOOGLE_MAPS_KEY.',
  );

const loader = new Loader({
  apiKey: googleMapsKey,
  version: 'weekly',
  libraries: ['places'],
});

// Converts user's latitude and longitude into a human-readable address using the Geocoding API
export async function getUserAddress(latitude, longitude) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsKey}`,
  );
  const data = await res.json();
  return data.results[0]?.formatted_address || '';
}

// Uses Google Distance Matrix API to get distance and estimated travel time between two coordinates
async function getDistanceMatrixData(origin, destination) {
  await loader.load();

  const service = new google.maps.DistanceMatrixService();

  const request = {
    origins: [{ lat: origin.latitude, lng: origin.longitude }],
    destinations: [{ lat: destination.latitude, lng: destination.longitude }],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
  };

  // Wraps the callback-based Distance Matrix API in a Promise for cleaner async/await usage
  const response = await new Promise((resolve, reject) => {
    service.getDistanceMatrix(request, (response, status) => {
      status === 'OK'
        ? resolve(response)
        : reject(new Error(`DistanceMatrixService failed: ${status}`));
    });
  });
  // Extract the distance and duration from the response
  const element = response.rows[0].elements[0];
  const distanceInMeters = element.distance.value;
  const durationInSeconds = element.duration.value;

  return {
    distanceInKm: distanceInMeters / 1000,
    durationInMinutes: Math.ceil(durationInSeconds / 60),
  };
}

// Calculates only the distance (in kilometers) from the bakery to the user
export async function calculateDistanceFromBakery(origin, destination) {
  const { distanceInKm } = await getDistanceMatrixData(origin, destination);
  return distanceInKm;
}

// Calculates only the estimated duration (in minutes) from the bakery to the user
export async function calculateDuration(origin, destination) {
  const { durationInMinutes } = await getDistanceMatrixData(
    origin,
    destination,
  );
  return durationInMinutes;
}

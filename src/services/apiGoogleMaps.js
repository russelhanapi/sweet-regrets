const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

if (!googleMapsKey)
  throw new Error(
    'Google Maps API key is missing. Please set VITE_GOOGLE_MAPS_KEY.',
  );

export async function getUserAddress(latitude, longitude) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsKey}`,
  );
  const data = await res.json();
  return data.results[0]?.formatted_address || '';
}

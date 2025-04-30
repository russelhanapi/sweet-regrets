import { BAKERY_LOCATION, BASE_PREP_TIME_MINUTES } from '../config/constants';
import { calculateDuration } from '../services/apiGoogleMaps';

export function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export async function calculateEstimatedTime(
  userLocation,
  orderType = 'delivery',
) {
  const estimatedTime = new Date(); // Start with the current time

  if (orderType === 'pickup') {
    // For pickups, just add the fixed preparation time
    estimatedTime.setMinutes(
      estimatedTime.getMinutes() + BASE_PREP_TIME_MINUTES,
    );
    return estimatedTime.toISOString();
  }

  // For deliveries, calculate the travel time
  const travelTimeMinutes = await calculateDuration(
    BAKERY_LOCATION,
    userLocation,
  );

  // Add the base preparation time and travel time to the current time
  const totalMinutes = BASE_PREP_TIME_MINUTES + travelTimeMinutes;
  estimatedTime.setMinutes(estimatedTime.getMinutes() + totalMinutes);

  return estimatedTime.toISOString();
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

import { useEffect, useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchUserAddress, resetUserLocation } from '../../user/userSlice';
import { fetchDeliveryFee, resetDeliveryFee } from '../orderSlice';

function useOrderDelivery(orderType, geolocation) {
  const dispatch = useDispatch();

  // Ref to track if the toast has been triggered to prevent duplicate toasts
  const hasTriggeredToast = useRef(false);

  // Memoize geolocation to prevent unnecessary re-renders
  const memoizedGeolocation = useMemo(
    () => ({
      latitude: geolocation?.latitude,
      longitude: geolocation?.longitude,
    }),
    [geolocation?.latitude, geolocation?.longitude],
  );

  useEffect(() => {
    const isDelivery = orderType === 'delivery';

    // Function to calculate the delivery fee
    const calculateDeliveryFee = async () => {
      try {
        await toast.promise(
          (async () => {
            let coords = memoizedGeolocation;

            // If coordinates are missing, fetch the user's address to obtain them
            if (!coords?.latitude || !coords?.longitude) {
              const result = await dispatch(fetchUserAddress()).unwrap();
              coords = result.geolocation;
            }

            // Dispatch action to fetch the delivery fee based on coordinates
            await dispatch(fetchDeliveryFee(coords)).unwrap();
          })(),
          {
            loading: 'Calculating delivery fee...',
            success: 'Delivery fee calculated!',
            error: (err) => err || 'Failed to compute delivery fee!',
          },
        );
      } catch (error) {
        console.error('Error during delivery setup:', error);
      }
    };

    // If the order type is 'delivery' and the toast hasn't been triggered yet
    if (isDelivery && !hasTriggeredToast.current) {
      hasTriggeredToast.current = true;
      calculateDeliveryFee();
    }

    // If the order type is not 'delivery', reset user location and delivery fee
    if (!isDelivery) {
      dispatch(resetUserLocation());
      dispatch(resetDeliveryFee());
      hasTriggeredToast.current = false;
    }
  }, [dispatch, orderType, memoizedGeolocation]);

  return null;
}

export default useOrderDelivery;

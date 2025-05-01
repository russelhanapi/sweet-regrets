import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { fetchUserAddress } from '../features/user/userSlice';

import {
  fetchDeliveryFee,
  resetDeliveryFee,
} from '../features/order/orderSlice';

function useOrderDelivery(orderType) {
  const dispatch = useDispatch();
  const geolocation = useSelector((state) => state.user.geolocation);
  const hasTriggeredToast = useRef(false);

  useEffect(() => {
    const isDelivery = orderType === 'delivery';

    if (isDelivery && !hasTriggeredToast.current) {
      hasTriggeredToast.current = true;

      const calculateDeliveryFee = async () => {
        try {
          await toast.promise(
            async () => {
              // use existing geolocation or fetch it
              let coords = geolocation;

              const isCoordsMissing = !coords?.latitude || !coords?.longitude;
              if (isCoordsMissing) {
                const result = await dispatch(fetchUserAddress()).unwrap();
                coords = result.geolocation;
              }

              // calculate delivery fee using valid geolocation
              await dispatch(fetchDeliveryFee(coords)).unwrap();
            },
            {
              loading: 'Calculating delivery fee...',
              success: 'Delivery fee calculated!',
              error: (err) => err || 'Failed to compute delivery fee!',
            },
          );
        } catch (error) {
          console.error('Delivery setup failed:', error);
        }
      };

      calculateDeliveryFee();
    }

    if (!isDelivery) {
      dispatch(resetDeliveryFee());
      hasTriggeredToast.current = false;
    }
  }, [dispatch, geolocation, orderType]);

  return null;
}

export default useOrderDelivery;

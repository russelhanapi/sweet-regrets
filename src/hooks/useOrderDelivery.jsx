import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserAddress } from '../features/user/userSlice';
import {
  fetchDeliveryFee,
  resetDeliveryFee,
} from '../features/order/orderSlice';

// Custom hook for managing delivery logic
function useOrderDelivery(orderType, geolocation) {
  const dispatch = useDispatch();

  useEffect(() => {
    const hasGeolocation = geolocation?.latitude && geolocation?.longitude;

    if (orderType === 'delivery') {
      // Fetch address if geolocation is not available
      if (!hasGeolocation) dispatch(fetchUserAddress());
      // Fetch delivery fee if geolocation is available
      else dispatch(fetchDeliveryFee(geolocation));
    }

    // Reset fee if order type is not 'delivery'
    dispatch(resetDeliveryFee());
  }, [dispatch, geolocation, orderType]);
}

export default useOrderDelivery;

import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useOrderDelivery from './useOrderDelivery';

function useCreateOrderForm() {
  const {
    fullName,
    status: addressStatus,
    geolocation,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const {
    deliveryFee,
    distanceInKm,
    status: deliveryFeeStatus,
    error: deliveryFeeError,
  } = useSelector((state) => state.order);

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: fullName,
      orderType: 'pickup',
    },
  });

  const orderType = useWatch({ control, name: 'orderType' });
  useOrderDelivery(orderType, geolocation);

  useEffect(() => {
    if (orderType === 'delivery' && address) {
      setValue('address', address);
    }
  }, [address, orderType, setValue]);

  const isLoadingAddress = addressStatus === 'loading';
  const isLoadingDeliveryFee = deliveryFeeStatus === 'loading';
  const isFormValid = Object.keys(errors).length === 0;

  return {
    register,
    errors,
    handleSubmit,
    isLoadingAddress,
    isLoadingDeliveryFee,
    errorAddress,
    distanceInKm,
    deliveryFeeError,
    isFormValid,
    orderType,
    deliveryFee,
    geolocation,
  };
}

export default useCreateOrderForm;

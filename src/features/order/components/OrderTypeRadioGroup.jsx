import { formatCurrency } from '../../../utils/helpers';
import RadioField from '../../../components/ui/RadioField';

function OrderTypeRadioGroup({
  register,
  isLoadingAddress,
  isLoadingDeliveryFee,
  orderType,
  distanceInKm,
  deliveryFee,
}) {
  return (
    <div className='mt-1 space-y-4'>
      <p className='font-medium'>
        How would you like to receive your sweet regrets?
      </p>
      <div className='flex items-center gap-6'>
        <RadioField
          name='orderType'
          value='pickup'
          register={register}
          disabled={isLoadingAddress || isLoadingDeliveryFee}
        />
        <div className='flex items-center gap-2'>
          <RadioField
            name='orderType'
            value='delivery'
            register={register}
            disabled={isLoadingAddress || isLoadingDeliveryFee}
          />

          {orderType === 'delivery' && (
            <p className='bg-secondary text-secondary-content rounded-md px-1.5 py-1 text-[12px]'>
              {isLoadingDeliveryFee
                ? 'Calculating delivery fee...'
                : `${distanceInKm.toFixed(1)} km = ${formatCurrency(deliveryFee)} 
                        delivery fee`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderTypeRadioGroup;

import { useSelector } from 'react-redux';
import { Form, useNavigation, useSubmit } from 'react-router-dom';
import { IoCall, IoMap, IoPerson } from 'react-icons/io5';

import { formatCurrency } from '../../utils/helpers';
import { getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import useCreateOrderForm from './hooks/useCreateOrderForm';
import OrderTypeRadioGroup from './components/OrderTypeRadioGroup';
import createOrderAction from './createOrderAction';

function CreateOrder() {
  const {
    register,
    errors,
    handleSubmit,
    isLoadingAddress,
    isLoadingDeliveryFee,
    distanceInKm,
    isFormValid,
    orderType,
    deliveryFee,
    geolocation,
  } = useCreateOrderForm();

  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === 'submitting';
  const onSubmit = () => submit(document.getElementById('order-form'));

  const cart = useSelector(getCart);
  const subtotal = useSelector(getTotalCartPrice);
  const totalAmount = subtotal + deliveryFee;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className='bg-base-200 flex min-h-full items-center justify-center'>
      <div className='max-container px-4 py-8 sm:py-8 md:px-8'>
        <div className='m-auto max-w-2xl md:min-w-2xl lg:min-w-3xl'>
          <Form
            className='w-full space-y-6'
            method='POST'
            id='order-form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset className='space-y-4'>
              <div className='mb-6 space-y-3'>
                <h2 className='md:text-2x text-2xl font-medium'>
                  Almost there!
                </h2>
                <p>Just a few more details to wrap up your order.</p>
              </div>

              {/* Customer Name */}
              <InputField
                name='fullName'
                icon={<IoPerson />}
                register={register}
                placeholder='e.g. Juan Dela Cruz'
                validation={{
                  required: 'Oops! Don’t forget to tell us your name.',
                }}
                errors={errors}
                disabled={isLoadingAddress || isLoadingDeliveryFee}
              />

              {/* Phone Number */}
              <InputField
                type='tel'
                icon={<IoCall />}
                name='phoneNumber'
                register={register}
                errors={errors}
                placeholder='e.g. 09101112131'
                validation={{
                  required:
                    'We get it—privacy is cute. But we might need your number.',
                  pattern: {
                    value:
                      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                    message: "Hmm, that doesn't seem like a valid number...",
                  },
                }}
                disabled={isLoadingAddress || isLoadingDeliveryFee}
              />

              {/* Optional Notes */}
              <textarea
                {...register('notes')}
                rows={4}
                placeholder='Got any special requests or delivery notes? Let us know here...'
                className='textarea w-full resize-none'
                disabled={isLoadingAddress || isLoadingDeliveryFee}
              />

              {/* Order Type */}
              <OrderTypeRadioGroup
                register={register}
                isLoadingAddress={isLoadingAddress}
                isLoadingDeliveryFee={isLoadingDeliveryFee}
                orderType={orderType}
                distanceInKm={distanceInKm}
                deliveryFee={deliveryFee}
              />

              {/* Address */}
              {orderType === 'delivery' && (
                <InputField
                  name='address'
                  icon={<IoMap />}
                  register={register}
                  placeholder='e.g. 123 Main St, Springfield, IL 62704'
                  validation={{
                    required: 'Where are we going? Add your delivery address.',
                  }}
                  errors={errors}
                  disabled={isLoadingAddress || isLoadingDeliveryFee}
                />
              )}

              {/* Hidden Input Fields: Used to pass data to the action() for backend processing */}
              <input type='hidden' name='cart' value={JSON.stringify(cart)} />
              <input
                type='hidden'
                name='geolocation'
                value={JSON.stringify(geolocation)}
              />
              <input type='hidden' name='subtotal' value={subtotal} />
              <input type='hidden' name='deliveryFee' value={deliveryFee} />
              <input type='hidden' name='totalAmount' value={totalAmount} />
            </fieldset>

            <Button
              disabled={!isFormValid || isLoadingDeliveryFee}
              type='primary'
            >
              {!isFormValid
                ? 'Please complete all required fields'
                : isLoadingDeliveryFee
                  ? 'Calculating total...'
                  : isSubmitting
                    ? 'Whipping up your order...'
                    : `Order now for ${formatCurrency(totalAmount)}`}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export const action = createOrderAction;
export default CreateOrder;

import { useSelector } from 'react-redux';
import { Form, redirect, useNavigation, useSubmit } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { IoCall, IoMap, IoPerson } from 'react-icons/io5';

import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { calculateEstimatedTime, formatCurrency } from '../../utils/helpers';
import { addOrderItems, createOrder, getMenu } from '../../services/apiBakery';

import useOrderDelivery from '../../hooks/useOrderDelivery';
import store from '../../../store';

import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import OrderTypeRadioGroup from './OrderTypeRadioGroup';

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const submit = useSubmit();

  const cart = useSelector(getCart);
  const {
    fullName,
    status: addressStatus,
    geolocation,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const {
    deliveryFee,
    distanceInKm,
    status: deliveryFeeStatus,
    error: deliveryFeeError,
  } = useSelector((state) => state.order);

  const isLoadingDeliveryFee = deliveryFeeStatus === 'loading';

  const subtotal = useSelector(getTotalCartPrice);
  const totalAmount = subtotal + deliveryFee;

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: fullName,
      orderType: 'pickup',
      address: address,
    },
  });

  const orderType = useWatch({ control, name: 'orderType' });
  useOrderDelivery(orderType, geolocation);

  const isFormValid = Object.keys(errors).length === 0;
  const onSubmit = () => {
    const form = document.getElementById('order-form');
    submit(form);
  };
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

              {/* Hidden Input Fields: Used for  */}
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

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const cart = JSON.parse(data.cart);
  const userLocation = JSON.parse(data.geolocation);

  const estimatedTime = await calculateEstimatedTime(
    userLocation,
    data.orderType,
  );

  const orderDetails = {
    full_name: data.fullName,
    phone_number: data.phoneNumber,
    notes: data.notes,
    order_type: data.orderType,
    address: data.address,
    estimated_time: estimatedTime,
    subtotal: data.subtotal,
    delivery_fee: data.deliveryFee,
    total_amount: data.totalAmount,
  };

  const newOrder = await createOrder(orderDetails);

  console.log(newOrder.id);
  const menuData = await getMenu();
  const items = cart.map((cartItem) => {
    const menuItem = menuData.find((m) => m.id === cartItem.id);

    if (!menuItem) {
      throw new Error(`Menu item with id ${cartItem.id} not found`);
    }
    const price = menuItem?.price || 0;
    return {
      order_id: newOrder.id,
      item_id: cartItem.id,
      quantity: cartItem.quantity,
      total_price: price * cartItem.quantity,
    };
  });

  console.log('items', items);
  await addOrderItems(items);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

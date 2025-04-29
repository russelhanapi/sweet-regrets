import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Form, useNavigation } from 'react-router-dom';
import InputField from '../../components/ui/InputField';
import { IoCall, IoMap, IoPerson } from 'react-icons/io5';
import RadioField from '../../components/ui/RadioField';
import Button from '../../components/ui/Button';

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: { orderType: 'pickup' },
  });

  const orderType = useWatch({ control, name: 'orderType' });
  const isFormValid = Object.keys(errors).length === 0;

  return (
    <div className='bg-base-200 flex min-h-full items-center justify-center'>
      <div className='max-container px-4 py-8 sm:py-8 md:px-8'>
        <div className='m-auto max-w-2xl md:min-w-2xl lg:min-w-3xl'>
          <Form
            className='w-full space-y-6'
            method='POST'
            id='order-form'
            onSubmit={handleSubmit((data) => console.log(data))}
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
                name='customerName'
                icon={<IoPerson />}
                register={register}
                placeholder='e.g. Juan Dela Cruz'
                validation={{
                  required: 'Oops! Don’t forget to tell us your name.',
                }}
                errors={errors}
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
              />

              {/* Optional Notes */}
              <textarea
                {...register('notes')}
                rows={4}
                placeholder='Got any special requests or delivery notes? Let us know here...'
                className='textarea w-full resize-none'
              />

              {/* Order Type */}
              <div className='mt-1 space-y-4'>
                <p className='font-medium'>
                  How would you like to receive your sweet regrets?
                </p>
                <div className='flex items-center gap-6'>
                  <RadioField
                    name='orderType'
                    value='pickup'
                    register={register}
                  />
                  <RadioField
                    name='orderType'
                    value='delivery'
                    register={register}
                  />
                </div>

                {orderType === 'delivery' && (
                  <InputField
                    name='address'
                    icon={<IoMap />}
                    register={register}
                    placeholder='Your address'
                    validation={{
                      required:
                        'Where are we going? Add your delivery address.',
                    }}
                    errors={errors}
                  />
                )}
              </div>
            </fieldset>

            <Button disabled={isSubmitting || !isFormValid} type='primary'>
              {isSubmitting
                ? 'Whipping up your order...'
                : !isFormValid
                  ? 'Please complete all required fields'
                  : `Order now for #TOTALAMOUNT#`}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;

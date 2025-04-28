import { brandLogoWeb } from '../../assets/images';
import OrderItem from '../../features/order/OrderItem';

function Receipt() {
  return (
    <div className='bg-base-100 max-container border-primary receipt-container flex w-full max-w-96 flex-col gap-2 rounded-t-lg border-t-12 p-9 font-mono text-sm uppercase shadow-lg'>
      <div className='p-4'>
        <img src={brandLogoWeb} alt='logo' className='w-full' />
      </div>

      <hr className='text-base-300' />

      <div className='flex flex-col py-3'>
        <p className='flex justify-between'>
          Tracking #: <span>#1</span>
        </p>
        <p className='flex justify-between'>
          Status:
          <span>Processing</span>
        </p>
        <p className='flex justify-between'>
          Arrival Time:
          <span>Apr 28, 03:00 AM</span>
        </p>
        <p className='flex justify-between'>
          Notes: <span className='italic'>Bring coins.</span>
        </p>
      </div>

      <hr className='text-base-300' />

      <div className='flex flex-col gap-1 py-3'>
        <table className='table-auto'>
          <thead>
            <tr>
              <th className='pb-2 text-left'>Item</th>
              <th className='pb-2 text-center'>QTY</th>
              <th className='pb-2 text-right'>Price</th>
            </tr>
          </thead>
          <tbody>
            <OrderItem />
          </tbody>
        </table>
      </div>

      <hr className='text-base-300' />

      <div className='flex flex-col py-3'>
        <p className='flex justify-between'>
          Subtotal: <span>$25.00</span>
        </p>

        <p className='flex justify-between'>
          Delivery fee: <span>$2.00</span>
        </p>
        <p className='text-primary mt-3 flex justify-between font-bold'>
          Total:
          <span className='text-primary'>$27.00</span>
        </p>
      </div>

      <hr className='text-base-300' />

      <div className='py-3'>
        <p className='text-xs leading-snug italic'>
          Thank you for your order! Your Sweet Regret is on its way. No
          judgment, just sugar. Stay cozy — and maybe put on pants. Or don’t.
          We’re not here to tell you how to live.'
        </p>
      </div>
    </div>
  );
}

export default Receipt;

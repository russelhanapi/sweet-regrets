import { brandLogoWeb } from '../../assets/images';
import OrderItem from '../../features/order/components/OrderItem';
import { formatCurrency, formatDate } from '../../utils/helpers';

function Receipt({ order, orderItems }) {
  const {
    id,
    status,
    notes,
    delivery_fee: deliveryFee,
    estimated_time: estimatedTime,
    order_type: orderType,
    subtotal: subtotal,
    total_amount: totalAmount,
  } = order;
  return (
    <div className='bg-base-100 max-container border-primary receipt-container flex w-full max-w-96 flex-col gap-2 rounded-t-lg border-t-12 p-9 font-mono text-sm uppercase shadow-lg'>
      <div className='p-4'>
        <img src={brandLogoWeb} alt='logo' className='w-full' />
      </div>

      <hr className='text-base-300' />

      <div className='flex flex-col py-3'>
        <p className='flex justify-between'>
          Tracking ID: <span>#{id}</span>
        </p>
        <p className='flex justify-between'>
          Status:
          <span>{status}</span>
        </p>
        <p className='flex justify-between'>
          {orderType === 'delivery' ? 'Arrival Time:' : 'Pickup Time'}
          <span>{formatDate(estimatedTime)}</span>
        </p>
        {notes && (
          <p className='flex justify-between'>
            Notes: <span className='italic'>{notes}</span>
          </p>
        )}
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
            {/* Mapping over the order items (order_items) */}
            {orderItems.map((item, index) => (
              <OrderItem item={item} key={index} />
            ))}
          </tbody>
        </table>
      </div>

      <hr className='text-base-300' />

      <div className='flex flex-col py-3'>
        <p className='flex justify-between'>
          Subtotal: <span>{formatCurrency(subtotal)}</span>
        </p>

        {orderType === 'delivery' && (
          <p className='flex justify-between'>
            Delivery fee: <span>{formatCurrency(deliveryFee)}</span>
          </p>
        )}
        <p className='text-primary mt-3 flex justify-between font-bold'>
          Total:
          <span className='text-accent'>{formatCurrency(totalAmount)}</span>
        </p>
      </div>

      <hr className='text-base-300' />

      <div className='py-3'>
        <p className='text-xs leading-snug italic'>
          Thank you for your order!
          {orderType === 'delivery'
            ? ' Your Sweet Regret is on its way. No judgment, just sugar. Stay cozy — and maybe put on pants. Or don’t. We’re not here to tell you how to live.'
            : ' We’ll have your Sweet Regret packed and ready. Just try not to make eye contact with the staff — we know what you’re here for.'}
        </p>
      </div>
    </div>
  );
}

export default Receipt;

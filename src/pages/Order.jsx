import { useLoaderData } from 'react-router-dom';
import Receipt from '../components/ui/Receipt';
import { getOrder } from '../services/apiBakery';

function Order() {
  const { order, order_items: orderItems } = useLoaderData();

  return (
    <div className='bg-base-300 flex min-h-full items-center justify-center px-4 py-10'>
      <Receipt order={order} orderItems={orderItems} />
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;

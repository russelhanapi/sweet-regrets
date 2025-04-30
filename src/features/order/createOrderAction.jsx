import { redirect } from 'react-router-dom';

import store from '../../../store';
import { addOrderItems, createOrder, getMenu } from '../../services/apiBakery';
import { calculateEstimatedTime } from '../../utils/helpers';
import { clearCart } from '../cart/cartSlice';

export default async function action({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Parse necessary fields from the form data
    const cart = JSON.parse(data.cart);
    const userLocation = JSON.parse(data.geolocation);

    // Calculate the estimated time based on user's location and order type
    const estimatedTime = await calculateEstimatedTime(
      userLocation,
      data.orderType,
    );

    // Build the order details
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

    // Create the order
    const newOrder = await createOrder(orderDetails);

    // Map cart to order items
    const menuData = await getMenu();
    const items = cart.map((cartItem) => {
      const menuItem = menuData.find((m) => m.id === cartItem.id);
      const price = menuItem?.price || 0;

      return {
        order_id: newOrder.id,
        item_id: cartItem.id,
        quantity: cartItem.quantity,
        total_price: price * cartItem.quantity,
      };
    });

    // Add items to the order
    await addOrderItems(items);

    // Clear the cart once the order is created
    store.dispatch(clearCart());

    // Redirect to the newly created order's (receipt) page
    return redirect(`/order/${newOrder.id}`);
  } catch (error) {
    console.error(error.message);
    throw new Error('There was an issue creating the order. Please try again.');
  }
}

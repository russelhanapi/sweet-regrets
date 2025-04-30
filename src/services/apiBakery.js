import supabase from './supabase';

export async function getMenu() {
  const { data, error } = await supabase.from('menu').select('*');
  if (error) throw new Error('Failed to fetch menu');
  return data;
}
export async function createOrder(newOrder) {
  const { data, error } = await supabase
    .from('orders')
    .insert([newOrder])
    .select()
    .single();
  if (error) throw new Error('Failed creating your order');
  return data;
}

export async function addOrderItems(items) {
  const { error } = await supabase.from('order_items').insert(items);
  if (error) {
    console.error('Error inserting order items:', error);
    throw new Error('Failed adding items to the order');
  }
}

export async function getOrder(id) {
  const { data, error } = await supabase
    .from('order_items') // querying the order_items table
    .select(' *, menu(*), order:order_id(*)') // select all columns, and join related data
    .eq('order_id', id); // filter: only rows where order_id === id

  if (error) throw new Error(`Couldn't find order #${id}`);

  // Returning the structure that matches the component's destructuring
  return {
    order: data?.[0]?.order, // Order information
    order_items: data.map((item) => ({
      quantity: item.quantity,
      total_price: item.total_price,
      menu: item.menu,
    })),
  };
}

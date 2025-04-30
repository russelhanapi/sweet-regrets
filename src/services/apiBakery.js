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

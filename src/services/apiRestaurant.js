const API_URL = "https://react-fast-pizza-api.jonas.io/api";
import supabase from "./supabase";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting menu");

  const { data } = await res.json();
  return data;
}

export async function getOrder(id) {
  const { data, error } = await supabase.from("order").select("*").eq("id", id);

  if (error) throw new Error("Could not get the order.");

  return data[0];
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();

    const { data: supabaseData, error } = await supabase
      .from("order")
      .insert([{ ...data }])
      .select();
    if (error) {
      console.error(error);
      throw new Error("Booking could not be deleted");
    }

    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id, updateObj) {
  const { data, error } = await supabase
    .from("order")
    .update(updateObj)
    .eq("id", id)
    .select();
  if (error) throw Error("Could not update the order.");
}

export async function getPreviousOrders() {
  try {
    const { data, error } = await supabase.from("order").select("*");
    if (error) {
      throw Error();
    }

    const updatedData = data.map((order) => {
      let updatedCart = order.cart.map(JSON.parse);

      return { ...order, cart: updatedCart };
    });

    return updatedData;
  } catch (err) {
    throw Error("Failed fetching previous orders");
  }
}

import { redirect, useLoaderData } from "react-router-dom";
import { getOrder, getPreviousOrders } from "../../services/apiRestaurant";
import { updateCartForReorder } from "../cart/cartSlice";
import store from "../../store";
import PreviousOrder from "./PreviousOrder";

function Orders() {
  const orders = useLoaderData();

  if (orders.length === 0) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold text-center">
          You have no previous orders
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <h2 className="mt-7 text-xl font-semibold text-center">
        Previous & Active Orders
      </h2>

      <ul className="flex flex-col gap-5">
        {orders.map((order) => (
          <PreviousOrder key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
}

export default Orders;

export async function action({ request }) {
  const formData = await request.formData();
  const prevOrder = await getOrder(formData.get("orderId"));
  store.dispatch(updateCartForReorder(prevOrder.cart.map(JSON.parse)));

  return redirect("/cart");
}

export async function loader() {
  const orders = await getPreviousOrders();

  return orders.reverse();
}

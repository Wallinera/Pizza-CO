import Button from "../../ui/Button";
import { useFetcher } from "react-router-dom";
import { formatCurrency, formatDate } from "../../utils/helpers";

function PreviousOrder({ order }) {
  function isOrderDelivered(order) {
    const created = new Date(order.createdAt).getTime();
    const estimated = new Date(order.estimatedDelivery).getTime();

    return Date.now() > estimated;
  }

  const totalPizzas = order.cart
    .map((item) => item.quantity)
    .reduce((acc, cur) => acc + cur, 0);

  const fetcher = useFetcher();
  return (
    <li className="flex flex-col gap-8 p-4 border border-stone-400 rounded-lg bg-stone-200">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <p className="font-medium text-lg">Order #{order.id}</p>
          <p className="text-sm text-stone-600">
            Delivered on {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="space-x-2">
          {order.priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {isOrderDelivered(order) ? "delivered" : "preparing"} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <p className="font-medium text-stone-600">
            {totalPizzas} Pizza{totalPizzas > 1 ? "s" : ""}
          </p>
          <p className=" font-medium text-stone-600">
            Total:{" "}
            <span className="font-bold">
              {formatCurrency(order.orderPrice + order.priorityPrice)}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button to={`/order/${order.id}`} type={"smallSecondary"}>
            details
          </Button>

          {/*Probably inside a fetcher.form*/}
          <fetcher.Form method="post">
            <input type="hidden" name="orderId" value={order.id} />
            <Button type={"primary"}>Reorder</Button>
          </fetcher.Form>
        </div>
      </div>
    </li>
  );
}

export default PreviousOrder;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getTotalPizzas, getTotalPrice } from "./cartSlice";

function CartOverview() {
  const totalPizzas = useSelector(getTotalPizzas);

  const totalPrice = useSelector(getTotalPrice);

  if (!totalPizzas) return;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{`${totalPizzas} Pizza${totalPizzas > 1 ? "s" : ""}`}</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

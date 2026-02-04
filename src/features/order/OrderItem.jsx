import { formatCurrency } from "../../utils/helpers";
import OrderIngredient from "./OrderIngredient";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice, removeIngredients } = item;
  const validIngredients = ingredients?.filter(
    (ingredient) => !removeIngredients.includes(ingredient)
  );

  return (
    <li className="py-3 space-y-1">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <ul className="flex flex-wrap gap-2 text-sm capitalize text-stone-500">
        {isLoadingIngredients
          ? "Loading..."
          : validIngredients?.map((ingredient) => (
              <OrderIngredient
                key={ingredient}
                itemName={name}
                ingredient={ingredient}
              />
            ))}
      </ul>
    </li>
  );
}

export default OrderItem;

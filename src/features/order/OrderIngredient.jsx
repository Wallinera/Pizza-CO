import { useFetcher } from "react-router-dom";

function OrderIngredient({ itemName, ingredient }) {
  const fetcher = useFetcher();
  return (
    <li className="flex items-center bg-stone-100 px-2 py-1 rounded-md">
      <fetcher.Form method="PATCH">
        <input
          type="hidden"
          name="ingredient"
          value={JSON.stringify([itemName, ingredient])}
        />
        <button className="flex items-center justify-center ml-1 mr-3 w-4 h-4 rounded-full text-white bg-red-500 cursor-pointer">
          x
        </button>
      </fetcher.Form>

      {ingredient}
    </li>
  );
}

export default OrderIngredient;

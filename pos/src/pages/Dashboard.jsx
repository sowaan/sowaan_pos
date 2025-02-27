import { useCallback, useEffect, useMemo } from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { useFrappeGetCall } from "frappe-react-sdk";

import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Cart from "./Cart";

import { addToCart, setItems } from "../redux/Items/items";
import SearchHeader from "../components/Headers/SearchHeader";
import CardLoader from "../common/Loaders/CardLoader";


const Dashboard = () => {
  const dispatch = useDispatch();
  const { value: posProfile } = useSelector((state) => state.posprofile);
  const items = useSelector((state) => state.items.value);
  const cartItems = useSelector((state) => state.items.cartItems, shallowEqual);

  const { data: posItems, isLoading: isPosItemsLoading } = useFrappeGetCall(
    "posawesome.posawesome.api.posapp.get_items",
    {
      pos_profile: JSON.stringify(posProfile),
      price_list: "",
      item_group: "",
      search_value: "",
      customer: "",
    }
  );

  const { data: itemDetails, isLoading: isItemDetailsLoading } =
    useFrappeGetCall("posawesome.posawesome.api.posapp.get_items_details", {
      pos_profile: JSON.stringify(posProfile),
      items_data: posItems && posItems.message,
    });

  useEffect(() => {
    if (itemDetails?.message) {
      dispatch(setItems(itemDetails.message));
    }
  }, [itemDetails, dispatch]);

  const handleCart = useCallback(
    (item) => {
      batch(() => {
        dispatch(addToCart(item));
      });
    },
    [dispatch]
  );

  const isLoading = isPosItemsLoading || isItemDetailsLoading;

  const renderItems = useMemo(() => {
    return items?.map((item, index) => (
      <Card
        key={index}
        image={item.image || "https://dummyimage.com/200x200"}
        title={item.item_name}
        price={`${item.currency} ${item.rate}`}
        onClick={() => handleCart(item)}
        selectedQTY={
          cartItems.find((i) => i.item_name === item.item_name)?.qty || ""
        }
      />
    ));
  }, [items, cartItems, handleCart]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <SearchHeader />
        <div className="container mx-auto max-w-screen-2xl p-4 pt-1 md:p-2 2xl:p-10">
          <div className="grid grid-cols-1 gap-2 sm:gap-4 px-0 sm:px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading ? (
              <>
                {Array.from({ length: 8 }, (_, index) => (
                  <CardLoader key={index} />
                ))}
              </>
            ) : (
              renderItems
            )}
          </div>
        </div>
      </div>
      <Cart />
    </div>
  );
};

export default Dashboard;

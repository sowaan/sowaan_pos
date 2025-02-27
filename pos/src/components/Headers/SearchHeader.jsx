import { useState } from "react";
import { IconBag, IconMenu, IconSearch } from "../../common/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCartScreen,
  toggleSidebar,
} from "../../redux/sidebar/sidebarSlice";
import { setItems } from "../../redux/Items/items";

const SearchHeader = () => {
  const dispatch = useDispatch();
  const [storeItems, setStoreItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { value: items, cartTotalItems } = useSelector((state) => state.items);

  const onSearch = (e) => {
    e.preventDefault();
    if (storeItems.length === 0) {
      setStoreItems(items);
    }
    const filterItem = items.filter((item) =>
      item.item_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    dispatch(setItems(filterItem));
  };

  const onChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      dispatch(setItems(storeItems));
    }
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-gray-100">
      <div className="container mx-auto flex flex-wrap p-5 px-0 sm:px-5 flex-row items-center justify-between">
        <button
          aria-controls="sidebar"
          onClick={() => dispatch(toggleSidebar())}
          className="flex title-font p-2 font-medium items-center text-gray-900 rounded-lg bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <IconMenu />
        </button>
        <div className="lg:ml-auto lg:mr-auto flex flex-wrap items-center text-base justify-center">
          <div className="max-w-7xl w-full sm:w-full md:w-xs lg:w-xl">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IconSearch />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Items..."
                value={searchValue}
                onChange={onChange}
              />
              <button
                onClick={onSearch}
                className="text-white absolute end-1.5 bottom-2 sm:bottom-1 mb-[1px] bg-[#0277fa] hover:bg-[#0275ef] cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm font-bold px-2 sm:px-4 md:px-2 lg:px-8 py-1 sm:py-2"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="lg:hidden inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none rounded text-base">
          <button
            onClick={() => dispatch(toggleCartScreen())}
            className="relative inline-flex items-center p-2 text-sm font-medium text-center rounded-lg bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <IconBag />
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2">
              {cartTotalItems}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;

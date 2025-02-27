import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useFrappeGetCall } from "frappe-react-sdk";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  removeFromCart,
  subtractFromCart,
} from "../redux/Items/items";
import {
  setCustomer,
  setInvoiceName,
} from "../redux/posdetails/posdetailSlice";
import { toggleCartScreen } from "../redux/sidebar/sidebarSlice";

import CardItem from "../components/CardItem";
import { IconAdd, IconGoBack } from "../common/Icons";
import CustomerDialog from "../components/CustomerDialog";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [customerError, setCustomerError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const cartScreen = useSelector((state) => state.sidebar.cartScreen);
  const { cartItems, subTotal } = useSelector((state) => state.items);
  const posProfile = useSelector((state) => state.posprofile.value);
  const openingShift = useSelector((state) => state.posprofile.openingShift);
  const customer = useSelector(
    (state) => state.posprofile.customer,
    shallowEqual
  );
  const invoiceName = useSelector(
    (state) => state.posprofile.invoiceName,
    shallowEqual
  );

  const { data: customerData, isLoading } = useFrappeGetCall(
    "posawesome.posawesome.api.posapp.get_customer_names",
    { pos_profile: JSON.stringify(posProfile) }
  );

  const formattedCustomerData = useMemo(
    () => customerData?.message ?? [],
    [customerData]
  );

  const handlePayment = useCallback(async () => {
    if (!customer) {
      setCustomerError("Please select a customer");
      toast.error("Please select a customer");
      return;
    }
    setLoading(true);
    try {
      const invoiceData = {
        doctype: "Sales Invoice",
        is_pos: 1,
        ignore_pricing_rule: 1,
        company: posProfile.company,
        pos_profile: posProfile.name,
        currency: posProfile.currency,
        customer: customer,
        items: cartItems,
        total: subTotal,
        discount_amount: 0,
        additional_discount_percentage: 0,
        posa_pos_opening_shift: openingShift.name,
        payments: openingShift.balance_details,
        taxes: [],
        posa_offers: [],
        posa_coupons: [],
        posa_delivery_charges: 0,
        posa_delivery_charges_rate: 0,
        posting_date: moment().format("YYYY-MM-DD"),
      };

      if (invoiceName) {
        invoiceData["name"] = invoiceName;
      }

      const formData = new FormData();
      formData.append("data", JSON.stringify(invoiceData));

      const response = await axios.post(
        "/api/method/posawesome.posawesome.api.posapp.update_invoice",
        formData
      );
      if (response.status === 200) {
        dispatch(setInvoiceName(""));
        navigate("/submit-invoice", {
          state: { subTotal: subTotal, invoice: response.data.message },
        });
      }
    } catch (error) {
      console.error("Payment error || Invoice error:", error);
    } finally {
      setLoading(false);
    }
  }, [
    customer,
    posProfile,
    cartItems,
    subTotal,
    invoiceName,
    openingShift,
    navigate,
    dispatch,
  ]);

  const handleAddToCart = useCallback(
    (item) => dispatch(addToCart(item)),
    [dispatch]
  );
  const handleSubtractFromCart = useCallback(
    (item) => dispatch(subtractFromCart(item)),
    [dispatch]
  );
  const handleRemoveFromCart = useCallback(
    (item) => dispatch(removeFromCart(item)),
    [dispatch]
  );

  const renderCartItems = useMemo(
    () =>
      cartItems.map((item, index) => (
        <CardItem
          key={index}
          title={item.item_name}
          image={item.image}
          price={`${item.currency} ${item.rate}`}
          qty={item.qty}
          onAdd={() => handleAddToCart(item)}
          onSubtract={() => handleSubtractFromCart(item)}
          onRemove={() => handleRemoveFromCart(item)}
        />
      )),
    [cartItems, handleAddToCart, handleSubtractFromCart, handleRemoveFromCart]
  );

  return (
    <div
      className={`absolute right-0 md:sticky top-0 z-9999 lg:flex flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark md:translate-x-0 h-screen w-screen sm:w-90
         ${cartScreen ? "translate-x-0" : "hidden translate-x-full"}
      `}
    >
      <CustomerDialog
        open={openDialog}
        close={() => setOpenDialog(!openDialog)}
      />
      <div className="overflow-y-auto py-5 pt-0 px-3 flex flex-col h-full bg-white border-l border-gray-200">
        <div className="sticky top-0 bg-white z-10 py-5 px-1 md:px-3 border-b border-gray-200">
          <div className="flex">
            <button
              aria-controls="sidebar"
              onClick={() => dispatch(toggleCartScreen())}
              className="flex title-font mr-2 md:hidden p-2 px-3 font-medium items-center text-gray-900 rounded-lg bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <IconGoBack />
            </button>
            {isLoading ? (
              <div className="h-10 w-full bg-gray-100 rounded-lg"></div>
            ) : (
              <Select
                label={customerError ? customerError : "Customer"}
                onChange={(value) => {
                  dispatch(setCustomer(value));
                  setCustomerError("");
                }}
                value={customer}
                error={customerError}
              >
                {formattedCustomerData.map((cus, index) => (
                  <Option key={index} value={cus.name}>
                    {cus.name}
                  </Option>
                ))}
              </Select>
            )}
            <IconButton
              variant="outlined"
              className=" cursor-pointer ml-2 items-center px-4"
              onClick={() => setOpenDialog(true)}
            >
              <IconAdd />
            </IconButton>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-5">{renderCartItems}</div>
        <div className="sticky bottom-0 right-0 left-0 bg-white">
          <hr className="my-5 text-gray-500 border-dashed border-1" />
          <div className="flex justify-between mb-1">
            <h3 className="text-gray-500 font-bold text-sm">Subtotal</h3>
            <h3 className="text-[#0277fa] font-bold text-sm">{subTotal}</h3>
          </div>
          <div className="flex justify-between mb-1">
            <h3 className="text-gray-500 font-bold text-sm">Discount sales</h3>
            <h3 className="text-[#0277fa] font-bold text-sm">0.00</h3>
          </div>
          <div className="flex justify-between mb-1">
            <h3 className="text-gray-500 font-bold text-sm">Total sales tax</h3>
            <h3 className="text-[#0277fa] font-bold text-sm">0.00</h3>
          </div>
          <hr className="my-5 text-gray-300 border-1" />
          <div className="flex justify-between mb-3">
            <h3 className="text-gray-500 font-bold text-lg">Total</h3>
            <h3 className="text-[#0277fa] font-bold text-lg">
              {posProfile && posProfile.currency} {subTotal}
            </h3>
          </div>
          <button
            disabled={cartItems.length === 0 || loading}
            onClick={handlePayment}
            className="text-white w-full disabled:bg-gray-400 disabled:cursor-not-allowed bg-[#0277fa] hover:bg-[#0275ef] cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-8 py-2"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

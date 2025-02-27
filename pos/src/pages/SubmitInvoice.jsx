import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useFrappeGetCall } from "frappe-react-sdk";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Option, Select, Typography } from "@material-tailwind/react";

import { IconGoBack } from "../common/Icons";
import { CustomInput } from "../components/Inputs";
import { clearCart } from "../redux/Items/items";
import { setInvoiceName } from "../redux/posdetails/posdetailSlice";

const SubmitInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: locationData } = useLocation();

  const { value: posProfile } = useSelector((state) => state.posprofile);

  const { data: salesPerson, isLoading: spLoading } = useFrappeGetCall(
    "posawesome.posawesome.api.posapp.get_sales_person_names"
  );

  // Initialize input values for each payment method
  const initializeInputValues = useCallback(() => {
    return posProfile?.payments?.reduce((acc, row) => {
      acc[row.mode_of_payment] = row.default === 1 ? locationData.subTotal : 0;
      return acc;
    }, {});
  }, [posProfile, locationData.subTotal]);

  const [inputValues, setInputValues] = useState(initializeInputValues);
  const [selectSalesPerson, setSelectSalesPerson] = useState("");
  const [loading, setLoading] = useState(false);

  const totalSum = useMemo(
    () => Object.values(inputValues).reduce((sum, val) => sum + Number(val), 0),
    [inputValues]
  );

  const paidChange = useMemo(() => {
    return Math.abs(totalSum - locationData.subTotal);
  }, [totalSum, locationData.subTotal]);

  const handleInputChange = useCallback((mode, value) => {
    const sanitizedValue = Math.max(0, Number(value));
    setInputValues((prev) => ({
      ...prev,
      [mode]: sanitizedValue,
    }));
  }, []);

  const handleButtonClick = useCallback(
    (selectedMode) => {
      // setInputValues(initializeInputValues);
      setInputValues(() => {
        const newValues = initializeInputValues(); // Get fresh default values
        Object.keys(newValues).forEach((key) => (newValues[key] = 0)); // Reset all to 0
        newValues[selectedMode] = locationData.subTotal; // Set only selected mode
        return newValues;
      });
    },
    [initializeInputValues, locationData.subTotal]
  );

  const handleSubmit = () => {
    let invoiceDoc = locationData.invoice;
    if (!invoiceDoc.is_return && locationData.subTotal < 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setLoading(true);
    let data = {
      total_change: !invoiceDoc.is_return
        ? Math.max(locationData.subTotal - totalSum, 0)
        : 0,
      paid_change: !invoiceDoc.is_return ? paidChange : 0,
      credit_change: 0,
      redeemed_customer_credit: 0,
      customer_credit_dict: [],
      is_cashback: true,
    };
    invoiceDoc.payments = invoiceDoc.payments.map((payment) => ({
      ...payment,
      amount: inputValues[payment.mode_of_payment] || 0,
    }));

    let formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("invoice", JSON.stringify(invoiceDoc));
    axios
      .post(
        "/api/method/posawesome.posawesome.api.posapp.submit_invoice",
        formData
      )
      .then(() => {
        toast.success("Invoice submitted successfully!");
        // i want to clear the cart after submitting the invoice
        dispatch(clearCart());
        dispatch(setInvoiceName(""));
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        const message = JSON.parse(error.response?.data?._server_messages);

        toast.error(JSON.parse(message).message || "Failed to submit invoice.");
        setLoading(false);
      });
  };

  return (
    <div className="overflow-y-auto mx-auto py-5 pt-0 px-3 flex flex-col h-full bg-white border-l border-gray-200">
      <div className="container mx-auto sticky top-0 bg-white z-10 py-5 px-1 md:px-3 border-b border-gray-200">
        <div className="flex items-center">
          <button
            aria-controls="sidebar"
            onClick={() => navigate(-1)}
            className="cursor-pointer  flex title-font mr-2 p-3 font-medium items-center text-gray-900 rounded-lg bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <IconGoBack />
          </button>
          <h1 className="text-xl font-bold">Payment</h1>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex-1 overflow-y-auto py-5">
          <div className=" grid grid-cols-2 gap-2 sm:gap-4 px-0 sm:px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="w-full">
              <CustomInput
                label="Paid Amount"
                id="paid_amount"
                type="number"
                min="0"
                value={totalSum}
                disabled
              />
            </div>
            {locationData.subTotal - totalSum < 0 && (
              <div className="w-full">
                <CustomInput
                  label="Change"
                  id="change"
                  type="number"
                  disabled
                  value={locationData.subTotal - totalSum}
                />
              </div>
            )}
            <div className="w-full">
              <CustomInput
                label="Paid Change"
                id="paid_change"
                type="number"
                disabled
                value={
                  totalSum > locationData.subTotal
                    ? totalSum - locationData.subTotal
                    : locationData.subTotal - totalSum
                }
              />
            </div>
            {locationData.subTotal - totalSum < 0 && (
              <div className="w-full">
                <CustomInput
                  label="Credit Change"
                  id="credit_change"
                  type="number"
                  disabled
                  value={0}
                />
              </div>
            )}
          </div>
          <div className="sm:mx-4">
            {posProfile &&
              posProfile.payments &&
              posProfile.payments.map((row, index) => {
                return (
                  <div key={index} className="flex flex-row items-end">
                    <CustomInput
                      label={row.mode_of_payment}
                      id={row.mode_of_payment}
                      type="number"
                      required
                      min="0"
                      value={inputValues[row.mode_of_payment] || ""}
                      onChange={(e) =>
                        handleInputChange(row.mode_of_payment, e.target.value)
                      }
                    />
                    <div className="m-2 sm:m-4"></div>
                    <Button
                      className="w-full mb-4 cursor-pointer"
                      color="blue"
                      size="regular"
                      onClick={() => handleButtonClick(row.mode_of_payment)}
                    >
                      {row.mode_of_payment}
                    </Button>
                  </div>
                );
              })}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 px-0 sm:px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="w-full">
              <CustomInput
                label="Net Total"
                id="net_total"
                type="number"
                disabled
                value={locationData.subTotal}
              />
            </div>
            <div className="w-full">
              <CustomInput
                label="Tax and Charges"
                id="tax_and_charges"
                type="number"
                disabled
                value={0}
              />
            </div>
            <div className="w-full">
              <CustomInput
                label="Total Amount"
                id="total_amount"
                type="number"
                disabled
                value={locationData.subTotal}
              />
            </div>
            <div className="w-full">
              <CustomInput
                label="Discount Amount"
                id="discount_amount"
                type="number"
                disabled
                value={0}
              />
            </div>
            <div className="w-full">
              <CustomInput
                label="Grand Total"
                id="grand_total"
                type="number"
                disabled
                value={locationData.subTotal}
              />
            </div>
            <div className="w-full">
              <CustomInput
                label="Round Total"
                id="round_total"
                type="number"
                disabled
                value={locationData.subTotal}
              />
            </div>
            <div className="relative w-full mb-4">
              <Typography className="leading-7 text-sm text-gray-700 my-1">
                Sales Person
              </Typography>
              {!spLoading && salesPerson && (
                <Select
                  required
                  onChange={(value) => setSelectSalesPerson(value)}
                  value={selectSalesPerson}
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full bg-white rounded-lg border border-gray-300 focus:border-[#0277fa] focus:ring-2 focus:ring-[#3f99ff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  {salesPerson &&
                    salesPerson.message.map((person, index) => {
                      return (
                        <Option key={index} value={person.name}>
                          {person.name}
                        </Option>
                      );
                    })}
                </Select>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around ">
          <Button
            onClick={handleSubmit}
            color="blue"
            className="cursor-pointer w-full sm:w-auto"
            size="regular"
            disabled={loading}
          >
            {loading ? "Loading ..." : "Submit Payment"}
          </Button>
          <div className="m-2 sm:m-0"></div>
          <Button
            onClick={() => {
              dispatch(setInvoiceName(locationData.invoice.name));
              navigate(-1);
            }}
            color="red"
            className="cursor-pointer w-full sm:w-auto"
            size="regular"
          >
            Cancel Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitInvoice;

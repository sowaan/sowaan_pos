import DataTable from "react-data-table-component";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { useEffect, useMemo, useState } from "react";

import { useFrappeGetCall } from "frappe-react-sdk";
import axios from "axios";

const ShiftDialog = () => {
  const { data, isLoading: loading } = useFrappeGetCall(
    "posawesome.posawesome.api.posapp.get_opening_dialog_data"
  );
  const [openingAmount, setOpeningAmount] = useState([]);
  const [company, setCompany] = useState("");
  const [posProfile, setPosProfile] = useState("");
  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (data?.message?.payments_method) {
      // Initialize state with the same length as payments_method
      setOpeningAmount(
        data.message.payments_method.map((row) => ({
          mode_of_payment: row.mode_of_payment,
          amount: 0,
          currency: row.currency,
        }))
      );
    }
  }, [data]);

  const handleAmountChange = (index, value) => {
    const updatedAmounts = [...openingAmount];
    updatedAmounts[index].amount = value;
    setOpeningAmount(updatedAmounts);
  };

  const columns = useMemo(
    () => [
      {
        name: <div className="font-bold">Mode of Payment</div>,
        selector: (row) => (
          <div
            className=""
            onClick={() => {
              // navigate(`/assignment/${row.name}`);
            }}
          >
            {row.mode_of_payment}
          </div>
        ),
      },
      {
        name: <div className="font-bold">Opening Amount</div>,
        selector: (row, index) => (
          <Input
            type="number"
            label="Amount"
            placeholder="0"
            value={
              (openingAmount &&
                openingAmount[index] &&
                openingAmount[index].amount) ||
              ""
            }
            onChange={(e) => handleAmountChange(index, e.target.value)}
            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        ),
      },
    ],
    [data, openingAmount]
  );

  const handleConfirm = () => {
    axios
      .post(
        "/api/method/posawesome.posawesome.api.posapp.create_opening_voucher",
        {
          pos_profile: posProfile,
          company: company,
          balance_details: JSON.stringify(openingAmount),
        }
      )
      .then((response) => {
        console.log(response);
        handleOpen();
        window.location.reload();
      })
      .catch((error) => {
        console.error(error, "error 98");
      });
  };

  return (
    <Dialog size="xs" open={open}>
      <DialogHeader>Create POS Opening Shift</DialogHeader>
      <DialogBody>
        <form>
          <div className="mb-4">
            {data && (
              <Select
                required
                label="Company"
                onChange={(value) => setCompany(value)}
              >
                {data &&
                  data.message.companies.map((company, index) => {
                    return (
                      <Option key={index} value={company.name}>
                        {company.name}
                      </Option>
                    );
                  })}
              </Select>
            )}
          </div>
          <div className="mb-4">
            {data && (
              <Select
                required
                label="POS Profile"
                value={posProfile}
                onChange={(value) => setPosProfile(value)}
              >
                {data &&
                  data.message.pos_profiles_data.map((profile, index) => {
                    return (
                      <Option key={index} value={profile.name}>
                        {profile.name}
                      </Option>
                    );
                  })}
              </Select>
            )}
          </div>
          <div className="mb-4">
            <DataTable
              title={<h2 className="">Payment Method</h2>}
              columns={columns}
              data={(data && data.message.payments_method) || []}
              progressPending={loading}
              pagination
              highlightOnHover
              pointerOnHover
            />
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          className="w-full cursor-pointer bg-[#0277fa] hover:bg-[#0275ef]"
          onClick={handleConfirm}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ShiftDialog;

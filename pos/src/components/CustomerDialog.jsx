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
import axios from "axios";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CustomerDialog = ({ open, close }) => {
  const posProfile = useSelector((state) => state.posprofile.value);

  const [data, setData] = useState({
    customer_name: "",
    tax_id: "",
    mobile_number: "",
    email_id: "",
    referral_code: "",
    birthday: "",
  });
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCustomerGroup, setSelectedCustomerGroup] = useState("");
  const [selectedTerritory, setSelectedTerritory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: customerGroups } = useFrappeGetDocList("Customer Group", {
    fields: ["name"],
    filters: [["is_group", "=", 0]],
    orderBy: {
      field: "name",
      order: "desc",
    },
  });
  const { data: territory } = useFrappeGetDocList("Territory", {
    fields: ["name"],
    filters: [["is_group", "=", 0]],
    orderBy: {
      field: "name",
      order: "desc",
    },
  });
  const { data: gender } = useFrappeGetDocList("Gender", {
    fields: ["name"],
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!data.customer_name || !selectedCustomerGroup || !selectedTerritory) {
      setError("Please fill all the required fields");
      toast.error("Please fill all the required fields");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      const formData = new FormData();
      formData.append("customer_id", "");
      formData.append("customer_name", data.customer_name);
      formData.append("company", posProfile.company);
      formData.append("pos_profile_doc", JSON.stringify(posProfile)); // Convert object to JSON
      formData.append("customer_group", selectedCustomerGroup);
      formData.append("territory", selectedTerritory);
      formData.append("gender", selectedGender);
      formData.append("tax_id", data.tax_id);
      formData.append("mobile_number", data.mobile_number);
      formData.append("email_id", data.email_id);
      formData.append("referral_code", data.referral_code);
      formData.append("birthday", data.birthday);

      const response = await axios.post(
        "api/method/posawesome.posawesome.api.posapp.create_customer",
        formData
      );
      if (response.status === 200) {
        toast.success("Customer created successfully");
        close();
      }
    } catch (error) {
      console.log("error", error);
      setError(error.response.data.exception || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog color="red" size="xs" open={open}>
      <DialogHeader>Create Customer</DialogHeader>
      <DialogBody>
        <form>
          <Input
            maxLength={16}
            label="Customer Name *"
            name="customer_name"
            onChange={onChangeHandler}
            value={data.customer_name}
            className={`${
              !data.customer_name && "border-gray-900!"
            } focus:border-t-transparent! `}
          />
          <div className="m-2"></div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Input
              type="text"
              label="Tax ID"
              name="tax_id"
              onChange={onChangeHandler}
              value={data.tax_id}
              className={`${
                !data.tax_id && "border-gray-900!"
              } focus:border-t-transparent!`}
            />
            <Input
              type="number"
              label="Mobile Number"
              name="mobile_number"
              onChange={onChangeHandler}
              value={data.mobile_number}
              className={`${
                !data.mobile_number && "border-gray-900!"
              } focus:border-t-transparent!`}
            />
            <Input
              type="email"
              label="Email Id"
              name="email_id"
              onChange={onChangeHandler}
              value={data.email_id}
              className={`${
                !data.email_id && "border-gray-900!"
              } focus:border-t-transparent!`}
            />
            <Select
              label="Gender"
              name="gender"
              onChange={(value) => setSelectedGender(value)}
              value={selectedGender}
            >
              {gender &&
                gender.map((gen, index) => (
                  <Option key={index} value={gen.name}>
                    {gen.name}
                  </Option>
                ))}
            </Select>
            <Input
              type="text"
              label="Referral Code"
              name="referral_code"
              onChange={onChangeHandler}
              value={data.referral_code}
              className={`${
                !data.referral_code && "border-gray-900!"
              } focus:border-t-transparent!`}
            />
            <Input
              type="date"
              label="Birthday"
              name="birthday"
              onChange={onChangeHandler}
              value={data.birthday}
            />
            <Select
              label="Customer Group *"
              name="customer_group"
              onChange={(value) => setSelectedCustomerGroup(value)}
              value={selectedCustomerGroup}
            >
              {customerGroups &&
                customerGroups.map((group, index) => (
                  <Option key={index} value={group.name}>
                    {group.name}
                  </Option>
                ))}
            </Select>
            <Select
              label="Territory *"
              name="territory"
              onChange={(value) => setSelectedTerritory(value)}
              value={selectedTerritory}
            >
              {territory &&
                territory.map((terr, index) => (
                  <Option key={index} value={terr.name}>
                    {terr.name}
                  </Option>
                ))}
            </Select>
          </div>
        </form>
        {error && (
          <p className="bg-red-500 text-red-200 p-4 rounded-xl text-sm">
            {error}
          </p>
        )}
      </DialogBody>
      <DialogFooter>
        <div className="flex justify-between w-full">
          <Button
            className="w-full cursor-pointer bg-red-500 hover:bg-red-400"
            onClick={close}
          >
            Cancel
          </Button>
          <div className="m-2"></div>
          <Button
            className="w-full cursor-pointer bg-[#0277fa] hover:bg-[#0275ef]"
            onClick={handleCreate}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default CustomerDialog;

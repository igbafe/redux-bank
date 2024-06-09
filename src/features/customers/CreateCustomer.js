import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer, updateName } from "./CustomerSlice";

function CreateCustomer() {
  const [fullName, setFullName] = useState("");
  const [nationalID, setNationalId] = useState("");

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!fullName || !nationalID) return
    dispatch(createCustomer(fullName,nationalID));
  };
  return (
    <div className="pl-5">
      <h2 className="font-bold text-xl mb-6">Create new customer</h2>
      <div className="flex flex-col gap-3 p-8  w-[600px] bg-slate-300 border">
        <div>
          <label className="mr-2">Customer FullName</label>
          <input
            type="text"
            value={fullName} className="border border-black"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label className="mr-2" htmlFor="label">National ID</label>
          <input
            type="text"
            value={nationalID}  className="border border-black"
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button  className="border w-[15rem] p-2 text-white bg-black border-black" onClick={handleClick}>Create New Customer</button>
      </div>
    </div>
  );
}

export default CreateCustomer;

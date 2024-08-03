import { useState } from "react";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { HiOutlinePencilAlt, HiOutlineUser } from "react-icons/hi";

const Roles = {
  FINAL_USER: 0,
  CONTENT_CREATOR: 1,
  VALIDATOR: 2,
};

const RoleManager = ({ role, setRole }) => {
  //0 -> FINAL_USER
  //1 -> CONTENT_CREATOR
  //2 -> VALIDATOR

  const handleRoleChanged = (e) => {
    setRole(Number(e.target.value));
  };

  return (
    <ul className="flex w-full gap-x-2">
      <li className="w-full">
        <div className="">
          <input
            type="radio"
            name="role"
            id="role_1"
            className="hidden peer"
            value={Roles.FINAL_USER}
            checked={role === Roles.FINAL_USER}
            onChange={handleRoleChanged}
          />
          <label
            htmlFor="role_1"
            className="flex flex-col items-center justify-center p-2 text-sm border rounded-lg cursor-pointer gap-y-1 peer-checked:text-secondary peer-checked:border-secondary "
          >
            <HiOutlineUser className="size-6" />
            User
          </label>
        </div>
      </li>
      <li className="w-full">
        <div className="">
          <input
            type="radio"
            name="role"
            id="role_2"
            className="hidden peer"
            value={Roles.CONTENT_CREATOR}
            checked={role === Roles.CONTENT_CREATOR}
            onChange={handleRoleChanged}
          />
          <label
            htmlFor="role_2"
            className="flex flex-col items-center justify-center p-2 text-sm border rounded-lg cursor-pointer gap-y-1 peer-checked:text-secondary peer-checked:border-secondary "
          >
            <HiOutlinePencilAlt className="size-6" />
            Creator
          </label>
        </div>
      </li>
      <li className="w-full">
        <div className="">
          <input
            type="radio"
            name="role"
            id="role_3"
            className="hidden peer"
            value={Roles.VALIDATOR}
            checked={role === Roles.VALIDATOR}
            onChange={handleRoleChanged}
          />
          <label
            htmlFor="role_3"
            className="flex flex-col items-center justify-center p-2 text-sm border rounded-lg cursor-pointer gap-y-1 peer-checked:text-secondary peer-checked:border-secondary "
          >
            <HiOutlineShieldCheck className="size-6" />
            Validator
          </label>
        </div>
      </li>
    </ul>
  );
};

export default RoleManager;

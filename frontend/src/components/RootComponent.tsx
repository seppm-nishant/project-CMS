import { useState } from "react";
import Navbar from "./Navbar";
import { ArrowRightFromLine } from "lucide-react";
import { Outlet } from "react-router-dom";

const CustomeRoot = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Navbar toggle={toggle} isOpen={isOpen} />
      <div className="grow px-2 py-4">
        <span
          onClick={toggle}
          className="text-gray-600 lg:hidden hover:text-gray-700 cursor-pointer"
        >
          {" "}
          <ArrowRightFromLine />
        </span>
        <div className="px-2 lg:px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomeRoot;

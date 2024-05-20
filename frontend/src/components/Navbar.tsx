import { useState, useEffect } from "react";
import { ArrowLeftFromLine, Plus, RotateCw, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { tableInterface } from "../types";

function RelationLabel({
  name,
  getTables,
}: {
  name: string;
  getTables: () => Promise<void>;
}) {
  const removeTable = async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/removeTable",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableName: name }),
      }
    );

    if (response.ok) {
      confirm("Table has been removed");
      getTables();
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <li className="flex justify-between">
      <Link to={"/relation/" + name}>
        <span
          className="text-gray-600 hover:text-gray-700 cursor-pointer
        "
        >
          {name}
        </span>{" "}
      </Link>
      <span
        id={name}
        onClick={removeTable}
        className="
                text-gray-600 hover:text-gray-700 cursor-pointer
                "
      >
        <Trash2 size={22} />
      </span>
    </li>
  );
}

function Navbar({ toggle, isOpen }: { toggle: () => void; isOpen: boolean }) {
  const [tables, setTables] = useState([] as tableInterface[]);

  const getTables = async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + "/getTables");
    const data = await response.json();
    setTables(data.tables);
  };

  useEffect(() => {
    getTables();
  }, []);

  return (
    <div className="z-20">
      <nav
        className={`fixed top-0 ${
          isOpen ? "left-0" : "-left-full"
        } bottom-0 lg:sticky lg:h-[100vh]  divide-y p-2 w-[300px] border bg-gray-50 transition-all duration-700 ease`}
      >
        <div className="flex justify-between align-middle py-8">
          <span className="text-2xl font-semibold text-gray-800">
            <Link to={"/"}>Simple CMS</Link>
          </span>
          <span
            onClick={toggle}
            className="text-gray-600 lg:hidden hover:text-gray-700 cursor-pointer"
          >
            <ArrowLeftFromLine />
          </span>
        </div>
        <div className="">
          <div className="flex justify-between py-6 ">
            <span className="text-gray-600 font-semibold">Relations</span>
            <div className="flex justify-end gap-2 align-middle items-center">
              <span className="text-gray-600 hover:text-gray-700 cursor-pointer">
                <Link to={"/relationCreation"}>
                  <Plus size={28} strokeWidth={2} />
                </Link>
              </span>
              <span
                onClick={() => getTables()}
                className="text-gray-600 hover:text-gray-700 cursor-pointer"
              >
                <RotateCw size={26} strokeWidth={2} />
              </span>
            </div>
          </div>

          <div className="list-none flex justify-start flex-col gap-3">
            {tables.map((t) => (
              <RelationLabel key={t.id} name={t.name} getTables={getTables} />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

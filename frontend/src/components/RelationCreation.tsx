import { useState } from "react";
import PopupContainer from "./PopupContainer";
import { fieldInterface } from "../types";

function FieldCreationForm({
  isOpen,
  toggle,
  handleFormSubmit,
}: {
  isOpen: boolean;
  toggle: () => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <PopupContainer isOpen={isOpen} toggle={toggle}>
        <div className="text-2xl pb-4">Add Field</div>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <label className="label" htmlFor="name">
            Name
          </label>
          <input className="input" name="name" type="text" required />

          <label className="label" htmlFor="title">
            Title
          </label>
          <input className="input" name="title" type="text" required />

          <label className="label" htmlFor="type">
            Type
          </label>
          <select className="input" name="type" id="type" required>
            <option value="">select a type</option>
            <option value="varchar">varchar</option>
            <option value="numeric">numeric</option>
            <option value="timestamp">timestamp</option>
            <option value="date">date</option>
            <option value="time">time</option>
            <option value="text">text</option>
            <option value="text">boolean</option>
          </select>

          <div className="flex justify-start gap-2 pt-6">
            <input type="checkbox" name="isPrimary" />
            <label className="label" htmlFor="isPrimary">
              Primary key
            </label>
          </div>

          <div className="pt-8">
            <button className="primaryBtn">Add</button>
          </div>
        </form>
      </PopupContainer>
    </>
  );
}

function RelationCreation() {
  const [tableStructure, setTableStructure] = useState([] as fieldInterface[]);
  const [tableName, setTableName] = useState("");

  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData.entries()) as { [k: string]: any };

    if (Object.keys(data).includes("isPrimary")) {
      data["isPrimary"] = true;
    } else {
      data["isPrimary"] = false;
    }

    setTableStructure([...tableStructure, data as fieldInterface]);

    e.currentTarget.reset();
  };

  const handleRemove = (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id;

    const filteredData = tableStructure.filter((field) => field.name !== id);

    setTableStructure(filteredData);
  };

  const handleTableCreate = async () => {
    if (!tableName.length) {
      alert("Enter the table name");
      return;
    }

    if (!tableStructure.length) {
      alert("Add at least one field");
      return;
    }

    let primaryKeyCount = 0;

    for (let i = 0; i < tableStructure.length; i++) {
      const element = tableStructure[i];

      if (element.isPrimary) {
        primaryKeyCount++;
      }
    }

    if (primaryKeyCount !== 1) {
      alert("Only one primary key should be present.");
      return;
    }

    const response = await fetch(import.meta.env.VITE_API_URL + "/addTable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableName, fields: tableStructure }),
    });

    if (response.ok) {
      confirm("The table has been created");
      setTableName("");
      setTableStructure([]);
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <FieldCreationForm
        isOpen={isOpen}
        toggle={toggle}
        handleFormSubmit={handleFormSubmit}
      />

      <div className="py-6">
        <input
          className="w-full py-2 text-3xl rounded-sm focus:outline-none"
          type="text"
          placeholder="Relation name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
      </div>

      <div className="flex justify-between align-middle pt-6">
        <span className="text-2xl text-gray-700">Fields</span>
        <button
          onClick={toggle}
          className="px-6 py-3 rounded-md bg-black text-white font-semibold"
        >
          Add
        </button>
      </div>

      <div className="pt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Constraint
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {tableStructure.map((field) => (
              <tr key={field.name} className="bg-white border-b">
                <td className="px-6 py-4">{field.name}</td>
                <td className="px-6 py-4">{field.title}</td>
                <td className="px-6 py-4">{field.type}</td>
                <td className="px-6 py-4">
                  {field.isPrimary ? "Primary Key" : ""}
                </td>
                <td
                  id={field.name}
                  className="px-6 py-4 text-red-500 underline font-semibold cursor-pointer hover:to-red-600"
                  onClick={(e) => handleRemove(e)}
                >
                  Remove
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-8">
        <button
          onClick={handleTableCreate}
          className="px-6 py-3 rounded-md bg-black text-white font-semibold"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default RelationCreation;

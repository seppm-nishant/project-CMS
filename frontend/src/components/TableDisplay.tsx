import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fieldInterface } from "../types";
import PopupContainer from "./PopupContainer";

interface TableDataInterface {
  tableStructure: fieldInterface[];
  records: { [k: string]: any }[];
}

function InputElement({
  title,
  type,
}: // isPrimary,
{
  type:
    | "numeric"
    | "timestamp"
    | "date"
    | "time"
    | "boolean"
    | "varchar"
    | "text";
  title: string;
  // isPrimary: boolean;
}) {
  const getInputType = () => {
    switch (type) {
      case "boolean":
        return "radio";
        break;

      case "date":
        return "date";
        break;

      case "numeric":
        return "number";
        break;

      case "text":
        return "text";
        break;

      case "time":
        return "time";
        break;

      case "timestamp":
        return "datetime-local";

      case "varchar":
        return "text";
        break;

      default:
        break;
    }
  };

  return (
    <>
      <label className="label" htmlFor={title}>
        {title}
      </label>
      <input id={title} className="input" type={getInputType()} name={title} />
    </>
  );
}

function Row({
  row,
  primaryKey,
  handleRemoveButtonEvent,
  handleEditButtonEvent,
}: {
  row: { [k: string]: any };
  primaryKey: string;
  handleRemoveButtonEvent: (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => void;
  handleEditButtonEvent: (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => void;
}) {
  return (
    <tr className="bg-white border-b">
      {Object.keys(row).map((k, i) => (
        <td className="px-6 py-4" key={primaryKey + "_" + i}>
          {row[k]}
        </td>
      ))}
      <td
        id={row[primaryKey]}
        onClick={(e) => handleEditButtonEvent(e)}
        className="px-6 py-4 text-blue-500 underline font-semibold cursor-pointer hover:to-blue-600"
      >
        Edit
      </td>
      <td
        id={row[primaryKey]}
        onClick={(e) => handleRemoveButtonEvent(e)}
        className="px-6 py-4 text-red-500 underline font-semibold cursor-pointer hover:to-red-600"
      >
        Remove
      </td>
    </tr>
  );
}

function TableDisplay() {
  const { name } = useParams();
  const [fields, setFields] = useState([] as fieldInterface[]);
  const [rows, setRows] = useState([] as { [k: string]: any }[]);
  const [primaryKey, setPrimaryKey] = useState("");
  const [primaryKeyValue, setPrimaryKeyValue] = useState("");

  const formRef = useRef(null);

  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };

  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const toggleEditForm = () => {
    setEditFormOpen(!isEditFormOpen);
  };

  const filterObject = (data: { [K: string]: string }) => {
    let result: { [k: string]: any } = {};

    for (let i = 0; i < fields.length; i++) {
      const element = fields[i];

      if (element.type === "boolean") {
        if (Object.keys(data).includes(element.name)) {
          result[element.name] = true;
        } else {
          result[element.name] = false;
        }
      } else if (element.type === "numeric") {
        result[element.name] = parseFloat(data[element.name]);
      } else {
        result[element.name] = data[element.name];
      }
    }

    return result;
  };

  const getData = async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/getRows/" + name
    );

    const data = (await response.json()) as TableDataInterface;

    console.log(data);

    setFields(data.tableStructure);

    for (let i = 0; i < data.tableStructure.length; i++) {
      const element = data.tableStructure[i];
      if (element.isPrimary) {
        setPrimaryKey(element.name);
        break;
      }
    }

    setRows(data.records);
  };

  const addRecord = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const values = filterObject(data as { [k: string]: any });

    const response = await fetch(import.meta.env.VITE_API_URL + "/addRow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableName: name, values }),
    });

    const result = await response.json();

    console.log(result);

    getData();
  };

  const handleEditButtonEvent = async (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    let id = e.currentTarget.id;

    const response = await fetch(import.meta.env.VITE_API_URL + "/getRow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: name,
        condition: { [primaryKey]: id },
      }),
    });

    const data = await response.json();

    console.log(data);

    toggleEditForm();

    setPrimaryKeyValue((_) => data.row[primaryKey]);

    const form = document.getElementById("editForm");

    fields.forEach((field) => {
      const input = form?.querySelector(`#${field.name}`);

      input?.setAttribute("value", data.row[field.name]);
    });
  };

  const handleRemoveButtonEvent = async (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id;

    const response = await fetch(import.meta.env.VITE_API_URL + "/removeRow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: name,
        condition: { [primaryKey]: id },
      }),
    });

    const data = await response.json();

    console.log(data);

    getData();
  };

  const editFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const data = Object.fromEntries(form.entries());

    console.log(data);
    console.log(primaryKey);
    console.log(primaryKeyValue);

    const response = await fetch(import.meta.env.VITE_API_URL + "/editRow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: name,
        condition: { [primaryKey]: primaryKeyValue },
        updates: data,
      }),
    });

    const result = await response.json();

    console.log(result);

    getData();
  };

  useEffect(() => {
    getData();
  }, [name]);

  return (
    <div className="py-6">
      <PopupContainer isOpen={isOpen} toggle={toggle}>
        <form onSubmit={(e) => addRecord(e)}>
          {fields.map((field) => (
            <InputElement
              key={field.name}
              type={field.type}
              title={field.name}
            />
          ))}

          <button className="primaryBtn">Add</button>
        </form>
      </PopupContainer>

      <PopupContainer isOpen={isEditFormOpen} toggle={toggleEditForm}>
        <form onSubmit={(e) => editFormSubmit(e)} id="editForm" ref={formRef}>
          {fields.map((field) => (
            <InputElement
              key={field.name}
              type={field.type}
              title={field.name}
            />
          ))}

          <button className="primaryBtn">Edit</button>
        </form>
      </PopupContainer>

      <div className="text-5xl py-8">{name}</div>

      <div className="flex justify-end pb-4">
        <button
          onClick={toggle}
          className="px-6 py-3 rounded-md bg-black text-white font-semibold"
        >
          Add
        </button>
      </div>

      <div className="pt-6">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {fields.map((field) => (
                  <th key={field.name} scope="col" className="px-6 py-3">
                    {field.title}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <Row
                  handleRemoveButtonEvent={handleRemoveButtonEvent}
                  handleEditButtonEvent={handleEditButtonEvent}
                  key={row[primaryKey]}
                  row={row}
                  primaryKey={primaryKey}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableDisplay;

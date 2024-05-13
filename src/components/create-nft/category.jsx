import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data-category";

export default function Category({ values, setValues, show, text  }) {
  const handleSelectionChange = (e) => {
    setValues(new Set(e.target.value.split(",")));
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label={text}
        selectionMode="multiple"
        placeholder="Select category"
        selectedKeys={values}
        variant="bordered"
        className="max-w-xs"
        onChange={handleSelectionChange}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      {show ? (
        <p className="text-small text-white/80">
          Selected: {values.length !== 0 && Array.from(values).join(", ")}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

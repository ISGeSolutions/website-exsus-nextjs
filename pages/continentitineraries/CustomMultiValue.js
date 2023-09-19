import React from "react";

export default function CustomMultiValue(props) {
  const { getValue, data } = props;

  const selectedOptions = getValue();
//   debugger;
  const currentOptionIdx = selectedOptions.findIndex(
    (option) => option.value === data.value
  );

  return (
    <span>
      {data.label}
      {currentOptionIdx === selectedOptions.length - 1 ? "" : ", "}
    </span>
  );
}

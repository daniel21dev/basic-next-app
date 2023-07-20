import React from "react";
import { TableCreate } from "./TableCreate";

interface Props {
  editable?: boolean;
}

export const Paso2 = ({ editable = true }: Props) => {
  return (
    <div>
      <div style={{ marginTop: 40 }}>
        <TableCreate editable={editable} />
      </div>
    </div>
  );
};

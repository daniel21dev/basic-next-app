import { usePresupuesto } from "@/hooks";
import { Table } from "@nextui-org/react";
import { useMemo } from "react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

export const TableCreate = () => {
  const { startYear, endYear } = usePresupuesto();

  const columns = useMemo(() => {
    const cols = [
      {
        key: "origen",
        label: "Origen del ahorro",
      },
    ];

    for (let i = startYear; i <= endYear; i++) {
      cols.push({
        key: i + "",
        label: i + "",
      });
    }

    return cols;
  }, [startYear, endYear]);

  return (
    <Table
      aria-label="Example table with dynamic content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {(item) => (
          <Table.Row key={item.key}>
            {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

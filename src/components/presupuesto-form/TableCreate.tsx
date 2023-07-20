import { usePresupuesto } from "@/hooks";
import { Table, Text, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";

const genRows = (
  configOrigen: string[],
  startYear: number,
  endYear: number,
  existingRows?: Record<string, any>[]
) => {
  return configOrigen.map((origen) => {
    const row: Record<string, any> = {
      key: origen,
      origen,
    };

    for (let i = startYear; i <= endYear; i++) {
      const value = existingRows?.find((r) => r[i + ""] && r.origen === origen);
      row[i + ""] = value ? value[i] : 0;
    }

    return row;
  });
};

export const TableCreate = () => {
  const {
    startYear,
    endYear,
    rows: rowsContext,
    configOrigen,
    setRows: setRowsContext,
    total,
  } = usePresupuesto();

  const [rows, setRows] = useState<Record<string, any>[]>(
    genRows(configOrigen!, startYear!, endYear!, rowsContext || [])
  );

  const columns = useMemo(() => {
    const cols = [
      {
        key: "origen",
        label: "Origen del ahorro",
      },
    ];

    for (let i = startYear!; i <= endYear!; i++) {
      cols.push({
        key: i + "",
        label: i + "",
      });
    }

    return cols;
  }, [startYear, endYear]);

  return (
    <>
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
          {(item: Record<string, any>) => (
            <Table.Row key={item.key}>
              {(columnKey) => (
                <Table.Cell key={crypto.randomUUID()}>
                  {columnKey === "origen" ? (
                    <Text key={crypto.randomUUID()}>{item[columnKey]}</Text>
                  ) : (
                    <Input
                      type="number"
                      value={item[columnKey]}
                      aria-label={crypto.randomUUID()}
                      key={crypto.randomUUID()}
                      step={10}
                      min={0}
                      onChange={(e) => {
                        setRows((prev) =>
                          prev.map((row) => {
                            if (row.key === item.key) {
                              return {
                                ...row,
                                [columnKey]: +e.target.value,
                              };
                            }
                            return row;
                          })
                        );
                      }}
                      onBlur={() => setRowsContext(rows)}
                    />
                  )}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Text size="$xl">Total:</Text>
        <Text size="$xl" css={{ marginLeft: 10 }}>
          {total}
        </Text>
      </div>
    </>
  );
};

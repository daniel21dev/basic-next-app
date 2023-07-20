import { usePresupuesto } from "@/hooks";
import { Table, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";

const columns = [
  {
    key: "year",
    label: "Año",
  },
  {
    key: "propio",
    label: "% Ahorro Propio",
  },
  {
    key: "familiar",
    label: "% Ahorro Familiar",
  },
  {
    key: "total",
    label: "Total ahorro",
  },
];

export const TableResumen = () => {
  const { startYear, endYear, rows: rowsContext, total } = usePresupuesto();

  if (!rowsContext) return null;

  const adjustRows = () => {
    const years = [];
    const result: Record<string, any>[] = [];
    for (let i = startYear!; i <= endYear!; i++) {
      years.push(i);
    }

    years.forEach((year) => {
      const totalYear = rowsContext.reduce((acc, row) => {
        const { key, origen, ...years } = row;
        return acc + years[year];
      }, 0);

      const totalPropio = rowsContext.reduce((acc, row) => {
        const { key, origen, ...years } = row;
        if (origen === "Propio") return acc + years[year];
        return acc;
      }, 0);

      const totalFamiliar = totalYear - totalPropio;
      const porcentajePropio = totalYear ? (totalPropio / totalYear) * 100 : 0;
      const porcentajeFamiliar = totalYear
        ? (totalFamiliar / totalYear) * 100
        : 0;

      result.push({
        key: year,
        year,
        propio: porcentajePropio.toFixed(2),
        familiar: porcentajeFamiliar.toFixed(2),
        total: totalYear,
      });
    });

    return result;
  };

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
        <Table.Body items={adjustRows()}>
          {(item: Record<string, any>) => (
            <Table.Row key={item.key}>
              {(columnKey) => (
                <Table.Cell key={crypto.randomUUID()}>
                  {<Text key={crypto.randomUUID()}>{item[columnKey]}</Text>}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
};

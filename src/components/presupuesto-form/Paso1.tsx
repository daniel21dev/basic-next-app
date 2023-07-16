import React, { use, useMemo } from "react";
import { Grid, Text } from "@nextui-org/react";
import Select from "react-select";
import { Presupuesto } from "@/types";
import { usePresupuesto } from "@/hooks";

const getOptions = (fromYear: number, toYear: number) => {
  const years = [];
  for (let i = fromYear; i <= toYear; i++) {
    years.push({ value: i + "", label: i });
  }
  return years;
};

interface Props {
  fromYear: number;
  toYear: number;
  setPresupuesto: React.Dispatch<React.SetStateAction<Presupuesto>>;
}

export const Paso1 = ({ fromYear, toYear }: Props) => {
  const options = useMemo(
    () => getOptions(fromYear, toYear),
    [fromYear, toYear]
  );

  const { setYears, startYear, endYear } = usePresupuesto();

  return (
    <div>
      <h2>Defina los años para los cuales quiere generar su presupuesto</h2>

      <Grid.Container gap={2} justify="center">
        <Grid xs={12} justify="center">
          <Text style={{ marginRight: 20 }}>Año inicio:</Text>
          <Select
            options={options}
            key="from"
            onChange={(value) => setYears(value?.value, undefined)}
            defaultInputValue={startYear.toString()}
            required
          />
        </Grid>
        <Grid xs={12} justify="center">
          <Text style={{ marginRight: 20 }}>Año fin:</Text>
          <Select
            options={options.filter((o) => +o.value >= startYear)}
            key="to"
            onChange={(value) => setYears(undefined, value?.value)}
            defaultInputValue={endYear.toString()}
            required
          />
        </Grid>
      </Grid.Container>
    </div>
  );
};

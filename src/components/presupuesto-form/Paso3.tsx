import React, { useEffect, useState } from "react";
import { usePresupuesto } from "@/hooks";
import { Input, Text } from "@nextui-org/react";
import { TableResumen } from "./TableResumen";
import { BanxicoSeries } from "@/types";
import axios from "axios";

export const Paso3 = () => {
  const { total } = usePresupuesto();

  const [totalDolares, setTotalDolares] = useState(0);

  useEffect(() => {
    pesosToUSD();
  }, [total]);

  const pesosToUSD = async () => {
    try {
      const { data } = await axios.get<BanxicoSeries>(
        `https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=${process.env.NEXT_PUBLIC_BANXICO_TOKEN}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const cambio = data.bmx.series[0].datos[0].dato;
      const totalUSD = cambio ? total / +cambio : 0;
      setTotalDolares(+totalUSD.toFixed(2));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ marginTop: 40 }}>
        <div
          style={{
            marginTop: 10,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center",
            gap: 30,
          }}
        >
          <Text size="$xl">Monto total del ahorro:</Text>
          <div>
            <Input
              type="number"
              aria-label="Monto en pesos"
              readOnly
              value={total}
            />
            <Text size="$xl">Pesos</Text>
          </div>
          <div>
            <Input
              type="number"
              aria-label="Monto en dolares"
              readOnly
              value={totalDolares}
            />
            <Text size="$xl">Dolares</Text>
          </div>
        </div>

        <TableResumen />
      </div>
    </div>
  );
};

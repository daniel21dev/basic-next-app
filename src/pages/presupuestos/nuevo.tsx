import { Layout } from "@/components/layout/Layout";
import { Paso1 } from "@/components/presupuesto-form/Paso1";
import { Paso2 } from "@/components/presupuesto-form/Paso2";
import { Paso3 } from "@/components/presupuesto-form/Paso3";
import { Presupuesto } from "@/types";
import { Container, Grid, Button } from "@nextui-org/react";
import React, { useState } from "react";

const NuevoPresupuesto = () => {
  const [paso, setPaso] = useState(1);
  const [presupuesto, setPresupuesto] = useState<Presupuesto>({
    origen: "",
    years: [],
  });

  const renderPaso = () => {
    switch (paso) {
      case 1:
        return (
          <Paso1
            fromYear={2000}
            toYear={2030}
            setPresupuesto={setPresupuesto}
          />
        );
      case 2:
        return <Paso2 />;
      case 3:
        return <Paso3 />;
    }
  };

  return (
    <Layout>
      <Container display="flex" justify="center" direction="column">
        <h1>Paso {paso}</h1>

        {renderPaso()}

        <Grid.Container gap={1} direction="row" justify="flex-start">
          {paso > 1 && (
            <Grid>
              <Button auto onClick={() => setPaso(paso - 1)}>
                Anterior
              </Button>
            </Grid>
          )}

          {paso < 3 && (
            <Grid>
              <Button auto onClick={() => setPaso(paso + 1)}>
                Siguiente
              </Button>
            </Grid>
          )}
        </Grid.Container>
      </Container>
    </Layout>
  );
};

export default NuevoPresupuesto;
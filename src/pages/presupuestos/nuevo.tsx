import { Layout } from "@/components/layout/Layout";
import { Paso1 } from "@/components/presupuesto-form/Paso1";
import { Paso2 } from "@/components/presupuesto-form/Paso2";
import { Paso3 } from "@/components/presupuesto-form/Paso3";
import { usePresupuesto } from "@/hooks";
import { Container, Grid, Button } from "@nextui-org/react";
import React, { useState } from "react";

const NuevoPresupuesto = () => {
  const { guardarPresupuesto } = usePresupuesto();
  const [paso, setPaso] = useState(1);

  const renderPaso = () => {
    switch (paso) {
      case 1:
        return <Paso1 fromYear={2000} toYear={2030} />;
      case 2:
        return <Paso2 editable />;
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
              <Button auto onPress={() => setPaso(paso - 1)}>
                Anterior
              </Button>
            </Grid>
          )}

          {paso < 3 && (
            <Grid>
              <Button auto onPress={() => setPaso(paso + 1)}>
                Siguiente
              </Button>
            </Grid>
          )}

          {paso === 3 && (
            <Grid>
              <Button auto onPress={guardarPresupuesto}>
                Terminar
              </Button>
            </Grid>
          )}
        </Grid.Container>
      </Container>
    </Layout>
  );
};

export default NuevoPresupuesto;

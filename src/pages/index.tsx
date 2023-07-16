import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button, Container, Grid, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  return (
    <Layout>
      <Container display="flex" justify="center" direction="column">
        <Text h2 css={{ marginTop: 20, textAlign: "center" }}>
          Aplicacion para el control del presupuesto familiar
        </Text>

        <Container css={{ width: 400 }} display="flex" justify="space-around">
          <Button auto onClick={() => router.push("/presupuestos/nuevo")}>
            Nuevo
          </Button>

          <Button auto>Ver ultimo</Button>
        </Container>
      </Container>
    </Layout>
  );
};

export default index;

import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button, Container, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { usePresupuesto } from "@/hooks";

const index = () => {
  const { reset } = usePresupuesto();
  const router = useRouter();

  const handleClick = (route: string) => {
    reset();
    router.push(route);
  };

  return (
    <Layout>
      <Container display="flex" justify="center" direction="column">
        <Text h2 css={{ marginTop: 20, textAlign: "center" }}>
          Aplicacion para el control del presupuesto familiar
        </Text>

        <Container css={{ width: 400 }} display="flex" justify="space-around">
          <Button auto onClick={() => handleClick("/presupuestos/nuevo")}>
            Nuevo
          </Button>

          <Button auto onClick={() => handleClick("/presupuestos/ultimo")}>
            Ver ultimo
          </Button>
        </Container>
      </Container>
    </Layout>
  );
};

export default index;

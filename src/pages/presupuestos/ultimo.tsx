import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@nextui-org/react";
import { dbPresupuesto } from "@/db";
import { IPresupuesto } from "@/models";
import { Paso3 } from "@/components/presupuesto-form/Paso3";
import { usePresupuesto } from "@/hooks";
import { Paso2 } from "@/components/presupuesto-form/Paso2";
import Link from "next/link";

interface Props {
  presupuesto: IPresupuesto;
}

const UltimoPresupuesto: NextPage<Props> = ({ presupuesto }) => {
  const { setRows, total } = usePresupuesto();

  const adjustRows = Object.keys(presupuesto.Detalle).map((key) => {
    const row = presupuesto.Detalle[key];
    return {
      key,
      origen: key,
      ...row,
    };
  });

  useEffect(() => {
    presupuesto && setRows(adjustRows);
  }, [presupuesto]);

  console.log(total);

  if (!presupuesto)
    return (
      <Layout>
        <h1>No hay presupuestos</h1>
      </Layout>
    );

  const fromYear = Object.keys(presupuesto.Detalle.Propio)[0];
  const toYear = Object.keys(presupuesto.Detalle.Propio)[
    Object.keys(presupuesto.Detalle.Propio).length - 1
  ];

  return (
    <Layout>
      <Container display="flex" justify="center" direction="column">
        <h2>
          Presupuesto familiar del año {fromYear} al año {toYear}{" "}
        </h2>

        <Paso3 />
        <Paso2 editable={false} />

        <Link style={{ marginTop: 30 }} href={"/"}>
          regresar al inicio
        </Link>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const presupuesto = await dbPresupuesto.getUltimo();

  return {
    props: {
      presupuesto,
    },
  };
};

export default UltimoPresupuesto;

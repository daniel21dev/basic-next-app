import { PresupuestoProvider } from "@/context/presupuesto";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: any) {
  return (
    <SessionProvider session={pageProps.session}>
      <NextUIProvider>
        <PresupuestoProvider>
          <Component {...pageProps} />
        </PresupuestoProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}

export default MyApp;

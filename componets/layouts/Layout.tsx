import Head from "next/head";
import React, { FC } from "react";
import { Navbar } from "../ui";

type Props = {
  children?: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>1</Head>
      <nav>
        <Navbar />
      </nav>
      <main style={{ padding: "20px 50px" }}>{children}</main>
    </>
  );
};

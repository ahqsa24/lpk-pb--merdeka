import { Layout } from "../components/template/Layout";
import Beranda from "./home/Beranda";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Beranda | LPK PB Merdeka</title>
      </Head>
      <Layout>
        <Beranda />
      </Layout>
    </>
  );
}
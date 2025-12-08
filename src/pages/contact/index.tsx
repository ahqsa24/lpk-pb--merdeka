import React from "react";
import { Layout } from "@/components/template/Layout";
import FAQ from "./FAQ";
import Head from "next/head";

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Bantuan & FAQ | LPK PB Merdeka</title>
            </Head>
            <Layout>
                <FAQ />
            </Layout>
        </>
    );
}

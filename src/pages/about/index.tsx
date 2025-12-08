import React from "react";
import { Layout } from "@/components/template/Layout";
import { AboutTemplate } from "@/components/template/AboutTemplate";
import Head from "next/head";

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>Tentang Kami | LPK PB Merdeka</title>
            </Head>
            <Layout>
                <AboutTemplate />
            </Layout>
        </>
    );
}

import React from "react";
import { Layout } from "@/components/template/Layout";
import Sylabus from "./Sylabus"; // reusing existing component logic
import Program from "./Program"; // reusing existing component logic
import Head from "next/head";

// Need to check what Sylabus and Program components actually render properly
// But primarily we want to wrap them in Layout

export default function SyllabusPage() {
    return (
        <>
            <Head>
                <title>Silabus & Program | LPK PB Merdeka</title>
            </Head>
            <Layout>
                <Sylabus />
                <Program />
            </Layout>
        </>
    );
}

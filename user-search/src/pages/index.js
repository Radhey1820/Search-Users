import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Search from "@/components/search";
import SearchUsers from "@/components/search";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <SearchUsers />
    </>
  );
}

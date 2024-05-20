import "../../styles/normalize.css";
import "../../styles/main.scss";
import styles from "./layout.module.scss";
import { StrictMode } from "react";
import { ORGANISATION_PRIMARY_COLOR } from "../utils/constants";
import Header from "./header";
import Footer from "./footer";
import Menu from "../components/menu";
import GridSystem from "../components/_gridSystem";
import Contents from "./contents";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: ORGANISATION_PRIMARY_COLOR,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainLayout = (
    <div className={styles.root}>
      <Menu />
      <Header />
      <Contents>{children}</Contents>
      <Footer />
    </div>
  );
  return (
    <html lang="fr">
      <body
        className={
          process.env.NODE_ENV === "development" ? "showScreenSizes" : ""
        }
      >
        {process.env.NODE_ENV === "development" ? <GridSystem /> : null}
        {process.env.NODE_ENV === "development" ? (
          <StrictMode>{mainLayout}</StrictMode>
        ) : (
          <div className={styles.root}>{mainLayout}</div>
        )}
      </body>
    </html>
  );
}

require("dotenv").config();
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const config: Config = {
  title: "DBAAS",
  tagline: "DBAAS docs",
  favicon: "img/favicon.ico",
  url: process.env.PROD_URL,
  baseUrl: process.env.BASE_URL,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: process.env.GIT_EDIT_REPO_URL,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "DBAAS",
      logo: {
        alt: "DBAAS Logo",
        src: "img/dbaas.jpeg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "trainingSidebar",
          position: "left",
          label: "Training",
        },
        {
          href: process.env.GIT_REPO_MAIN_URL,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

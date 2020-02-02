import configDev from "./config.dev";
import configProd from "./config.prod";

let currentEnv =
  typeof window !== "undefined"
    ? (window as any).NODE_ENV
    : process.env.NODE_ENV;

if (!currentEnv) currentEnv = "test";

const configFile =
  ["dev", "test"].indexOf(currentEnv) >= 0 ? configDev : configProd;

const config = {
  apiUrl: configFile.apiUrl,
  uploadUrl: configFile.uploadUrl,
  appPort: configFile.appPort,
  defaultTitle: "Untitled",
  defaultSlug: "story",
  adminPath: "/admin",
  itemsPerPage: 6,
  mediaPerPage: 20,
  baseName: configFile.baseName,
};

export default config;

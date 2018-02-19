import dev from "./config.dev.js";
import production from "./config.prod.js";

const env =
    "undefined" !== typeof window ? window.NODE_ENV : process.env.NODE_ENV;

const configFile = env === "production" ? production : dev;

const config = new function(configFile) {
    this.rootUrl = configFile.rootUrl;
    this.apiUrl = configFile.apiUrl;
    this.uploadUrl = configFile.uploadUrl;
    this.defaultTitle = "Untitled";
    this.defaultSlug = "ajaxtown";
    this.adminPath = "/admin";
    this.itemsPerPage = 3;
}(configFile);

export default config;

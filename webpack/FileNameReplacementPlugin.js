const fs = require("fs");
const path = require("path");

const FileNameReplacementPlugin = function(theme) {
  const target = "/client/themes/" + theme + "/";
  return {
    apply: function(compiler) {
      compiler.plugin(
        "normal-module-factory",

        function(normalModuleFactory) {
          normalModuleFactory.plugin(
            "after-resolve",

            function(result, callback) {
              result = validateAndReplace(result, target);
              return callback(null, result);
            },
          );
        },
      );
    },
  };
};
function validateAndReplace(result, target) {
  ["request", "userRequest", "resource"].forEach(function(key) {
    if (!result[key].includes("/node_modules/")) {
      if (result[key].includes("/client/")) {
        const replacement = result[key].replace("/client/", target);
        if (fs.existsSync(path.resolve(replacement))) {
          result[key] = replacement;
        }
      }
    }
  });

  return result;
}
module.exports = FileNameReplacementPlugin;

import { merge } from "webpack-merge";
import common from "./webpack.commom.js";

export default merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
    static: "./dist",
    open: {
      app: {
        name: "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
      },
    },
  },
});

import { merge } from "webpack-merge";
import common from "./webpack.commom.js";

export default merge(common, {
  mode: "production",
});

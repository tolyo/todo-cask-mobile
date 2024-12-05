import { angular } from "./node_modules/@angular-wave/angular.ts/dist/angular-ts.esm.js";

angular.module("version", []).controller(
  "VersionController",
  class VersionController {
    version = angular.version;
  },
);

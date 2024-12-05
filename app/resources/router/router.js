import { angular } from "../node_modules/@angular-wave/angular.ts/dist/angular-ts.esm.js";
angular.module("router", []).config([
  "$stateProvider",
  "$locationProvider",
  ($stateProvider, $locationProvider) => {
    $locationProvider.hashPrefixValue = "";
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false,
      rewriteLinks: false,
    });
    $stateProvider
      .state({
        name: "page1",
        url: "/page1",
        template: "<h3>Its the NG-Router hello world app!</h3>",
      })
      .state({
        name: "page2",
        url: "/page2",
        templateUrl: "/static/router/_page2.html",
      })
      .state({
        name: "page3",
        url: "/page3",
        templateUrl: "/hello",
      })
      .state({
        name: "home",
        url: "/static/router/router.html",
        templateUrl: "/static/router/_home.html",
      });
  },
]);

window.angular.module("todo", ['ui.router'])
    .config([
        "$stateProvider", 
        "$locationProvider",
        "$sceDelegateProvider",
        ($stateProvider, $locationProvider, $sceDelegateProvider) => {            
            $locationProvider.hashPrefixValue = "";
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false,
                rewriteLinks: false,
            });
            $stateProvider
            .state({
                name: "home",
                url: "/",
                templateUrl: "http://10.0.2.2:8080/mobile/_home"
            });
            $sceDelegateProvider.resourceUrlWhitelist([
              'self', 
              'http://10.0.2.2:8080/**' 
            ]);
        }
    ]);

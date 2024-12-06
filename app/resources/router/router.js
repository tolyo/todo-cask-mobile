let url
if (isWebView()) {
  url = "10.0.2.2"
} else {
  url = "localhost"
}

class Todo {
  constructor(task) {
    this.task = task;
    this.done = false;
  }
}

class TodoController {
  constructor() {
    this.greeting = "hello"
    this.tasks = [
      new Todo("Learn Capacitor"),
      new Todo("Learn Scala"),
    ];
  }

  /**
   * @param {String} task
   * @return {void}
   */
  add(task) {
    this.tasks.push(new Todo(task));
  }

  /**
   * Delete all finished tasks
   * @return {void}
   */
  archive() {
    this.tasks = this.tasks.filter((task) => !task.done);
  }
}

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
              name: "homedev",
              url: "/static/index.html",
              templateUrl: `http://${url}:8080/list`
            })
            .state({
                name: "home",
                url: "/",
                templateUrl: `http://${url}:8080/list`
            });
            $sceDelegateProvider.resourceUrlWhitelist([
              'self',
              `http://${url}:8080/**`
            ]);
        }
    ])
    .controller("TodoCtrl", TodoController);


function isWebView() {
  // Check for specific WebView-related characteristics
  return (window.navigator.standalone === true) ||
    (window.matchMedia('(display-mode: standalone)').matches) ||
    /wv/.test(navigator.userAgent) ||
    /Chrome/.test(navigator.userAgent) && /mobile/.test(navigator.userAgent);
}

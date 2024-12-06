package app

import cask._
import cask.router.Decorator
import scalasql.DbApi.Txn
import scalasql.SqliteDialect._
import scalatags.Text.all.{input, _}
import scalatags.Text.tags2
import scalatags.Text.tags2.section

object TodoServer extends MainRoutes {

  class cors extends cask.RawDecorator {
    def wrapFunction(pctx: cask.Request, delegate: Delegate) = {
      val response = delegate(pctx, Map.empty)
      response.map(r => r.copy(headers = r.headers ++ Seq(
        "Access-Control-Allow-Origin" -> "*",
        "Access-Control-Allow-Methods" -> "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers" -> "Origin, Content-Type, Accept"
      )))
    }
  }

  override def decorators: Seq[Decorator[_, _, _, _]] = Seq(new cors)

  @cask.get("/list")
  def list() =
     section(
      attr("ng-controller") := "TodoCtrl as $ctrl",

      tag("ion-button")(attr("expand") := "block", attr("ng-click") := "$ctrl.archive()")("Archive"),
      ul(
        attr("ng-repeat") := "todo in $ctrl.tasks",
        tag("ion-item")(
          cls := "done-{{todo.done}}",
          tag("ion-label")("{{ todo.task }} "),
          tag("ion-toggle")(attr("type") := "checkbox", attr("ng-click") := "todo.done = !todo.done"),
        )
      ),
      form(attr("ng-submit") := "$ctrl.add(newTodo)")(
        input(attr("type") := "text", attr("ng-model") := "newTodo"),
        tag("ion-button")(attr("expand") := "block", attr("ng-click") := "$ctrl.add(newTodo)")("Add new todo")
      )
    )

  @cask.staticResources("/static")
  def static() = "."

  initialize()
}

FRONTEND_CONTEXT = make -C app/resources -f Makefile

build:
	$(FRONTEND_CONTEXT) setup
	./mill __.compile
	./mill mill.idea.GenIdea/

dev:
	./mill -w app.runBackground

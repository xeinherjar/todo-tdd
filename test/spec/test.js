/* global describe, it */

(function () {
  'use strict';

  describe('Todo App', function () {
    it('Should create a new instanceof TodoApp', function () {
      var tda = new TodoApp();
      expect(tda).to.be.instanceof(TodoApp);
    });

    it('Should add new todos to itself', function () {
      var tda = new TodoApp();
      tda.add('My new task');
      expect(tda.todos.length).to.equal(1);
    });

    it('Should auto-increment todo id', function () {
      var tda = new TodoApp();
      tda.add('My new task');
      expect(tda.todos[0].id).to.equal('td0');
      tda.add('Another task!');
      expect(tda.todos[1].id).to.equal('td1');
    });

    it('Should be able to mark Todos as complete', function () {
      var tda = new TodoApp();
      tda.add('My new task');
      tda.toggleComplete('td0');
      expect(tda.todos[0].complete).to.equal(true);
    });

    it('Should be able to remove Todos', function () {
      var tda = new TodoApp();
      tda.add('My new task');
      tda.add('Another task!');
      var id = tda.todos[1].id;
      expect(tda.todoCount).to.equal(2);
      tda.remove(tda.todos[0].id);
      expect(tda.todoCount).to.equal(1);
    });

    it('Should know the complete count', function () {
      var tda = new TodoApp();
      tda.add('My new task');
      tda.add('Another task!');
      expect(tda.completeCount).to.equal(0);
      tda.toggleComplete('td0');
      expect(tda.completeCount).to.equal(1);
      tda.toggleComplete('td1');
      expect(tda.completeCount).to.equal(2);
      tda.toggleComplete('td1');
      expect(tda.completeCount).to.equal(1);

    });

    describe('Creating Todos', function () {
      it('Should be an instanceof Todo', function () {
        var td = new Todo();
        expect(td).to.be.instanceof(Todo);
      });

      it('Should have a name property', function () {
        var td = new Todo('Walk the dog');
        expect(td.name).to.not.equal(undefined);
      });

      it('Should have a default complete status of false', function () {
        var td = new Todo('Walk the dog');
        expect(td.complete).to.equal(false);
      });

      it('Should have an ID', function () {
        var td = new Todo('Walk the dog');
        expect(td.id).to.not.equal(undefined);
      });
    });

  });

})();

var TodoApp = function() {
  this.autoID = 0;
  this.completeCount = 0;
  this.todoCount = 0;
  this.todos = []; 
  
  this.add = function(todo) {
    var td = new Todo(todo);
    td.id = 'td' + this.autoID;
    this.autoID++;
    this.todos.push(td);
    this.todoCount += 1;
  };

  this.remove = function(id) {
    var idx = _.findIndex(this.todos, { id: id });
    this.todos[idx].hidden = true;
    this.todoCount -= 1;
    
  };

  this.toggleComplete = function(id) {
    var idx = _.findIndex(this.todos, { id: id });
    var complete = this.todos[idx].complete;
    this.todos[idx].complete = !this.todos[idx].complete;
    this.completeCount = !complete ? this.completeCount += 1 :
                                     this.completeCount -= 1;
  };
  
};

var Todo = function(name) {
  this.name = name;
  this.complete = false;
  this.hidden = false;
  this.id = 'td';
};


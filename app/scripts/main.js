var TD = new TodoApp();

var tdTask = $('input[name="td-task"]');
var todoForm = $('#todo-form');
var tdList = $('#td-list');
var tdStats = $('#td-stats');

var updateTodo = function () {
  var html = '';
  for (var i = 0; i < TD.todos.length; i++) {
    if (!TD.todos[i].hidden) {
      var td = TD.todos[i];
      if(td.complete) {
        html += '<li id="' + td.id + '" class="complete">' + 
                 td.name + '<span>x</span></li>';

      } else {
        html += '<li id="' + td.id + '">' + 
                 td.name + '<span>x</span></li>';
      }
    }
  }

  var stats = "<span>" + TD.completeCount + " of " +
              TD.todoCount + " complete </span>";
  tdList.html(html); 
  tdStats.html(stats);
};

todoForm.on('keypress', function(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    var taskVal = tdTask.val();
    if (taskVal === '') { return; }
    TD.add(taskVal);
    tdTask.val('');

    updateTodo();
  }
});

todoForm.on('click', function(e) {
  if(_.startsWith(e.target.id, 'td')) {
    TD.toggleComplete(e.target.id);
    updateTodo();
  }
  
  if(e.target.localName === 'span') {
    TD.remove(e.target.parentElement.id);
    updateTodo();
  }
});

$('.td-filter').on('click', function(e) {
  $('.td-filter').removeClass('active-filter');
  $(this).addClass('active-filter');

});


updateTodo();

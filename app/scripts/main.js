var TD = new TodoApp();

var tdTask = $('input[name="td-task"]');
var todoForm = $('#todo-form');
var tdList = $('#td-list');
var tdStats = $('#td-stats');

var endpoint = 'http://tiy-atl-fe-server.herokuapp.com/collections/bdd-todo-ap';
var persist = function () {
  var payload = {
    todos: TD.todos,
    autoID: TD.autoID,
    completeCount: TD.completeCount,
    todoCount: TD.todoCount,
  };

  $.ajax({
      url: endpoint,
      dataType: 'json',
      data: { todos: payload },
      type: 'post',
      success : function () { console.log("yay"); },
      fail : function () { console.log("boo"); }
    });
};

var saveButton = $('#save');
var saveAllowed = false;
saveButton.on('click', function() {
  if (!saveAllowed) { return; }
  persist();
  saveAllowed = false;
  $(this).addClass('disabled');
});

var load = function () {
  allowedSave = false;
  saveButton.addClass('disabled');
  
  $.ajax({
    url: endpoint,
    dataType: 'json',
    type: 'get',
    success : function (data) { 
      var tmp = data[0];

      //because we can't have nice things
      TD.autoID = Number(tmp.todos.autoID);
      TD.completeCount = Number(tmp.todos.completeCount);
      TD.todoCount = Number(tmp.todos.todoCount);

      for (var i = 0; i < tmp.todos.todos.length; i++) {
        tmp.todos.todos[i].hidden === 'true' ? 
          tmp.todos.todos[i].hidden = true :
          tmp.todos.todos[i].hidden = false;
         tmp.todos.todos[i].complete === 'true' ? 
          tmp.todos.todos[i].complete = true :
          tmp.todos.todos[i].complete = false;
     }
      TD.todos = tmp.todos.todos;
      
      updateTodo();
    },
    fail : function(data) { console.log(data); }
  });
};

$('#load').on('click', function () {
    load();
});


var updateTodo = function () {

  var filter = $('.active-filter').text();  
  var html = '';

    for (var i = 0; i < TD.todos.length; i++) {
      if (!TD.todos[i].hidden) {
        var td = TD.todos[i];
        switch (filter) {
        case 'complete':
          if(td.complete) {
            html += '<li id="' + td.id + '" class="complete">' + 
                      td.name + '<span>x</span></li>'; } 
        break;
        case 'open':

          if(!td.complete) {
           html += '<li id="' + td.id + '">' + 
                    td.name + '<span>x</span></li>'; }
        break;
        case 'all':
          if(td.complete)  {
            html += '<li id="' + td.id + '" class="complete">' + 
                      td.name + '<span>x</span></li>'; 
            } else {
             html += '<li id="' + td.id + '">' + 
                    td.name + '<span>x</span></li>';
            }
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
    allowedSave = true;
    saveButton.removeClass('disabled');
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
  updateTodo();
});


updateTodo();

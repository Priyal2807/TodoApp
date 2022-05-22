$(document).ready(function(){
  /*$('#todo-table').hide();
  $('img').on('click',function(){
    $('#todo-table').toggle();
    if($('#todo-table').css('display') == 'block'){
      $('img').addClass('afterImage');
    }
    if($('#todo-table').css('display') == 'none'){
      $('img').removeClass('afterImage');
    }

  });*/

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({ //this ajax request is fired when this url / todo is hit
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){ //here the updated data is used after the data has been changed using the /todo app controller
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});

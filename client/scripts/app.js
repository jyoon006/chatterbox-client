var app;
$(document).ready(function() {

//initializing app object
app = {
   server: 'https://api.parse.com/1/classes/chatterbox',
   username: 'anonymous',
   roomname: 'lobby',
   friends: {},
//init method is ran when document is loaded
  init: function() {
    app.username = window.location.search.split("=")[1];
    this.fetch();

    app.$message = $('#messageText');
    app.$chats = $('#chat');
    app.$roomSelect = $('#roomSelect');
//on submit of form, invoke handleSubmit method with preventing default event handler due to issues
    $('form').on('submit', function(e) {
      e.preventDefault();
      app.handleSubmit();
    });
//when room is changed, save the room
    $('#roomSelect').on('change', app.saveRoom);
//when username is clicked invoke addFriend method
    $('#main').on('click', '.username', app.addFriend);
    setInterval(app.fetch, 10000);
  },

//make ajax call as POST to add data to the server
  send: function(message) {
    $('.chat').empty();
    $('#messageText').val("");
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent. Data: ', data);
        app.fetch();
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });
  },
//make ajax call to GET data from server
  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      data: { order: '-createdAt'},
      success: function (data) {
        // console.log('chatterbox: Message sent. Data: ', data);
        var displayedRoom = $('.chat span').first().data('roomname');

        if(app.roomname !== displayedRoom) {
          app.populateMessage(data.results);
          app.populateRoom(data.results);
        }
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });
  },
//iterate through data from server and invoke addMessage method with every object
  populateMessage: function(data) {
    app.clearMessages();
    for (var i = 0; i < data.length; i++) {
      app.addMessage(data[i]);
    }
  },
//iterate through data from server and get the roomnames from the data and invoke addRoom method
  populateRoom: function(data) {
    app.$roomSelect.html('<option value="__newRoom">New room...</option><option value="" selected>lobby</option></select>');
    var roomHolder = {};
    for (var i = 0; i < data.length; i++) {
      if (!roomHolder[data[i].roomname] && data[i].roomname) {
        app.addRoom(data[i].roomname);

        roomHolder[data[i].roomname] = true;
         
      }
    }
    $('#roomSelect').val(app.roomname);
  },
  //delete all messages
  clearMessages: function() {
    $('#chat').empty();
  },
  //append users message to dom depending on the chatroom they're in
  addMessage: function(data) {
    
    if(!data.roomname) {
      data.roomname = 'lobby';
    }
    if(!data.username) {
      data.username = 'anonymous';
    }
    
    
     if (data.roomname === app.roomname) {
      
      var $chat = $('<div class="chat"/>')
      
      var $username = $('<span class="username"/>');
      $username.text(data.username+': ').attr('data-username', data.username).attr('data-roomname', data.roomname).appendTo($chat);
     

    
    var $message = $('<br><span/>');
    
        $message.text(data.text).appendTo($chat); 

    app.$chats.append($chat);
    
   
    }
  },
  //add room names to room's list in DOM
  addRoom: function(roomname) {
    var $option = $('<option/>').val(roomname).text(roomname);
    
    app.$roomSelect.append($option);
     
  },
  //add friend when click handler is invoked on the div element that contains user's name
  addFriend: function(evt) {
    var username = $(evt.currentTarget).attr('data-username');
      if (username !== undefined) {
        console.log('chatterbox: Adding %s as a friend', username);

        
        app.friends[username] = true;

        
        var selector = '[data-username="'+username.replace(/"/g, '\\\"')+'"]';
        var $usernames = $(selector).addClass('friend');
      }

  },
  //save a new room when user creates one by invoking new room name to addRoom method
  saveRoom: function(evt) {

      var selectIndex = app.$roomSelect.prop('selectedIndex');
      
      if (selectIndex === 0) {
        var roomname = prompt('Enter room name');
        if (roomname) {
          
          app.roomname = roomname;

          
          app.addRoom(roomname);

          
          app.$roomSelect.val(roomname);

          
          app.fetch();
        }
      }
      else {
        
        app.roomname = app.$roomSelect.val();

        
        app.fetch();
      }
    },
//invokes data to send method to make AJAX call to POST to server data
  handleSubmit: function() {
    var message = {
      username: app.username,
      text: app.$message.val(),
      roomname: app.roomname || 'lobby'
    };
    console.log(message);
    app.send(message);
    
  }
};

  app.init();

});


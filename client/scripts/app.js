var app;
$(document).ready(function() {
var currentTime = new Date().toISOString(); //GET data from current time

var messages = [];

//?message=qwerwqerer&username=asdf



// var roomName;
var userMessage;
 app = {
 server: 'https://api.parse.com/1/classes/chatterbox',
 username: 'anonymous',
 roomname: 'lobby',

  init: function() {
    app.username = window.location.search.split("=")[1];
    //app.username = window.location.search.substr(10);
    // var mostRecentMessage = '?order=-createdAt';
    this.fetch();

    app.$main = $('#main');
    app.$message = $('#messageText');
    app.$chats = $('#chat');
    app.$roomSelect = $('#roomSelect');
    app.$send = $('#send');


    $('form').on('submit', function(e) {
      e.preventDefault();
      app.handleSubmit();
    });
    $('#roomSelect').on('change', app.saveRoom);
    setInterval(app.fetch, 10000);
  },
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
  populateMessage: function(data) {
    app.clearMessages();
    for (var i = 0; i < data.length; i++) {
      
      app.addMessage(data[i]);
    }
  },
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
  clearMessages: function() {
    $('#chat').empty();
  },
  addMessage: function(data) {
    
    if(!data.roomname) {
      data.roomname = 'lobby';
    }
    if(!data.username) {
      data.username = 'anonymous';
    }
    
    
     if (data.roomname === app.roomname) {
      var $chat = $('<div class="chat"/>')
        $username.text(data.username+': ').attr('data-username', data.username).attr('data-roomname', data.roomname).appendTo($chat);
      var $message = $('<br><span/>');
        $message.text(data.text).appendTo($chat); 
        app.$chats.append($chat);
  },
  addRoom: function(roomname) {
    var $option = $('<option/>').val(roomname).text(roomname);
    // $('#roomSelect').append('<option value="' + roomname + '">' + roomname + '</option>');
    app.$roomSelect.append($option);
     
  },
  addFriend: function() {

  },
  saveRoom: function(evt) {

      var selectIndex = app.$roomSelect.prop('selectedIndex');
      // New room is always the first option
      if (selectIndex === 0) {
        var roomname = prompt('Enter room name');
        if (roomname) {
          // Set as the current room
          app.roomname = roomname;

          // Add the room to the menu
          app.addRoom(roomname);

          // Select the menu option
          app.$roomSelect.val(roomname);

          // Fetch messages again
          app.fetch();
        }
      }
      else {
        // app.startSpinner();
        // Store as undefined for empty names
        app.roomname = app.$roomSelect.val();

        // Fetch messages again
        app.fetch();
      }
    },
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


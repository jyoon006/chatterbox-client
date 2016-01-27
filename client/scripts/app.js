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
      userMessage = $('#messageText').val();
      // roomName = $('#roomSelect :selected').text();
      e.preventDefault();
      app.handleSubmit();
    });

    setInterval(app.fetch, 10000);
  },
  send: function(message) {
    $('.chat').empty();
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
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
    var that = this;
    var roomNames = [];
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      data: { order: '-createdAt'},
      success: function (data) {
        // console.log('chatterbox: Message sent. Data: ', data);
        app.populateMessage(data.results);
        app.populateRoom(data.results);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });
  },
  populateMessage: function(data) {
    for (var i = 0; i < data.length; i++) {
      app.addMessage(data[i]);
    }
  },
  populateRoom: function(data) {
    app.$roomSelect.html('<option value="__newRoom">New room...</option><option value="" selected>lobby</option></select>');
    var roomHolder = {};
    for (var i = 0; i < data.length; i++) {
      if (!roomHolder[data[i].roomname] && data[i].roomname) {
        roomHolder[data[i].roomname] = data[i].roomname;
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
    if (!data.text) {
      data.text = '';
    }
    //Username: MSG
    // $('#chat').append('<div class="username">' + username + '</div>');
    var room = $('#roomSelect :selected').text();
    console.log(room);
    if (data.roomname === room) {
      
    }
    $('#chat').append('<div class="chat"><span class="username">' + _.escape(data.username) + ': </span>' + _.escape(data.text) + '</div>');
    
    $('.username').on('click', function() {
      app.addFriend();
    });

  },
  addRoom: function(room) {

    $('#roomSelect').append('<option value="' + room + '">' + _.escape(room) + '</option>');

    //room = 4chan, lobby, etc, lobby, lobby, lobby  
      
      // $('#roomSelect').append('<option value="room">' + room + '</option>');
   
 
    
  },
  addFriend: function() {

  },
  handleSubmit: function() {
  // var userText = $('#messageText').val();
    var message = {
      username: app.username,
      text: app.$message.val(),
      roomname: app.roomname || 'lobby'
    };
    // console.log(message);
    console.log(message);
    this.send(message);
    
  }
};


app.init();


// console.log('userMessage: ' + userMessage, 'userID: ' + userID);
});







// $.ajax({
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent. Data: ', data);
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message. Error: ', data);
//   }
// });

// $.get('https://api.parse.com/1/classes/chatterbox', function(data) {
//   data.results.push(message);
//   console.log(data.results);
// });

//where={"score":{"$in":[1,3,5,7,9]}}

// var filterUsername = '{"roomname":{"$in":['4chan']}}';
// var mostRecentMessage = 'order=-createdAt';
// var recentMessagesFilter = '{"updatedAt":{"$gte": "' + currentTime + '"}}'

//find most recent messages from server
// $.get('https://api.parse.com/1/classes/chatterbox?' + mostRecentMessage, function(data) {
//   console.log(data);
// });


// $.get('https://api.parse.com/1/classes/chatterbox?where=' + recentMessagesFilter, function(data) {
//   console.log(data);
// });
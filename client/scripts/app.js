var app;
$(document).ready(function() {
var currentTime = new Date().toISOString(); //GET data from current time

var messages = [];
//?message=qwerwqerer&username=asdf

 app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function() {
    var userID = window.location.search.split("=")[1];
    var mostRecentMessage = '?order=-createdAt';
    this.fetch(mostRecentMessage);
    $('form').on('submit', function(e) {
      var userMessage = $('#messageText').val();
      var roomName = $('#roomSelect :selected').text();
      e.preventDefault();
      app.handleSubmit(userID, userMessage, roomName);
    });
  },
  send: function(message) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent. Data: ', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });
  },

  fetch: function(querySelector) {
    var that = this;
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox' + querySelector,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent. Data: ', data);
        for (var i = 0; i < data.results.length; i++) {
          that.addMessage(data.results[i].text);
        }
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  addMessage: function(message) {
    $('#chats').prepend('<li class="username">' + message + '</li>');
    $('.username').on('click', function() {
      app.addFriend();
    });

  },
  addRoom: function(room) {
    $('#roomSelect').append('<option value="room">' + room + '</option>');
  },
  addFriend: function() {

  },
  handleSubmit: function(userID, userMessage, roomName) {
  // var userText = $('#messageText').val();
    var message = {
      username: userID,
      text: userMessage,
      roomname: roomName
    };
    console.log(message);
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
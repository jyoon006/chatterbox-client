var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function() {},
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
  fetch: function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent. Data: ', data);
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
    $('#chats').append('<li class="username">' + message + '</li>');
    $('.username').on('click', function() {
      app.addFriend();
    });
    
  },
  addRoom: function(room) {
    $('#roomSelect').append('<option value="room">' + room + '</option>');
  },
  addFriend: function() {

  },
  handleSubmit: function() {
    
  }

};



// var message = {
//   username: 'kelly/Jisoo',
//   text: 'hello',
// };
$(document).ready(function() {
  $('#send').on("submit", function(e) {
    console.log(e);
    app.handleSubmit();
  })
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
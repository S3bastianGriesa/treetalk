var Chat = function() {
    this.count = 0;
    this.messages = $('#chat-message-list');
};

Chat.prototype.addMessage = function(msg) {
    this.count++;
    var messageEntry = $('<li></li>').html(msg);
    this.messages.append(messageEntry);
};

Chat.prototype.clear = function() {
    this.messages.empty();
};

var ChatDOM = function() {
    this.sendButton = $('#send-button');
    this.messageList = $('#chat-message-list');
    this.messangerTextfield = $('#messanger-textfield');
};

ChatDOM.prototype.getMessangerTextfieldValue = function() {
    return this.messangerTextfield.val();
};

ChatDOM.prototype.clearMessangerTextfieldValue = function() {
    this.messangerTextfield.val('');
};

ChatDOM.prototype.appendMessage = function(message) {
    var listElement = $('<li></li>').html(message);
    this.messageList.append(listElement);
};

$(document).ready(function() {
    var chat = new Chat();
    var chatDom = new ChatDOM();
    $('#send-button').click(function(event) {
        var message = chatDom.getMessangerTextfieldValue();
        chatDom.clearMessangerTextfieldValue();
        chatDom.appendMessage(message);
    });
    $('#messanger-textfield').keypress(function(event) {
        if (event.which == 13) {
          chatDom.sendButton.click();
          return false;
        }
    });
});

var MessageWidget = function() {
    this.textfield = $('#messanger-textfield');
};

MessageWidget.prototype.getValue = function() {
    return this.textfield.val();
};

MessageWidget.prototype.clear = function() {
    this.textfield.val('');
};

var ChatWidget = function() {
    this.messages = [];
    this.list = $('#message-list');
};

ChatWidget.prototype.addMessage = function(msg) {
    this.messages.push(msg);
    this.render();
};

ChatWidget.prototype.getLatestMessage = function() {
    return this.messages[this.messages.length - 1];
};

ChatWidget.prototype.count = function() {
    return this.messages.length;
};

ChatWidget.prototype.isMessageCountEven = function() {
    return (this.count() % 2) === 0;
};

ChatWidget.prototype.render = function() {
    var message = $('<li></li>').html(this.getLatestMessage());
    if (this.isMessageCountEven()) {
        message.addClass('even');
    } else {
        message.addClass('uneven');
    }
    this.list.append(message);
};

$(document).ready(function() {
    var messageWidget = new MessageWidget();
    var chatWidget = new ChatWidget();
    var sendButton = $('#send-button');
    sendButton.click(function(event) {
        var message = messageWidget.getValue();
        messageWidget.clear();
        chatWidget.addMessage(message);
    });
    messageWidget.textfield.keypress(function(event) {
        if (event.which == 13) {
            sendButton.click();
            return false;
        }
    });
});

# MessagesFactory

Define your log messages in a dedicated file, then use them by their code

[![npm](https://img.shields.io/npm/v/messages-factory.svg)](https://www.npmjs.com/package/messages-factory)
[![node](https://img.shields.io/node/v/messages-factory.svg)]()
[![Travis](https://img.shields.io/travis/nauwep/messages-factory.svg)](https://travis-ci.org/nauwep/messages-factory)
[![Coveralls](https://img.shields.io/coveralls/nauwep/messages-factory.svg)](https://coveralls.io/github/nauwep/messages-factory)


## Overview

MessagesFactory allows defining a set of message in a centralized place (a JSON file, for instance) to, then, be used anywhere in your app.
It's especially useful when a same message is used multiple times, updating its content will be done once.

## Usage

Install from npm

    npm install messages-factory

Require in your code

    const MessagesFactory = require('messages-factory');

Manage your messages in an Array with Objects providing a `code` and `message` properties

    const messageDefinitions = [{
        code: '001',
        message: '1st message'
    }, {
        code: '002',
        message: '2nd message'
    }];

Pass the message definitions to the factory

    const messages = new MessagesFactory(messageDefinitions);

Get the messages by its code

    console.log('This is my messages: ' + messages.001); // 'This is my messages: 1st message'

Custom values can be integrated by getting the message with its function passing values as argument, the message template uses the arguments by their index and the syntax `{index}`

    const messages = new MessagesFactory([{
            code: '001',
            message: 'This is an {0} {1}!'
        }]);

    messages.001('Hello', 'World'); // 'This is an Hello World!'

## Example

    // messages.json
    [{
        "code": "APP_001",
        "message": "Server ready"
    }, {
        "code": "APP_002",
        "message": "Server listening on port {0}"
    }]


    // app.js
    const MessagesFactory = require('messages-factory');
    const messages = new MessagesFactory(require('./messages.json'));

    console.log(messages.APP_001());        // 'Server ready'
    console.log(messages.APP_002(8080));    // 'Server listening on port 8080'

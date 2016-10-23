"use strict";

const should = require('should');
const messagesTestFilePath = './messages.json';
const testMessages = require(messagesTestFilePath);

const MessagesFactory = require('../index');

describe('MessagesFactory', function() {

    describe('constructor', function() {

        it('should return an instance of MessagesFactory', function() {
            let instance = new MessagesFactory(testMessages);
            should(instance).be.an.instanceOf(MessagesFactory);
        });

        it('should raise an error for invalid argument', function() {
            should(function() {
                new MessagesFactory(null);
            }).throw();
            should(function() {
                new MessagesFactory('string');
            }).throw();
        });

    });

    describe('factory instance', function() {

        let messages = new MessagesFactory(testMessages);

        it('should provide unitary message as function', function() {
            should(messages.APP_001).be.a.Function();
            should(messages.APP_002).be.a.Function();
            should(messages.APP_003).be.a.Function();
        });

        it('should provide unitary message as string', function() {
            let message001 = messages.APP_001 + '';
            should(message001).be.exactly('1st message');
            let message002 = messages.APP_002 + '';
            should(message002).be.exactly('2nd message');
            let message003 = messages.APP_003 + '';
            should(message003).be.exactly(
                '3rd message with value {0}');
        });

        describe('unitary message function', function() {

            it('should return the corresponding string message', function() {
                let message001 = messages.APP_001();
                should(message001).be.exactly('1st message');
                let message002 = messages.APP_002();
                should(message002).be.exactly('2nd message');
                let message003 = messages.APP_003();
                should(message003).be.exactly(
                    '3rd message with value {0}');
            });

            it('should integrate provided values in message', function() {
                let message003 = messages.APP_003('blablabla');
                should(message003).be.exactly(
                    '3rd message with value blablabla');
            });

            it('should integrate multiple provided values in message',
                function() {
                    let message004 = messages.APP_004('MessagesFactory',
                        'integration', 'multiple custom values');
                    should(message004).be.exactly(
                        'I am testing MessagesFactory, with integration of multiple custom values'
                    );
                });

        });

    });

});

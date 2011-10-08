#TwitterBot for Node.JS
As simple as it can get, Twitterbot is a quick and easy module
to post tweets to your profile using NodeJS. If that's all you need
then hopefully it helps you get up and running!

Requires [node-oauth](https://github.com/ciaranj/node-oauth) to run.

##Hello World
    var twitterbot = require('./lib/bot.js');
    
    var bot = twitterbot.create({
        key:'KEY',
    	key_secret:'SECRET',
    	token_key:'USERKEY',
    	token_secret:'USERSECRET'
    });

    bot.post("Hello World");
    
Easy! You'll have to fill in the variables to match your Twitter app and
account of course. This also works the same as above, if you really want
to save space:

    require('./lib/bot.js').create({
        post: "Hello World",
        key: 'KEY', key_secret: 'SECRET',
        token_key:'USERKEY', token_secret:'USERSECRET'
    });
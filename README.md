#Hello World
    var twitterbot = require('./lib/bot.js');
    
    var bot = twitterbot.create({
        key:'KEY',
    	key_secret:'SECRET',
    	token_key:'USERKEY',
    	token_secret:'USERSECRET'
    });

    bot.post("Hello World");
    
Easy!
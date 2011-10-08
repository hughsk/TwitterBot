#Hello World
    var twitterbot = require('./lib/bot.js');
    
    var bot = twitterbot.create({
      key:'KEY',
    	secret:'SECRET',
    	user_key:'USERKEY',
    	user_secret:'USERSECRET'
    });

    bot.post("Hello World");`
    
Easy!
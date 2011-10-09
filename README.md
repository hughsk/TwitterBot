#TwitterBot for Node.JS
As simple as it can get, Twitterbot is a quick and easy module
to post tweets to your profile using NodeJS. If that's all you need
then hopefully it helps you get up and running!

Requires [node-oauth](https://github.com/ciaranj/node-oauth) to run.

##Posting to your Account
To post a tweet to your bot's profile:
    var twitterbot = require('./lib/bot.js');
    
    var bot = twitterbot.create({
        key:'KEY',
    	key_secret:'SECRET',
    	token_key:'USERKEY',
    	token_secret:'USERSECRET'
    });

    bot.post("Hello World");
    
Easy, right? You'll have to fill in the authentication details to match your Twitter app and
account of course. This also works the same as above, if you really want
to save space:

    require('./lib/bot.js').create({
        post: "Hello World",
        key: 'KEY', key_secret: 'SECRET',
        token_key:'USERKEY', token_secret:'USERSECRET'
    });
    
##Getting Mentions of your Account
    bot.mentions(40, function(err, response) {
        if (err) {console.log(err); return;}
        for (var i = 0, l = response.length; i < l; i++) {
    		console.log('[MENTION] '+response[i].text);
    	}
    });
    
The above code will retrieve the 40 most recent mentions of your bot, and print their text to
the console. There's a lot more data in that response object for you to play around with
but that's the simplest approach.
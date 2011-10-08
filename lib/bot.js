var OAuth = require('oauth').OAuth;

var Bot = function(options) {
	this.options = options;

	//Sanity check
	if (!this.options.key) {throw new Error("Missing 'key' in your bot's options");}
	if (!this.options.key_secret) {throw new Error("Missing 'key_secret' in your bot's options");}
	if (!this.options.token) {throw new Error("Missing 'token' in your bot's options. Go to your Twitter App page to retrieve this.");}
	if (!this.options.token_secret) {throw new Error("Missing 'token_secret' in your bot's options. Got to your Twitter App page to retrieve this.");}

	//Create an OAuth instance for each bot instanstiated.
	this.oauth = new OAuth(
		'http://twitter.com/oauth/request_token',
		'http://twitter.com/oauth/access_token',
		this.options.key,
		this.options.key_secret,
		'1.0A',
		null,
		'HMAC-SHA1'
	);

	//Posts a tweet with an optional reply ID and callback on completion.
	this.post = function(text, replyToID, callback) {
		var cb = callback || function(err,data) {console.log(err || '[TWEETED] "'+text+'"');};

		if (!text) {throw new Error("Why would you post an update without text?");}
		if (text.length > 140) {throw new Error("You're over the 140 character limit!");}

		var data = {'status':text.toString()};
		if (replyToID) data['in_reply_to_status_id'] = parseInt(replyToID);
		if (replyToID === 0) {throw new Error("Invalid reply ID - it's gotta be an integer...");}

		//Posts the tweet. Requires your personal token/secret for the app -
		//you should only need your app account most of the time, and this keeps things quick...
		//use another script for something more involved.
		this.oauth.post(
			'http://api.twitter.com/1/statuses/update.json',
			this.options.token,
			this.options.token_secret,
			data,
			function(err, data) {
				if (err) cb(err); else cb(err, data);
			}
		);
	}

	//Quickly add a post by passing it to the bot's options on creation
	if (this.options.post) {this.post(this.options.post.toString());}

	return this;
}

module.exports = {
	create:function(options) {
		options = options || {};
		return new Bot(options);
	}
}

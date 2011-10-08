var OAuth = require('oauth').OAuth;

var Bot = function(options) {
	this.options = options;

	if (!this.options.key) {throw new Error("Missing 'key' in your bot's options");}
	if (!this.options.secret) {throw new Error("Missing 'secret' in your bot's options");}

	this.oauth = new OAuth(
		'http://twitter.com/oauth/request_token',
		'http://twitter.com/oauth/access_token',
		this.options.key,
		this.options.secret,
		'1.0A',
		null,
		'HMAC-SHA1'
	);

	this.post = function(text, replyToID, callback) {
		var cb = callback || function(err,data) {console.log(err || '[TWEETED] "'+text+'"');};

		if (!text) {throw new Error("Why would you post an update without text?");}
		if (text.length > 140) {throw new Error("You're over the 140 character limit!");}

		var data = {'status':text.toString()};
		if (replyToID) data['in_reply_to_status_id'] = parseInt(replyToID);
		if (replyToID === 0) {throw new Error("Invalid reply ID - it's gotta be an integer...");}

		this.oauth.post(
			'http://api.twitter.com/1/statuses/update.json',
			this.options.user_key,
			this.options.user_secret,
			data,
			function(err, data) {
				if (err) cb(err); else cb(err, data);
			}
		);
	}

	return this;
}

module.exports = {
	create:function(options) {
		options = options || {};
		return new Bot(options);
	}
}

export const post = {
	text: "string",
	alt_text: "string",
	author: "user",
	at_url: "string",
	embed: "embed",
	parent: "post",
	root: "post",
	quoted: "post",
	likers: "user[]",
	like_count: "number",
	reposters: "user[]",
	repost_count: "number",
	replies: "post[]",
	langs: "string[]",
	tags: "string[]",
};

export const user = {
	display_name: "string",
	handle: "string",
	bio: "string",
	did: "string",
	followers: "user[]",
	following: "user[]",
};

export const embed = {
	url: "string",
	title: "string",
	description: "string",
};

export const types = {
	post,
	user,
	embed,
};

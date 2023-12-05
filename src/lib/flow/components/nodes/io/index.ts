import * as AllPostsNode from "./AllPostsNode.svelte";
import * as FeedPostsNode from "./FeedPostsNode.svelte";
import * as UserListPostsNode from "./UserListPostsNode.svelte";
import * as UserPostsNode from "./UserPostsNode.svelte";
import * as HashtagPostsNode from "./HashtagPostsNode.svelte";
import * as FeedOutputNode from "./FeedOutputNode.svelte";

export const inputOutputNodes = {
	allPosts: AllPostsNode,
	feedPosts: FeedPostsNode,
	userListPosts: UserListPostsNode,
	userPosts: UserPostsNode,
	hashtagPosts: HashtagPostsNode,
	feedOutput: FeedOutputNode,
};

export {
	AllPostsNode,
	FeedPostsNode,
	UserListPostsNode,
	HashtagPostsNode,
	UserPostsNode,
	FeedOutputNode,
};

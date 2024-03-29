export interface NewPosts {
	kind: string;
	data: {
		after: string;
		dist: string;
		modhash: string;
		geofilter: string;
		children: Array<Post>;
	};
}

export interface Post {
	kind: string;
	data: {
		approved_at_utc: string;
		subreddit: string;
		selftext: string;
		author_fullname: string;
		saved: boolean;
		mod_reason_title: string | null;
		gilded: number;
		clicked: boolean;
		title: string;
		link_flair_richtext: Array<{
			e: string;
			t: string;
		}>;
		subreddit_name_prefixed: string;
		hidden: boolean;
		pwls: number;
		link_flair_css_class: string | null;
		downs: number;
		thumbnail_height: number | null;
		top_awarded_type: string | null;
		hide_score: boolean;
		name: string;
		quarantine: boolean;
		link_flair_text_color: string | null;
		upvote_ratio: number;
		author_flair_background_color: string | null;
		subreddit_type: string;
		ups: number;
		total_awards_received: number;
		media_embed: {};
		thumbnail_width: number | null;
		author_flair_template_id: string | null;
		is_original_content: boolean;
		user_reports: Array<{}>;
		secure_media: {};
		is_reddit_media_domain: boolean;
		is_meta: boolean;
		category: string | null;
		secure_media_embed: {};
		link_flair_text: string | null;
		can_mod_post: boolean;
		score: number;
		approved_by: string | null;
		author_premium: boolean;
		thumbnail: string | null;
		edited: boolean;
		author_flair_css_class: string | null;
		author_flair_richtext: Array<{}>;
		gildings: {};
		content_categories: Array<string>;
		is_self: boolean;
		mod_note: string | null;
		created: number;
		link_flair_type: string | null;
		wls: number;
		removed_by_category: string | null;
		banned_by: string | null;
		author_flair_type: string | null;
		domain: string;
		allow_live_comments: boolean;
		selftext_html: string;
		likes: string | null;
		suggested_sort: string | null;
		banned_at_utc: string | null;
		view_count: number | null;
		archived: boolean;
		no_follow: boolean;
		is_crosspostable: boolean;
		pinned: boolean;
		over_18: boolean;
		preview?: {
			images: Array<{
				source: {
					url: string;
					width: number;
					height: number;
				};
				resolutions: Array<{
					url: string;
					width: number;
					height: number;
				}>;
				variants: {};
				id: string;
			}>;
			enabled: boolean;
		};
		all_awardings: Array<{}>;
		awarders: Array<string>;
		media_only: boolean;
		can_gild: boolean;
		spoiler: boolean;
		locked: boolean;
		author_flair_text: string | null;
		treatment_tags: Array<string>;
		visited: boolean;
		removed_by: string | null;
		num_reports: number | null;
		distinguished: string | null;
		subreddit_id: string;
		author_is_blocked: boolean;
		mod_reason_by: string | null;
		removal_reason: string | null;
		link_flair_background_color: string | null;
		id: string;
		is_robot_indexable: boolean;
		report_reasons: string | null;
		author: string;
		discussion_type: string | null;
		num_comments: number;
		send_replies: boolean;
		whitelist_status: string | null;
		contest_mode: boolean;
		mod_reports: Array<{}>;
		author_patreon_flair: boolean;
		author_flair_text_color: string | null;
		permalink: string;
		parent_whitelist_status: string | null;
		stickied: boolean;
		url: string;
		subreddit_subscribers: number;
		created_utc: number;
		num_crossposts: number;
		media: {};
		is_video: boolean;
	};
}

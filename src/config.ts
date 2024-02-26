import type { NavItems } from "./types";

export const NAV_ITEMS: NavItems = {
    home: {
        path: "/",
        title: "home",
    },
    blog: {
        path: "/blog",
        title: "blog",
    },
    tags: {
        path: "/tags",
        title: "tags",
    },
    about: {
        path: "/about",
        title: "about",
    },
};

export const SITE = {
    // Your site's detail?
    name: "Pedram's Web Blog",
    title: "Pedram Navid's Web Blog",
    description: "Things I Learned",
    url: "https://pedramnavid.com",
    githubUrl: "https://github.com/pedramnavid",
    listDrafts: true,
    image:
        "https://raw.githubusercontent.com/one-aalam/astro-ink/main/public/astro-banner.png",
    ytChannelId: "",
    // Optional, user/author settings (example)
    // Author: name
    author: "Pedram Navid", // Example: Fred K. Schott
    // Author: Twitter handler
    authorTwitter: "pdrmnvd", // Example: FredKSchott
    // Author: Image external source
    authorImage: "", // Example: https://pbs.twimg.com/profile_images/1272979356529221632/sxvncugt_400x400.jpg, https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png
    // Author: Bio
    authorBio:
        "my name is pedram",
};

// Ink - Theme configuration
export const PAGE_SIZE = 8;
export const USE_POST_IMG_OVERLAY = false;
export const USE_MEDIA_THUMBNAIL = true;

export const USE_AUTHOR_CARD = false;
export const USE_SUBSCRIPTION = false; /* works only when USE_AUTHOR_CARD is true */

export const USE_VIEW_STATS = false;

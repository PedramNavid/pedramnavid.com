import type { NavItems } from "./types";

export const NAV_ITEMS: NavItems = {
    writing: {
        path: "/blog",
        title: "writing",
    },
    projects: {
        path: "/projects",
        title: "projects",
    },
    talks: {
        path: "/talks",
        title: "talks",
    },
    now: {
        path: "/now",
        title: "now",
    },
    about: {
        path: "/about",
        title: "about",
    },
};

export const SITE = {
    name: "Pedram Navid",
    title: "Pedram Navid",
    description: "Writing about software engineering, data, and building things.",
    url: "https://pedramnavid.com",
    githubUrl: "https://github.com/pedramnavid",
    siteRepoUrl: "https://github.com/PedramNavid/pedramnavid.com",
    listDrafts: true,
    ytChannelId: "",
    author: "Pedram Navid",
    authorTwitter: "pdrmnvd",
    authorImage: "",
    authorBio:
        "Working at Anthropic, helping technical audiences understand and build with Claude.",
};

export const PAGE_SIZE = 8;
export const USE_POST_IMG_OVERLAY = false;
export const USE_MEDIA_THUMBNAIL = true;

export const USE_AUTHOR_CARD = false;
export const USE_SUBSCRIPTION = false;

export const USE_VIEW_STATS = false;

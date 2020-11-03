import { JPClient } from "../clients/JPClient.js";

const post_endpoint = "/posts";
const getPosts = () => {
    return JPClient.get(post_endpoint);
};

export { getPosts };
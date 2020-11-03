import { JPClient } from "../clients/JPClient.js";

const user_endpoint = "/users";
const getUsers = () => {
    return JPClient.get(user_endpoint);
};

export { getUsers };
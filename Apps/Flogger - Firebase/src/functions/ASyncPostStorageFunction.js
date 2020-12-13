import { AsyncStorage } from "react-native";

const storePost = async(key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        alert("Data Stored Successfully!");
    } catch (error) {
        alert(error);
    }
};

const getPost = async(key) => {
    try {
        let data = await AsyncStorage.getItem(key);
        if (data != null) {
            const jsonData = JSON.parse(data);
            return jsonData;
        } else {
            alert("No data with this key!");
        }
    } catch (error) {
        alert(error);
    }
};

const getAllPost = async() => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);

        return result.map(req => JSON.parse(req)).forEach(console.log);
    } catch (error) {
        console.error(error)
    }
}

const removeData = async(key) => {
    try {
        await AsyncStorage.removeItem(key);
        alert("Data Removed Successfully");
    } catch (error) {
        alert(error);
    }
};

export { storeData, storeDataJSON, getData, getDataJSON, removeData };
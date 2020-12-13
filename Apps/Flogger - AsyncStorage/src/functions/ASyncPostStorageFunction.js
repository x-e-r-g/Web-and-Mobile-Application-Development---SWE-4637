import AsyncStorage from '@react-native-async-storage/async-storage';


// functions for profile
const storeProfileJSON = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        console.log("Profile created");
    } catch (error) {
        console.log(error);
    }
};

const getProfileJSON = async (key) => {
    try {
        let profile = await AsyncStorage.getItem(key);
        if (profile != null) {
            const jsonData = JSON.parse(profile);
            return jsonData;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};


//functions for posts
const storePostJSON = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("Posts", jsonValue);
        console.log("Posted successfully");
    } catch (error) {
        console.log(error);
    }
};

const addPostJSON = async (value) => {
  try {
    console.log(value);
    let val = await AsyncStorage.getItem("Posts");
    val = JSON.parse(val);
    val.push(value);
    const jsonValue = JSON.stringify(val);
    await AsyncStorage.setItem("Posts", jsonValue);
    console.log("Posted successfully");
  } catch (error) {
    console.log(error);
  }
};

const getPostJSON = async () => {
    try {
        let data = await AsyncStorage.getItem("Posts");
        data = JSON.parse(data);
        if (data != null) {
            return data;
        } else {
            console.log("No data with this key!");
        }
    } catch (error) {
        console.log(error);
    }
};

const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log("Deleted!");
    } catch (error) {
        console.log(error);
    }
};



export { storeProfileJSON, getProfileJSON, storePostJSON, addPostJSON, getPostJSON, removeData};
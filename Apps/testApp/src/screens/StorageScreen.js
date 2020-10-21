import React from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';

const StorageScreen = () => {
    return (
        <View>
            <Text>Storage Screen</Text>
            <Button>
                title='Get Data'
            onPress={function(){}}
            </Button>
            <Button>
                title='Remove Data'
            onPress={function () { }}
            </Button>
        </View>
    );
};

export default StorageScreen;
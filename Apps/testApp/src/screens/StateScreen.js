import React from 'react';
import { Text, View, useState, Button, StyleSheet} from 'react-native';

const StateScreen = () =>{
    let [counter, setCounter] = useState(0);
    return(
        <View>
            <Text style={styles.textStyle}>counter</Text>
            <Button>
                title='Increase'
            onPress={function () { 
                setCounter(counter+1);
            }
            }
            </Button>
            <Button>
                title='Decrease'
            onPress={function () {
                    setCounter(counter - 1);
                }
                }
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 40,
        color: "red",
    },
})
export default StateScreen;
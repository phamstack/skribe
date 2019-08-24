import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
const { height, width } = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons';

class TaskCard extends Component {
    onToggleCircle = () => {
        const { isCompleted, id, completeItem, incompleteItem } = this.props;
        if (isCompleted) {
            incompleteItem(id);
        } else {
            completeItem(id);
        }
    };

    render() {
        const { text, deleteItem, id, isCompleted, classColor } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this.onToggleCircle}>
                        <View
                            style={[
                                styles.circle,
                                isCompleted
                                    ? { borderColor: 'green' }
                                    : { borderColor: 'tomato' }
                            ]}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.text,
                            isCompleted
                                ? {
                                      color: 'grey',
                                      textDecorationLine: 'line-through'
                                  }
                                : { color: '#3c4560' }
                        ]}
                    >
                        {text}
                    </Text>
                </View>
                {isCompleted ? (
                    <View style={styles.button}>
                        <TouchableOpacity onPressOut={() => deleteItem(id)}>
                            <MaterialIcons
                                name="delete-forever"
                                size={24}
                                color="grey"
                            />
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        );
    }
}

export default TaskCard;

const styles = StyleSheet.create({
    // container: {
    //     padding: 15,
    //     backgroundColor: '#fff',
    //     flexDirection: 'row',
    //     alignItems: 'center'
    // },
    // headerContainer: {
    //     flex: 6,
    //     flexDirection: 'row',
    //     //backgroundColor: 'yellow',
    // },
    // editContainer: {
    //     width: 30,
    //     flexDirection: 'row',
    //     marginLeft: 10,
    //     justifyContent: 'flex-end',
    //     //backgroundColor: 'orange'
    // },
    // headerText: {
    //     fontFamily: 'Avenir Next',
    //     fontSize: 17,
    //     fontWeight: '600',
    //     marginLeft: 7.5
    // },
    // radioButtonContainer: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     marginLeft: 10,
    //     //backgroundColor: 'green'
    // }
    container: {
        //width: width - 50,
        marginRight: 30,
        marginLeft: 20,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        backgroundColor: 'white',
        height: width / 8 + 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center'
        //width: width / 1.5
    },
    text: {
        fontWeight: '600',
        fontSize: 19,
        marginVertical: 15,
        marginLeft: 5,
        fontFamily: 'Avenir Next'
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        margin: 10
    },
    button: {
        marginRight: 10
    }
});

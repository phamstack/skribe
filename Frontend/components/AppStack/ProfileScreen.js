import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Search from '../Profile/Search';

class ClassesScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Profile',
            headerRight: (
                <TouchableOpacity
                    style={{ paddingRight: 10 }}
                    onPress={() => {
                        navigation.navigate('Settings');
                    }}
                >
                    <Ionicons name="ios-options" color="#007AFF" size={28} />
                </TouchableOpacity>
            )
        };
    };

    state = {
        selectedIndex: 0
    };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* !Post Call */}

                    <View style={styles.titleBar}>
                        <Image
                            style={styles.avatar}
                            source={require('../../assets/huy.jpg')}
                        />
                        <Text style={styles.name}>Huy Pham</Text>
                        <Text style={styles.title}>@azenvy</Text>
                    </View>

                    <Search
                        style={styles.search}
                        title="Search Documents"
                        desc="Look for your notes"
                        color="#E8384F"
                        destination="Search"
                    />

                    <View
                        style={{
                            marginTop: 30,
                            marginRight: 30,
                            marginLeft: 30
                        }}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigate('Login')}
                        >
                            <Text style={styles.buttonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <Text style={styles.subTitle}>
                         Your classes
                         </Text> */}

                    {/* <SafeAreaView>
						<SegmentedControlIOS
							style={styles.segmentedIOS}
							values={['Schedule', 'Order\'s History']}
							selectedIndex={this.state.selectedIndex}
							onChange={(event) => {
								this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
							}}
						/>
						<View>
							{(this.state.selectedIndex === 0) ? (
								<Schedule />
							) : (
								<OrderHistory />
							)}
						</View>
					</SafeAreaView> */}
                </ScrollView>
            </View>
        );
    }
}

export default ClassesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255, 255, 255)'
    },
    segmentedIOS: {
        marginTop: 10,
        marginLeft: 70,
        marginRight: 70
    },
    avatar: {
        width: 80,
        height: 80,
        backgroundColor: 'black',
        borderRadius: 40
    },
    titleBar: {
        width: '100%',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontFamily: 'Avenir Next',
        color: '#b8bece',
        fontWeight: '500'
    },
    subTitle: {
        fontSize: 15,
        fontFamily: 'Avenir Next',
        color: '#b8bece',
        fontWeight: '600',
        marginLeft: 30,
        marginTop: 25,
        textTransform: 'uppercase'
    },
    name: {
        fontSize: 20,
        fontFamily: 'Avenir Next',
        color: '#3c4560',
        fontWeight: '700',
        paddingTop: 5
    },
    classes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    text: {
        fontFamily: 'Avenir Next',
        fontSize: 20
    },
    button: {
        backgroundColor: '#E8384F',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: 'Avenir Next',
        fontWeight: '500'
    },
    search: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

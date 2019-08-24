import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    SafeAreaView
} from 'react-native';
import ListCard from '../Classes/ListCard';
import NewCard from '../Classes/NewCard';

import { connect } from 'react-redux';

class ClassesScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.titleBar}>
                        <Image
                            style={styles.avatar}
                            source={require('../../assets/huy.jpg')}
                        />
                        <Text style={styles.title}>Welcome back,</Text>
                        <Text style={styles.name}>Huy Pham</Text>
                    </View>

                    <Text style={styles.subTitle}>Your classes</Text>

                    <SafeAreaView style={styles.classes}>
                        {this.props.all.map(function(post, i) {
                            return (
                                <ListCard
                                    key={i}
                                    title={post.name}
                                    color={post.color}
                                    desc={post.desc}
                                    folders={post.folders}
                                    classIndex={i}
                                    classID={post._id}
                                />
                            );
                        })}
                        <NewCard />
                    </SafeAreaView>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    all: state.all
});

export default connect(mapStateToProps)(ClassesScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255, 255, 255)'
    },
    cover: {},
    avatar: {
        width: 44,
        height: 44,
        backgroundColor: 'black',
        borderRadius: 22,
        marginLeft: 30,
        position: 'absolute',
        top: 0,
        left: 0
    },
    titleBar: {
        width: '100%',
        marginTop: 50,
        paddingLeft: 90
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
        marginTop: 15,
        textTransform: 'uppercase'
    },
    name: {
        fontSize: 20,
        fontFamily: 'Avenir Next',
        color: '#3c4560',
        fontWeight: '700',
        marginTop: -3
    },
    classes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    }
});

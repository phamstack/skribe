import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { fetchAll } from '../../actions';
import axios from 'axios';

class FolderDetail extends Component {
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    //width: '86%',
                    //marginLeft: '14%',
                    width: '100%',
                    backgroundColor: '#CED0CE'
                }}
            />
        );
    };

    state = {
        searchText: '',
        data: []
    };

    search = async text => {
        if (text != '') {
            console.log('Start ' + text);
            const response = await axios.post(
                'http://127.0.0.1:8080/fileManage/textSearch/' + text
            );
            this.setState({ data: response.data });
            //console.log(response.data)
            console.log('Finish');
        } else {
            this.setState({ data: [] });
            console.log('EMPTY DOG');
        }
    };

    state = {
        visible: false
    };

    render() {
        const imageUrl = 'http://127.0.0.1:8080/fileManage/image/';

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    value={this.state.searchText}
                    onChangeText={searchText => {
                        this.setState({ searchText });
                        this.search(searchText);
                    }}
                    placeholder="Search State"
                    autoCapitalize="none"
                />

                <Modal visible={this.state.visible} transparent={true}>
                    <ImageViewer
                        imageUrls={this.state.images}
                        renderFooter={() => {
                            return (
                                <View>
                                    <Text
                                        style={{
                                            fontFamily: 'Avenir Next',
                                            fontWeight: '500',
                                            color: 'white'
                                        }}
                                    >
                                        {this.state.content}
                                    </Text>
                                </View>
                            );
                        }}
                        footerContainerStyle={{
                            bottom: 30,
                            position: 'absolute',
                            left: 20,
                            height: 150
                        }}
                        onDoubleClick={() => {
                            this.setState({ visible: false });
                        }}
                        renderHeader={() => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ visible: false });
                                    }}
                                >
                                    <Image
                                        style={{
                                            position: 'absolute',
                                            top: 50,
                                            left: 30,
                                            height: 30,
                                            width: 30
                                        }}
                                        source={require('../../assets/back.png')}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                </Modal>

                <FlatList
                    style={styles.listContainer}
                    data={this.state.data}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                console.log('DATA IS ________');
                                console.log(item);
                                console.log(imageUrl + item.image);
                                this.setState({
                                    visible: true,
                                    images: [
                                        {
                                            url: imageUrl + item.image
                                        }
                                    ],
                                    content: item.content
                                });
                            }}
                        >
                            <Image
                                style={styles.thumbnail}
                                source={{ uri: imageUrl + item.image }}
                            />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemDesc}>{item.desc}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={this.renderSeparator}
                    // Virtualize list
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    all: state.all
});

export default connect(
    mapStateToProps,
    { fetchAll }
)(FolderDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        borderTopWidth: 1,
        borderTopColor: '#CED0CE'
    },
    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 5,
        fontSize: 18,
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)'
    },
    itemTitle: {
        position: 'absolute',
        marginLeft: 80,
        marginTop: 15,
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        fontSize: 18
    },
    itemDesc: {
        position: 'absolute',
        marginLeft: 80,
        marginTop: 40,
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        fontSize: 18
    },
    searchBar: {
        //borderWidth: 1,
        height: 40,
        fontFamily: 'Avenir Next',
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 12
    },
    thumbnail: {
        margin: 15,
        width: 50,
        height: 75
    }
});

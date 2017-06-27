import React from 'react';
import {
    Text,
    View,
    Button,
    TextInput,
    Slider,
    StyleSheet,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import Display from 'react-native-display';


class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '', columns: 2, loading: false };
    }
    static navigationOptions = {
        title: 'Search Images',
    };

    parseHtml(str) {
        let m, urls = [];
        let rex = /<img.*?src="(https:\/\/.*?)"/g;

        while(m = rex.exec(str)) {
            urls.push(m[1]);
        }

        return urls
    }

    fetchImages() {
        this.setState({loading: true});
        fetch(`https://www.bing.com/images/search?q=${this.state.text}`)
            .then(res => res.text()).then(html => {
                let images = this.parseHtml(html);
                this.setState({loading: false});
                this.props.navigation.navigate('Display', { images, ...this.state })
            })
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ActivityIndicator
                    animating={this.state.loading}
                    size="large"
                />
                <Display enable={!this.state.loading} style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.text}>Search Term:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Columns:</Text>
                        <Slider
                            style={styles.slider}
                            value={this.state.columns}
                            minimumValue={1}
                            maximumValue={5}
                            step={1}
                            onValueChange={(columns) => this.setState({columns})} />
                        <Text>{this.state.columns}</Text>
                    </View>
                    <Button
                        onPress={this.fetchImages.bind(this)}
                        title="Search"
                    />
                </Display>
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'grey',
        fontSize: 14,
        flexBasis: 100
    },
    inputContainer: {
        height: 40,
        borderColor: '#2fa89d',
        borderBottomWidth: 2
    },
    input: {
        height: 40,
        width: 150,
        textAlign: 'center',
        fontSize: 14
    },
    slider: {
        flexBasis: 140,
        marginRight: 8
    }
});

export default SearchScreen;
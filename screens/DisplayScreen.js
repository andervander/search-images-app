import React from 'react';
import { FlatList } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import Display from 'react-native-display';
import Dimensions from 'Dimensions';


class DisplayScreen extends React.Component {
    constructor(props) {
        super(props);
        this.viewWidth = Dimensions.get('window').width;
        this.state = { imagesView: []};
    }

    static navigationOptions = ({ navigation }) => ({
        title: `Images for ${navigation.state.params.text}`
    });

    get params() {
        return this.props.navigation.state.params;
    }

    renderImage({item, index}) {
        let imagesView = [];
        return (
                <Display enable={!this.state.imagesView[index]} style={{flex:1}}>
                    <Image
                        source={{uri: item.image}}
                        indicator={ProgressPie}
                        indicatorProps={{color: '#2fa89d'}}
                        style={{flex:1, height: this.viewWidth / this.params.columns, width: undefined, margin: 5}}
                        resizeMode="cover"
                        onError={() => {imagesView[index] = true; this.setState({imagesView})}}
                    />
                </Display>
        )
    }


    render() {
        const images = this.params.images.map((item, index) => ({image: item, key: index}));

        return (
            <FlatList style={{margin: 5}}
                      data={images}
                      numColumns={this.params.columns}
                      keyExtractor={(item, index) => item.key}
                      renderItem={this.renderImage.bind(this)}
            />
        );
    }
}

export default DisplayScreen
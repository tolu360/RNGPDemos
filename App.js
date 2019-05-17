/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

type Props = {};
type State = {
  showInput: boolean,
  addressQuery: string,
  predictions: Array<any>
}
export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      addressQuery: '',
      predictions: []
    };
  }

  onShowInputPress = () => {
    console.log('show input');
    this.setState({showInput: true});
  }


  onOpenAutocompletePress = () => {
    RNGooglePlaces.openAutocompleteModal({
      initialQuery: 'vestar', 
      locationRestriction: {
        latitudeSW: 6.3670553, 
        longitudeSW: 2.7062895, 
        latitudeNE: 6.6967964, 
        longitudeNE: 4.351055
      }
      }, ['placeID', 'location', 'name', 'address', 'types', 'openingHours', 'plusCode', 'rating', 'userRatingsTotal', 'viewport', 'addressComponents'])
    .then((place) => {
		  console.log(place);
    })
    .catch(error => console.log(error.message));
  }

  onQueryChange = (text) => {
    this.setState({addressQuery: text});
    RNGooglePlaces.getAutocompletePredictions(this.state.addressQuery, {
      country: 'NG'
    })
    .then((places) => {
      console.log(places);
      this.setState({predictions: places});
    })
    .catch(error => console.log(error.message));
  }

  onSelectSuggestion(placeID) {
    console.log(placeID);
    // getPlaceByID call here
    RNGooglePlaces.lookUpPlaceByID(placeID)
    .then((results) => console.log(results))
    .catch((error) => console.log(error.message));

    this.setState({
      showInput: false,
      predictions: []
    });
  }

  onGetCurrentPlacePress = () => {
    RNGooglePlaces.getCurrentPlace()
    .then((results) => console.log(results))
    .catch((error) => console.log(error.message));
  }

  onGetPlaceByIDPress = () => {
    RNGooglePlaces.lookUpPlaceByID('ChIJhRTXUeeROxARmk_Rp3PtIvI')
    .then((results) => console.log(results))
    .catch((error) => console.log(error.message));
  }

  keyExtractor = item => item.placeID;

  renderItem = ({ item }) => {
    return (
      <View style={styles.listItemWrapper}>
          <TouchableOpacity style={styles.listItem}
              onPress={() => this.onSelectSuggestion(item.placeID)}>
              <View style={styles.avatar}>
                <Image style={styles.listIcon} source={require('./assets/icon-home.png')}/>
              </View>
              <View style={styles.placeMeta}>
                  <Text style={styles.primaryText}>{item.primaryText}</Text>
                  <Text style={styles.secondaryText}>{item.secondaryText}</Text>
              </View>
          </TouchableOpacity>
          <View style={styles.divider} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showInput && <View>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={input => this.pickUpInput = input}
              style={styles.input}
              value={this.props.addressQuery}
              onChangeText={this.onQueryChange}
              placeholder={'Current Location'}
              placeholderTextColor='#9BABB4'
              underlineColorAndroid={'transparent'}
              autoFocus
            />
          </View>

          <View style={styles.list}>
            <FlatList
              data={this.state.predictions}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
            />
          </View>
        </View>}
        
        {!this.state.showInput && <View>
          <TouchableOpacity style={styles.inputLauncher} onPress={this.onShowInputPress}>
            <Text style={{color: '#70818A'}}>Where to?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.onOpenAutocompletePress}>
            <Text style={styles.buttonText}>Open Autocomplete Modal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.onGetCurrentPlacePress}>
            <Text style={styles.buttonText}>Get Current Place</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.onGetPlaceByIDPress}>
            <Text style={styles.buttonText}>Get Place By ID</Text>
          </TouchableOpacity>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
    paddingTop: 45
  },
  button: {
    backgroundColor: '#263238',
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: 'white'
  },
  inputLauncher: {
    backgroundColor: '#F3F7F9',
    width: '100%',
    borderRadius: 4,
    height: 35,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 16
  },
  inputWrapper: {
    backgroundColor: '#F3F7F9',
    width: '100%',
    borderRadius: 2,
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  input: {
    color: '#222B2F',
    height: 35,
    fontSize: 15,
    paddingVertical: 4
  },
  list: {
    marginTop: 16,
    height: Dimensions.get('window').height - 70
  },
  listItemWrapper: {
    backgroundColor: 'transparent',
    height: 56
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%'
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DAE4E9',
    width: '92%',
    marginHorizontal: 16,
    opacity: 0.6
  },
  primaryText: {
    color: '#222B2F',
    fontSize: 15,
    marginBottom: 3
  },
  placeMeta: {
    flex: 1,
    marginLeft: 15
  },
  secondaryText: {
    color: '#9BABB4',
    fontSize: 13,
  },
  listIcon: {
    width: 25,
    height: 25
  }
});
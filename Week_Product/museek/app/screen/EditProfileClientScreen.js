import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Dimensions, ToastAndroid} from 'react-native';
import {
  Content,
  View,
  Text,
  Button,
  Header,
  Container,
  Title,
  Left,
  Body,
  Right,
  Item,
  Label,
  Input,
  ListItem,
  Radio,
  Thumbnail,
  Spinner,
  Toast
} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { getUserProfile, updateUserProfile, uploadPicture } from '../function/function'
import ImagePicker from 'react-native-image-picker'

import { connect } from 'react-redux'
import { getUser } from '../redux/action/UserAction'
import AsyncStorage from '@react-native-community/async-storage';

export class EditProfileClientScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radioMale: false,
      radioFemale: false,
      radioOther: true,

      inputStatus: true,
      loading: true,

      user : {
          name: '',
          email: '',
          address: '',
          city: '',
          country: '',
          gender: '',
          profilePicture: '',
        },
      
      imageUri: {
        uri: '',
        type: '',
        name: '',
      },

      token: '',
    };
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('@token')
    this.setState({token:token})

    const profile = await getUserProfile(token)
    this.props.SendUserData(profile)

    this.setState( prevState => ({
      user: {
        ...prevState.user,
        name: this.props.user.dataUser.name,
        email: this.props.user.dataUser.email,
        address: this.props.user.dataUser.address,
        city: this.props.user.dataUser.city,
        country: this.props.user.dataUser.country,
        gender: this.props.user.dataUser.gender,
      },
    }))

    this.props.user.dataUser.profile_picture
    ? 
    this.setState( prevState => ({
      imageUri: {
        ...prevState.imageUri,
        uri: this.props.user.dataUser.profile_picture.secure_url,
      },
    }))
    :
    this.setState( prevState => ({
      imageUri: {
        ...prevState.imageUri,
        uri: '',
      },
    }))

    this.state.user ? this.setState({loading:false}) : this.setState({loading:true})
  }

  radioMale() {
    this.setState({radioMale: true, radioFemale: false, radioOther: false});
    this.setState( prevState => ({
      user: {
        ...prevState.user,
        gender: 'male',
      }
    }))
  }
  radioFemale() {
    this.setState({radioMale: false, radioFemale: true, radioOther: false});
    this.setState( prevState => ({
      user: {
        ...prevState.user,
        gender: 'female',
      }
    }))
  }
  radioOther() {
    this.setState({radioMale: false, radioFemale: false, radioOther: true});
    this.setState( prevState => ({
      user: {
        ...prevState.user,
        gender: 'other',
      }
    }))
  }

  handleUpdate = async () => {
    this.setState({loading: true})
    this.setState({ inputStatus: true })
    const token = await AsyncStorage.getItem('@token')
    const result = await updateUserProfile(token, this.state.user)

    if(result==='berhasil'){
      this.props.SendUserData(this.state.user)
      this.setState({loading: false})
      ToastAndroid.show('Your Profile Successfully Updated', ToastAndroid.SHORT);
    }
  }

  handleAvatar = () => {
    this.setState({loading: true})

    const options = {
      noData: true
    }

    ImagePicker.launchImageLibrary(options, async response => {
      this.setState({ imageUri: response})
      const res = await uploadPicture(this.state.imageUri,this.state.token)

      res === 'berhasil' ? this.setState({loading: false}) : Toast.show({text: 'Unable to upload picture',})
    })
  }

  render() {
    return (
      <Container style={styles.mainbgColor}>
      <Header
          androidStatusBarColor="#1a1a1d"
          style={{backgroundColor: '#1a1a1d'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon
                type="FontAwesome5"
                name="angle-left"
                size={20}
                color={'#fff'}
              />
            </Button>
          </Left>

          <Body>
            <Title>Edit Profile</Title>
          </Body>

          <Right />
        </Header>

        {this.state.loading === true ? 
        <View style={{backgroundColor: '#1a1a1d',  flex: 1,  alignItems: 'center',  justifyContent: 'center',}}>
          <Spinner color="#ffee54" size="large"/>
        </View>

          :

        <Content>
          <View>
            <View padder style={{width: '99%'}}>

              <TouchableOpacity disabled={true} style={[{display:'flex', justifyContent:'center', alignItems:'center'}, styles.paddingY]}>
                  {
                    this.state.imageUri.uri ?
                      <Thumbnail source={{uri:this.state.imageUri.uri}} style={[styles.secondbgColor, {width:125,height:125,borderRadius:62.25}]}/>
                      :
                      <Thumbnail source={require('../asset/default_avatar.png')} style={[styles.secondbgColor, {width:125,height:125,borderRadius:62.25}]}/>
                  }
                  <TouchableOpacity onPress= { () => this.handleAvatar() }>
                    <Text style={[styles.secondColor,{marginVertical:5,fontSize:15}]}>Change Profile Picture</Text>
                  </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.touchableStyle, styles.paddingY]}>
                <Item stackedLabel>
                  <Label style={styles.thirdColor}>Full name</Label>
                  <Input
                    style={styles.secondColor}
                    disabled={this.state.inputStatus}
                    value={this.state.user.name}
                    onChangeText={(txt) => 
                      this.setState( prevState => ({
                        user: {
                          ...prevState.user,
                          name: txt,
                        }
                    }))
                    }
                  />
                </Item>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.touchableStyle, styles.paddingY]}>
                <Item stackedLabel>
                  <Label style={styles.thirdColor}>E-mail</Label>
                  <Input
                    style={styles.secondColor}
                    disabled={true}
                  >
                  {this.state.user.email}</Input>
                </Item>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.paddingY, {width: '100%'}]}>
                <Item stackedLabel>
                  <Label style={styles.thirdColor}>Gender </Label>
                  
                  <View style={{flexDirection: 'row'}}>
                    <ListItem noBorder>
                        <Radio
                        selected={this.state.user.gender === 'male' ? true : false}
                        onPress={() => {
                            this.radioMale();
                        }}
                        color={'#fff'}
                        selectedColor={'#ffee54'}
                        disabled={this.state.inputStatus}
                        />
                        <Text style={styles.thirdColor}> Male</Text>
                    </ListItem>

                    <ListItem noBorder>
                        <Radio
                        selected={this.state.user.gender === 'female' ? true : false}
                        onPress={() => {
                            this.radioFemale();
                        }}
                        color={'#fff'}
                        selectedColor={'#ffee54'}
                        disabled={this.state.inputStatus}
                        />
                        <Text style={styles.thirdColor}> Female</Text>
                    </ListItem>

                    <ListItem noBorder>
                        <Radio
                        selected={this.state.user.gender === 'other' ? true : false}
                        onPress={() => {
                            this.radioOther();
                        }}
                        color={'#fff'}
                        selectedColor={'#ffee54'}
                        disabled={this.state.inputStatus}
                        />
                        <Text style={styles.thirdColor}> Other</Text>
                    </ListItem>
                  </View>
                </Item>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.touchableStyle, styles.paddingY]}>
                <Item stackedLabel>
                  <Label style={styles.thirdColor}>Address</Label>
                  <Input
                    style={styles.secondColor}
                    disabled={this.state.inputStatus}
                    value={this.state.user.address}
                    onChangeText={(txt) => 
                      this.setState( prevState => ({
                        user: {
                          ...prevState.user,
                          address: txt,
                        }
                    }))
                    }
                    />
                </Item>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.touchableStyle, styles.paddingY]}>
                <Item stackedLabel>
                  <Label style={styles.thirdColor}>City</Label>
                  <Input
                    style={styles.secondColor}
                    disabled={this.state.inputStatus}
                    value={this.state.user.city}
                    onChangeText={(txt) => 
                      this.setState( prevState => ({
                        user: {
                          ...prevState.user,
                          city: txt,
                        }
                    }))
                    }  
                    />
                </Item>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.touchableStyle, styles.paddingY]}>
                <Item stackedLabel>
                  <Label style={styles.thirdColor}>Country</Label>
                  <Input
                    style={styles.secondColor}
                    disabled={this.state.inputStatus}
                    value={this.state.user.country}
                    onChangeText={(txt) => 
                      this.setState( prevState => ({
                        user: {
                          ...prevState.user,
                          country: txt,
                        }
                    }))
                    }
                    />
                </Item>
              </TouchableOpacity>

              <View>
                <View
                  style={{
                    width: '100%',
                    marginVertical: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  <Button
                    style={[
                      styles.secondbgColor,
                      {
                        width: Dimensions.get('window').width * 0.4,
                        justifyContent: 'center',
                        borderRadius: 50,
                      },
                    ]}
                    onPress={() => this.handleUpdate()}
                    disabled={this.state.inputStatus}>
                    <Text style={styles.mainColor}>SAVE</Text>
                  </Button>
                  
                  { this.state.inputStatus === true ? 
                  (
                  <Button
                    style={[
                      styles.mainbgColor,
                      {
                        width: Dimensions.get('window').width * 0.4,
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#ffee54',
                        borderRadius: 50,
                      },
                    ]}
                    onPress={() => this.setState({inputStatus: false})}>
                    <Text style={styles.secondColor}>EDIT</Text>
                  </Button>
                  )
                  :
                  (
                  <Button
                    style={[
                      styles.mainbgColor,
                      {
                        width: Dimensions.get('window').width * 0.4,
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#ffee54',
                        borderRadius: 50,
                      },
                    ]}
                    onPress={() => this.setState({inputStatus: true})}>
                    <Text style={styles.secondColor}>Cancel</Text>
                  </Button>
                  )
                  }

                </View>
              </View>
            </View>
          </View>
        </Content>
        }
     </Container>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => {
  return {
    SendUserData: user => dispatch(getUser(user)),
  };
};

export default connect(mapStateToProps ,mapDispatchToProps)(EditProfileClientScreen);

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.75,
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1d',
  },
  mainbgColor: {
    backgroundColor: '#1a1a1d',
  },
  mainColor: {
    color: '#1a1a1d',
  },
  secondbgColor: {
    backgroundColor: '#ffee54',
  },
  secondColor: {
    color: '#ffee54',
  },
  thirdbgColor: {
    backgroundColor: '#fff',
  },
  thirdColor: {
    color: '#fff',
  },
  itemBorder: {
    borderBottomColor: '#ffee54',
  },
  transparentbg: {
    backgroundColor: 'transparent',
  },
  touchableStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //   borderBottomWidth: 0.25,
    //   borderBottomColor: '#fff',
  },
  paddingY: {
    paddingVertical: 15,
  },
});

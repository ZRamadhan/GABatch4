import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Button, Text, Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import styles from '../utilities/Styles'

class DetailScreen extends Component {
    render() {
        const item = this.props.navigation.getParam('itemDetail')
        return (
            <Container>
                <View style={{ backgroundColor: '#1a1a1a', display: 'flex', flex: 1 }}>
                    <Image source={require('../asset/logo.png')} style={styles.imageLogo} />
                    {   
                        item.profile_picture.secure_url ?
                        (<Image source={{uri: item.profile_picture.secure_url}} style={{ width: '100%', height: '40%', marginBottom: '5%' }}/>)
                        :
                        (<Image source={require('../asset/noproduct.png')} style={{ width: '100%', height: '40%', marginBottom: '5%' }}/>)
                    }
                    <Text style={styles.musicianName}> {item.name} </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: '6%', marginRight: '6%', marginBottom: -100 }}>
                        <View style={{ width: 150, height: 50, display: 'flex', justifyContent: 'center', color: 'white' }}>
                            {
                                item.city ?
                                (<Text style={{ color: 'white', textTransform: 'capitalize' }}>Location {item.city}</Text>)
                                :
                                (<Text style={{ color: 'white', textTransform: 'capitalize' }}>location undifined</Text>)
                            }
                            {
                                item.price ?
                                (<Text style={{ color: 'white', textTransform: 'capitalize' }}>Rp {item.price} /Event</Text>)
                                :
                                (<Text style={{ color: 'white', textTransform: 'capitalize' }}>Rp undefined /Event</Text>)
                            }
                        </View>
                        <View style={{ width: 75, height: 50 }}>
                            <Button bordered style={{ display: 'flex', justifyContent: 'center', borderColor: '#ffee54' }}>
                                <Text style={{color: '#ffee54'}}>Book</Text>
                            </Button>
                        </View>
                    </View>
                    <Content>
                        <View style={{ height: 1, width: '100%', backgroundColor: 'white' }} />
                        <Text style={{ color: 'white', marginRight: '5%', marginLeft: '5%', marginTop: '5%', fontWeight: 'bold' }}>Skills</Text>
                        <Text style={{ color: 'white', marginRight: '5%', marginLeft: '5%', marginTop: '5%' }}>{(item.skill).toString().split(',').join(', ')}</Text>
                    </Content>
                </View>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    musician: state.musician
})

export default withNavigation(connect(mapStateToProps)(DetailScreen))
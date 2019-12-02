import React, { Component } from 'react'
import { getMusician } from '../redux/action/MusicianAction'
import { connect } from 'react-redux'
import { Image, TouchableOpacity, FlatList, View } from 'react-native'
import { Container, Content, Text, Card, CardItem, Item, Input, Icon, Header, Spinner } from 'native-base'
import styles from '../utilities/Styles'

class HomeScreen extends Component {
    numberColumn = 2

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            datas: [],
            arr: []
        }
    }

    arrNull = () => {
        const nullArr = this.props.musician.message
        if (nullArr === null) {
            this.setState({ arr: null })
            return (
                <Container>
                    <Header transparent />
                    <Spinner />
                </Container>
            )
        }
        else {
            this.setState({ datas: nullArr })
        }
    }

    formatFlatList = (datas, numberColumn) => {
        const numberOfFullRow = Math.floor(datas.length / numberColumn)
        let numberOfElementsLastRow = datas.length - (numberOfFullRow * numberColumn)

        while (numberOfElementsLastRow !== numberColumn && numberOfElementsLastRow !== 0) {
            datas.push({ id: `blank-${numberOfElementsLastRow}`, empty: true })
            numberOfElementsLastRow++
        }
        return datas;
    }

    flatListBox = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} key={index} />
        }
        return (
            <View style={styles.item} key={index}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { itemDetail: item })}>
                    <Card transparent>
                        <CardItem style={styles.cardItem}>
                            {
                                item.profile_picture ?
                                    (<Image source={{ uri: item.profile_picture.secure_url }} style={{ height: 120, width: null, flex: 1 }} />)
                                    :
                                    (<Image source={require('../asset/noproduct.png')} style={{ height: 120, width: null, flex: 1 }} />)
                            }
                        </CardItem>

                        <CardItem style={styles.cardItem}>
                            <Text style={{ fontSize: 12 }} numberOfLines={1}>{item.name}</Text>
                        </CardItem>

                        <CardItem style={styles.cardItem}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Rp {`${item.price}`}</Text>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }

    componentDidMount() {
        this.arrNull()
        setInterval(this.arrNull, 5000)
        this.props.getMusician(this.props.musician.data)
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#1a1a1a', display: 'flex', flex: 1 }}>
                <Image source={require('../asset/logo.png')} style={styles.imageLogo} />
                <Item rounded style={styles.searchBar}>
                    <Input placeholder='serach' style={{ color: 'white' }}
                        value={this.state.search}
                        onChangeText={(text) => this.setState({ search: text })}
                        returnKeyType='search'
                    />
                    <Icon name='search' type='FontAwesome' style={{ color: 'white', fontSize: 16 }} />
                </Item>
                <Content>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FlatList
                            data={this.formatFlatList(this.state.datas, 2)}
                            style={styles.container}
                            renderItem={this.flatListBox}
                            numColumns={this.numberColumn}
                        />
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    musician: state.musician
})

const mapDispatchToProps = dispatch => {
    return {
        getMusician: data => dispatch(getMusician(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

import { StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
    // Flat list
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        width: Dimensions.get('window').width
    },
    item: {
        marginVertical: 25,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / 2
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    itemText: {
        color: 'yellow'
    },
    cardItem: {
        width: '100%',
        justifyContent: 'center',
        borderRadius: 0,
        width: Dimensions.get('window').width / 2.7
    },
    imageLogo: {
        width: 150,
        height: 50,
        alignSelf: 'center'
    },
    searchBar: {
        width: '90%',
        height: '7%',
        alignSelf : 'center',
        marginBottom: 5
    },
    musicianName: {
        fontSize: 22,
        color: 'white',
        margin: '5%',
        fontWeight: 'bold'
    }
})

export default styles
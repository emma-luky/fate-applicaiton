import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    post:{
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 15,
      padding: 5,
      margin: 10
    },
    descriptionsContainer: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 15,
      padding: 5,
      marginRight: 5,
      marginVertical: 5,
      marginBottom: 5
  },
    vertical: {
        flexDirection: 'column',
        padding: 10,
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    postPreviewContainer: {
        width: 175,
        height: 175,
        marginBottom: 5,
        marginHorizontal: 20,
        borderRadius: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    tagContainer: {
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        height: '80%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        fontSize: 15
    },
    addButton: {
        textAlign: 'center',
        marginBottom: 10,
    },
    stepContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    imageContainer: {
        marginVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20
    },
    closeButton: {
        textAlign: 'center',
        marginTop: 10,
    },
    imagesWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allows images to wrap to the next line if necessary
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        height: 50,
        width: 100,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 5,
        fontSize: 50
    },
    selectedButton: {
        backgroundColor: 'cornflowerblue',
        borderColor: 'lightgrey',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 15
    },
    selectedButtonText: {
        flexDirection: 'row',
        color: 'white',
        alignSelf : 'center',
        fontSize: 15
    },
    costButtonText: {
        color: 'black',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 20
    },
    selectedCostButtonText: {
        flexDirection: 'row',
        color: 'white',
        alignSelf : 'center',
        fontSize: 20
    },
    postButton: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginHorizontal: 60,
    },
    left: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start'
    }
});

import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        width: 500,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    phoneNumber: {
        fontSize: 15,
        color: 'blue',
    },
    image: {
        position: 'absolute',
    }
});

export default styles;
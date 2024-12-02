import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cancelButtonText: {
        color: 'grey',
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    imagePickerButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    imagePickerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginVertical: 10,
    },
    noImageText: {
        fontSize: 12,
        color: 'gray',
        marginVertical: 10,
    },
});

export default styles;
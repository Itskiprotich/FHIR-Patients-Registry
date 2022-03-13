import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export const Style = StyleSheet.create({
    button: {
        borderRadius: 26,
        backgroundColor: Colors.primary,
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        color: Colors.white,
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 27
    }
});
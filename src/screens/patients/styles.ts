import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        //  backgroundColor: Colors.lightGrey
    },
    headerView: {
        marginTop: 25,
        marginBottom: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerLabel: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 24,
        lineHeight: 30
    },
    listTitle: {
        fontFamily: 'Poppins-Regular',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 20,
        fontStyle: 'normal',
        color: '#000000'
    },
    inActiveText: {
        color: 'grey'
    },
    listText: {
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 20,
        fontStyle: 'normal',
        color: '#797979'
    },
    listIcon: {
        width: 46,
        height: 46,
        marginTop: 37,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    profileView: {
        flexDirection: 'row',
        marginTop: 10
    },
    imageResizeCenter: {
        height: 180,
        width: 180,
        resizeMode: 'center',
        flex: 1,
        tintColor: Colors.primary
    },
    labelSpacing: {
        marginLeft: 5
    },
    menuItem: {
        width: 164,
        height: 154,
        borderRadius: 20,
        backgroundColor: Colors.white
    },
    menuContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    menuTitle: {
        marginTop: 16,
        marginBottom: 27
    },
    wrapper: {
        marginVertical: 10,
        alignItems: 'center',
    },
    gettingStarted: {
        color: Colors.blue1,
        marginTop: 30,
        textDecorationLine: 'underline'
    },
    sliderContainer: {
        height: 100,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
        justifyContent: 'space-evenly'
    },
    categoryBtn: {
        flex: 1,
        width: '100%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryIcon: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 80,
        height: 80,
        backgroundColor: '#fdeae7',
        borderRadius: 50,
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 15,
        color: '#000',
    },
    cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },

    itemContainer: {
        flexDirection: "row",
        minHeight: 44,
        height: 63
    },
    leftElementContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 2,
        paddingLeft: 13
    },
    rightSectionContainer: {
        marginLeft: 18,
        flexDirection: "row",
        flex: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#515151"
    },
    mainTitleContainer: {
        justifyContent: "center",
        flexDirection: "column",
        flex: 1
    },
    rightElementContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 0.4
    },
    rightTextContainer: {
        justifyContent: "center",
        marginRight: 10,
    },
    titleStyle: {
        fontSize: 16
    },
    descriptionStyle: {
        fontSize: 14,
        color: "#515151"
    },
    textStyle: {
        fontSize: 10,
    },
    rightAction: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    placeholderContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        height: "100%"
    },
    placeholderText: {
        fontWeight: "700",
        color: Colors.primary
    },
    label: {
        flex: 1,
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 35,
        color: Colors.black,
    },
    value: {
        fontFamily: 'Poppins-Regular',
        marginTop: 10,
        color: Colors.black,
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.text,
        marginRight: 40
    },
    body: {
        paddingLeft: 14,
        margin: 15,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        borderRadius: 50,
        backgroundColor: Colors.primary
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    flatList: {
        paddingBottom: 50,

    },
    textLabel: {
        marginBottom: 5
    },
    subContainer: {
        marginRight: 10,
        marginLeft: 10
    },
});
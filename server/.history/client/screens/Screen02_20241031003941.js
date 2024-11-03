import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Modal, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';

const Screen02 = ({ route, navigation }) => {
    const { name, avatar, email, password } = route.params; // Nhận dữ liệu từ params
    const [modalVisible, setModalVisible] = useState(false); // Trạng thái modal

    // In ra thông tin để kiểm tra
    console.log("Email:", email); // Kiểm tra email
    console.log("Password:", password); // Kiểm tra password

    const handleSignOut = () => {
        setModalVisible(false);
        navigation.navigate('Screen01'); // Quay lại Screen01
    };

    const handleHomePress = () => {
        navigation.navigate('Screen01'); // Điều hướng về Screen01
    };

    const footer = [
        { image: require('../assets/data/homeicon.png'), name: 'Home', navigate: true },
        { image: require('../assets/data/exploreicon.png'), name: 'Explore' },
        { image: require('../assets/data/searchicon.png'), name: 'Search' },
        { image: require('../assets/data/profileicon.png'), name: 'Profile', navigate: false },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <Text style={styles.name}>{name}</Text>

                {/* Khung cho Email */}
                <View style={styles.inputContainer}>
                    <Text style={styles.info}>Email: {email}</Text>
                </View>

                {/* Khung cho Password */}
                <View style={styles.inputContainer}>
                    <Text style={styles.info}>Password: {password.replace(/./g, '•')}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="Quay lại" onPress={() => navigation.goBack()} />
                    <Button title="Sign Out" onPress={() => setModalVisible(true)} />
                </View>

                {/* Modal xác nhận */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Bạn có chắc chắn muốn đăng xuất?</Text>
                            <View style={styles.modalButtonContainer}>
                                <Pressable style={[styles.button, styles.buttonConfirm]} onPress={handleSignOut}>
                                    <Text style={styles.textStyle}>Có</Text>
                                </Pressable>
                                <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.textStyle}>Không</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Footer */}
                <View style={styles.footer}>
                    {footer.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.footerItem}
                            onPress={item.navigate ? handleHomePress : null} // Chuyển hướng nếu là Home
                        >
                            <Image source={item.image} style={styles.footerIcon} resizeMode="cover" />
                            <Text style={styles.footerText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>

    );
}

export default Screen02;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    inputContainer: {
        width: '100%',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '48%',
    },
    buttonConfirm: {
        backgroundColor: '#28a745',
    },
    buttonCancel: {
        backgroundColor: '#dc3545',
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
    footer: {
        backgroundColor: '#5958b2',
        height: 90,
        paddingHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerItem: {
        alignItems: 'center',
    },
    footerIcon: {
        width: 30, height: 30,
    },
    footerText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 3,
    },
});

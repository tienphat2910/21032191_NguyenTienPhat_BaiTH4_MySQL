import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Modal, Pressable, TextInput } from 'react-native';

const Screen02 = ({ route, navigation }) => {
    const { name, avatar, email, password } = route.params; // Nhận dữ liệu từ params
    const [modalVisible, setModalVisible] = useState(false); // Trạng thái modal

    // In ra thông tin để kiểm tra
    console.log("Email:", email); // Kiểm tra email
    console.log("Password:", password); // Kiểm tra password

    const handleSignOut = () => {
        // Logic đăng xuất ở đây (nếu cần)
        setModalVisible(false);
        navigation.navigate('Screen01'); // Quay lại Screen01
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <Text style={styles.name}>{name}</Text>

            {/* Khung cho Email */}
            <View style={styles.inputContainer}>
                <Text style={styles.info}>Email: {email}</Text>
            </View>

            {/* Khung cho Password */}
            <View style={styles.inputContainer}>
                <Text style={styles.info}>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    secureTextEntry={true} // Hiển thị mật khẩu dưới dạng chấm
                    editable={false} // Không cho phép sửa đổi
                />
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
        </View>
    );
}

export default Screen02;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
        textAlign: 'left', // Căn lề trái
    },
    input: {
        fontSize: 16,
        flex: 1,
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
        width: '48%', // Giảm độ rộng để không bị chèn
    },
    buttonConfirm: {
        backgroundColor: '#28a745', // Màu xanh cho nút xác nhận
    },
    buttonCancel: {
        backgroundColor: '#dc3545', // Màu đỏ cho nút hủy
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
});

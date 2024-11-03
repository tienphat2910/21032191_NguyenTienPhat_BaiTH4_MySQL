import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import axios from 'axios';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            setEmailError('Vui lòng nhập email hợp lệ');
            return;
        } else {
            setEmailError('');
        }

        try {
            const response = await axios.post('http://localhost:3000/api/forgot-password', { email });

            if (response.data.success) {
                setModalMessage('Đã gửi yêu cầu đặt lại mật khẩu đến email của bạn!');
            } else {
                setModalMessage(response.data.message);
            }
        } catch (error) {
            console.error('Lỗi:', error);
            setModalMessage('Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setModalVisible(true);
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        navigation.navigate('SignInScreen'); // Quay lại màn hình đăng nhập
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quên Mật Khẩu</Text>
            <Text style={styles.subtitle}>Nhập email của bạn để đặt lại mật khẩu</Text>

            <TextInput
                style={styles.emailInput}
                placeholder='Nhập email'
                placeholderTextColor="#bcc1ca"
                value={email}
                onChangeText={setEmail}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Gửi yêu cầu</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#171a1f',
    },
    subtitle: {
        fontSize: 16,
        color: '#424955',
        marginBottom: 20,
    },
    emailInput: {
        width: '100%',
        backgroundColor: '#f3f4f6',
        borderRadius: 16,
        height: 43,
        paddingHorizontal: 16,
        marginBottom: 10,
        outline: 'none',
    },
    submitButton: {
        backgroundColor: '#535ce8',
        borderRadius: 26,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    modalContainer: {
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
        fontSize: 16,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#535ce8',
        borderRadius: 10,
        padding: 10,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ForgotPasswordScreen;

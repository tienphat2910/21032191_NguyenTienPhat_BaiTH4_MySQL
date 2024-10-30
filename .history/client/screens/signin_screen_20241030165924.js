import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal } from 'react-native';
import axios from 'axios'; // Nhập axios

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignIn = () => {
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Vui lòng nhập email hợp lệ');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      // Gửi yêu cầu tới API để kiểm tra thông tin đăng nhập
      axios.post('http://localhost:3000/api/account', { email, password })
        .then((response) => {
          const data = response.data;
          setModalMessage(data.message); // Hiển thị thông báo từ API
          setModalVisible(true); // Mở modal thông báo

          if (data.success) {
            // Chuyển hướng đến HomeDashboard nếu đăng nhập thành công
            navigation.navigate('Screen01');
          }
        })
        .catch((error) => {
          setModalMessage('Có lỗi xảy ra, vui lòng thử lại'); // Thông báo lỗi chung
          setModalVisible(true);
          console.error('Lỗi khi đăng nhập:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Welcome back! 👋</Text>
      </View>

      <View style={styles.signIn}>
        <View style={styles.signInForm}>
          <Text style={styles.signInEmail}>Email</Text>
          <TextInput
            style={styles.signInEmailInput}
            placeholder='Enter email'
            placeholderTextColor="#bcc1ca"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.signInPassword}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.signInPasswordInput}
              placeholder='Enter password'
              placeholderTextColor="#bcc1ca"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
              <Image
                style={styles.hideIcon}
                source={passwordVisible ? require('../assets/icons/opened_eye.png') :
                  require('../assets/icons/closed_eye.png')}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.alternateLogIn}>OR LOG IN WITH</Text>

          <View style={styles.icons}>
            <Image style={styles.icon} source={require('../assets/icons/google.png')} />
            <Image style={styles.icon} source={require('../assets/icons/facebook.png')} />
            <Image style={styles.icon} source={require('../assets/icons/apple.png')} />
          </View>
        </View>

        <View style={styles.signUp}>
          <Text style={styles.signUpText}>
            Don't have an account?
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.signUpLink}> Sign up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
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
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  greeting: {
    marginTop: 30,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#171a1f',
  },
  signIn: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  signInForm: {
    marginBottom: 30,
  },
  signInEmail: {
    fontSize: 16,
    fontWeight: '700',
    color: '#424955',
    marginBottom: 10,
  },
  signInEmailInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    height: 43,
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  signInPassword: {
    fontSize: 16,
    fontWeight: '700',
    color: '#424955',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    alignItems: 'center',
    paddingRight: 10,
  },
  signInPasswordInput: {
    flex: 1,
    height: 43,
    paddingHorizontal: 16,
  },
  iconContainer: {
    padding: 5,
  },
  hideIcon: {
    width: 20,
    height: 20,
  },
  forgotPassword: {
    color: '#535ce8',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 30,
  },
  signInButton: {
    backgroundColor: '#535ce8',
    borderRadius: 26,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  alternateLogIn: {
    textAlign: 'center',
    color: '#6e7787',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 20,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 10,
    width: 32,
    height: 32,
  },
  signUp: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#171a1f',
  },
  signUpLink: {
    color: '#535ce8',
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#535ce8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignInScreen;

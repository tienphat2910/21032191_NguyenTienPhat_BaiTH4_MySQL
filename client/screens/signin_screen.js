import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal } from 'react-native';
import axios from 'axios';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [serverError, setServerError] = useState(''); // Trạng thái cho lỗi từ máy chủ

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

  const handleSignIn = async () => {
    // Kiểm tra tính hợp lệ của email và mật khẩu
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
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Đăng nhập thành công
          console.log(data);
          navigation.navigate("Screen01", {
            email: data.email,
            password: data.password,
            name: data.name,
            avatar: data.avatar,
          });
          setEmail("");
          setPassword("");
          setServerError(''); // Đặt lại lỗi máy chủ
        } else {
          // Đăng nhập không thành công
          setServerError(data.message); // Hiển thị thông báo lỗi
        }
      } catch (error) {
        console.error('Lỗi:', error);
        setServerError('Có lỗi xảy ra, vui lòng thử lại!'); // Hiển thị thông báo lỗi
      }
    } else {
      setServerError(''); // Đặt lại lỗi máy chủ nếu thông tin không hợp lệ
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
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
              style={styles.passwordInput}
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

          {serverError ? <Text style={styles.errorText}>{serverError}</Text> : null} {/* Hiển thị lỗi từ máy chủ */}

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
              onPress={handleModalClose}
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
    outline: 'none',
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
  passwordInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    height: 43,
    paddingHorizontal: 16,
    flex: 1,
    outline: 'none',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 300,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#535ce8',
    borderRadius: 10,
    padding: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignInScreen;

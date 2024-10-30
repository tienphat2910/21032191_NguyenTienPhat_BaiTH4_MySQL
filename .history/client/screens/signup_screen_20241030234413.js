import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState(''); // Trường Name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(''); // Trường Avatar
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState(''); // Thông báo lỗi cho Name
  const [avatarError, setAvatarError] = useState(''); // Thông báo lỗi cho Avatar
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateName = (name) => {
    return name.length > 0; // Tên không được để trống
  };

  const handleSignUp = async () => {
    let valid = true;

    if (!validateName(name)) {
      setNameError('Please enter your name');
      valid = false;
    } else {
      setNameError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!avatar) {
      setAvatarError('Please enter a valid avatar URL');
      valid = false;
    } else {
      setAvatarError('');
    }

    if (valid) {
      try {
        // Gửi yêu cầu đăng ký tới API
        const response = await axios.post('http://localhost:3000/api/register', {
          name, // Thêm Name vào payload
          email,
          password,
          avatar, // Thêm Avatar vào payload
        });
        if (response.data.success) {
          setModalMessage('Sign up successful! You can now sign in.');
          setModalVisible(true);
        } else {
          setModalMessage(response.data.message || 'Something went wrong.');
          setModalVisible(true);
        }
      } catch (error) {
        setModalMessage('Registration failed. Please try again later.');
        setModalVisible(true);
        console.error('Error during registration:', error);
      }
    }
  };

  // Hàm xử lý khi nhấn OK trong modal
  const handleModalOk = () => {
    setModalVisible(false);
    navigation.navigate('SignInScreen'); // Điều hướng về SignInScreen
  };

  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Create Account 📅</Text>
      </View>

      <View style={styles.signUp}>
        <View style={styles.signUpForm}>
          {/* Trường nhập Name */}
          <Text style={styles.signUpEmail}>Name</Text>
          <TextInput
            style={styles.signUpEmailInput}
            placeholder='Enter your name'
            placeholderTextColor="#bcc1ca"
            value={name}
            onChangeText={setName}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <Text style={styles.signUpEmail}>Email</Text>
          <TextInput
            style={styles.signUpEmailInput}
            placeholder='Enter email'
            placeholderTextColor="#bcc1ca"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.signUpPassword}>Password</Text>
          <TextInput
            style={styles.signUpPasswordInput}
            placeholder='Enter password'
            placeholderTextColor="#bcc1ca"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <Text style={styles.signUpConfirmPassword}>Confirm Password</Text>
          <TextInput
            style={styles.signUpPasswordInput}
            placeholder='Confirm password'
            placeholderTextColor="#bcc1ca"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

          {/* Trường nhập Avatar */}
          <Text style={styles.signUpEmail}>Avatar URL</Text>
          <TextInput
            style={styles.signUpEmailInput}
            placeholder='Enter avatar URL'
            placeholderTextColor="#bcc1ca"
            value={avatar}
            onChangeText={setAvatar}
          />
          {avatarError ? <Text style={styles.errorText}>{avatarError}</Text> : null}

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signIn}>
          <Text style={styles.signInText}>
            Already have an account?
            <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
              <Text style={styles.signInLink}> Sign in</Text>
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
              onPress={handleModalOk} // Gọi hàm xử lý điều hướng
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
  signUp: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  signUpForm: {
    marginBottom: 30,
  },
  signUpEmail: {
    fontSize: 16,
    fontWeight: '700',
    color: '#424955',
    marginBottom: 10,
  },
  signUpEmailInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    height: 43,
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  signUpPassword: {
    fontSize: 16,
    fontWeight: '700',
    color: '#424955',
    marginBottom: 10,
  },
  signUpConfirmPassword: {
    fontSize: 16,
    fontWeight: '700',
    color: '#424955',
    marginBottom: 10,
  },
  signUpPasswordInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    height: 43,
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  signUpButton: {
    backgroundColor: '#535ce8',
    borderRadius: 26,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  signIn: {
    marginTop: 20,
    alignItems: 'center',
  },
  signInText: {
    fontSize: 16,
    color: '#171a1f',
  },
  signInLink: {
    fontWeight: '700',
    color: '#535ce8',
  },
  errorText: {
    color: 'red',
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
  },
});

export default SignUpScreen;

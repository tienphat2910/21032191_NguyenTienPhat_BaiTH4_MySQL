import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(60);
  const [step, setStep] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateOTP = (otp) => /^\d{6}$/.test(otp);
  const validatePassword = (password) => password.length >= 6;

  const handleSendOTP = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    setMessage('An OTP has been sent to your email.');
    setIsTimerActive(true);
    setTimer(60);
    setStep(1);
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleVerifyOTP = () => {
    if (!validateOTP(otp)) {
      setMessage('Please enter a valid 6-digit OTP.');
      return;
    }
    setMessage('OTP verified. Please set your new password.');
    setStep(2);
  };

  const handleContinue = () => {
    if (step === 2) {
      if (!validatePassword(newPassword)) {
        setPasswordError('Password must be at least 6 characters long.');
        return;
      }

      if (newPassword !== confirmPassword) {
        setPasswordError('Passwords do not match.');
        return;
      }

      // Gọi API để cập nhật mật khẩu
      fetch('http://localhost:3000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setIsModalVisible(true);
          } else {
            setMessage(data.message);
          }
        })
        .catch(err => setMessage('An error occurred. Please try again.'));
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigation.navigate('SignInScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.description}>Enter your email address to receive the OTP.</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter email"
        placeholderTextColor="#bcc1ca"
        value={email}
        onChangeText={setEmail}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      {step === 1 && (
        <>
          {isTimerActive && (
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#bcc1ca"
              value={otp}
              onChangeText={setOtp}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={isTimerActive ? handleVerifyOTP : handleSendOTP}>
            <Text style={styles.buttonText}>{isTimerActive ? 'Verify OTP' : 'Send OTP'}</Text>
          </TouchableOpacity>
          {isTimerActive && <Text>Resend OTP in {timer} seconds</Text>}
        </>
      )}

      {step === 2 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#bcc1ca"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
            <Text>{showNewPassword ? 'Hide' : 'Show'} Password</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#bcc1ca"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text>{showConfirmPassword ? 'Hide' : 'Show'} Password</Text>
          </TouchableOpacity>
          {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}

      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Password reset successfully!</Text>
            <TouchableOpacity style={styles.button} onPress={handleModalOk}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {message && <Text style={styles.messageText}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    marginVertical: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  messageText: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ForgotPasswordScreen;

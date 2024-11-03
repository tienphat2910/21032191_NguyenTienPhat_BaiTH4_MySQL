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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateOTP = (otp) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

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
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
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

      setIsModalVisible(true);
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
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {step === 1 && (
        <>
          {isTimerActive ? (
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#bcc1ca"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              maxLength={6}
            />
          ) : null}
          <TouchableOpacity
            style={[styles.button, { opacity: isTimerActive ? 0.5 : 1 }]}
            onPress={handleSendOTP}
            disabled={isTimerActive}
          >
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
          {isTimerActive && <Text style={styles.timerText}>Resend OTP in {timer}s</Text>}
          {message ? <Text style={styles.messageText}>{message}</Text> : null}
          {isTimerActive && (
            <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#bcc1ca"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.iconToggle}>
              <Image
                source={showNewPassword ? require('../assets/icons/opened_eye.png') : require('../assets/icons/closed_eye.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#bcc1ca"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          {message ? <Text style={styles.messageText}>{message}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backLink}>Back to Sign In</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>Password reset successfully!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalOk}>
              <Text style={styles.buttonText}>OK</Text>
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
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#6e7787',
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    height: 43,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  passwordContainer: {
    position: 'relative', // Đảm bảo icon nằm đúng vị trí
  },
  button: {
    backgroundColor: '#535ce8',
    borderRadius: 26,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  backLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#535ce8',
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  timerText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6e7787',
  },
  messageText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#535ce8',
    borderRadius: 26,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  iconToggle: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 24,
    width: 24,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ForgotPasswordScreen;

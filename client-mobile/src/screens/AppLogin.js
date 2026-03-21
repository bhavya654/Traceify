import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Dimensions, 
  Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');

const AppLogin = ({ navigation }) => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleKeyPress = (val) => {
    if (step === 'phone') {
      if (val === 'delete') {
        setPhoneNumber(prev => prev.slice(0, -1));
      } else {
        if (phoneNumber.length < 10) {
          setPhoneNumber(prev => prev + val);
        }
      }
    } else if (step === 'otp') {
      if (val === 'delete') {
        setOtp(prev => prev.slice(0, -1));
      } else {
        if (otp.length < 4) {
          setOtp(prev => prev + val);
        }
      }
    }
  };

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 4) {
      // In a real app, verify OTP here.
      navigation.replace('AppDashboard');
    }
  };

  const formatPhoneNumber = (num) => {
    if (!num) return '000 000 0000';
    let formatted = num;
    if (num.length > 3) {
      formatted = num.slice(0, 3) + ' ' + num.slice(3);
    }
    if (num.length > 6) {
      formatted = formatted.slice(0, 7) + ' ' + formatted.slice(7);
    }
    return formatted;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header - Logo */}
        <View style={styles.header}>
          <Text style={styles.logoIcon}>🛡️</Text>
          <Text style={styles.logoText}>VELOCITY</Text>
          <View style={styles.helpIconContainer}>
            <Text style={styles.helpIcon}>?</Text>
          </View>
        </View>

        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.title}>Welcome to your</Text>
          <Text style={styles.titleHighlight}>digital vault.</Text>
          <Text style={styles.subtitle}>
            {step === 'phone' 
              ? "Enter your mobile number to securely access your accounts." 
              : `Enter the 4-digit code sent to +91 ${formatPhoneNumber(phoneNumber)}`}
          </Text>
        </View>

        {/* Card Section */}
        <View style={styles.card}>
          {step === 'phone' ? (
            <>
              <Text style={styles.inputLabel}>MOBILE NUMBER</Text>
              
              <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.countryCodePicker}>
                  <Text style={styles.countryCodeText}>+91</Text>
                  <Text style={styles.chevronIcon}>⌄</Text>
                </TouchableOpacity>
                
                <View style={styles.numberInput}>
                  <Text style={[styles.numberInputText, !phoneNumber && styles.placeholderText]}>
                    {formatPhoneNumber(phoneNumber)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.button, phoneNumber.length === 10 ? styles.buttonActive : styles.buttonInactive]} 
                onPress={handleSendOTP}
                disabled={phoneNumber.length !== 10}
              >
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.inputLabel}>VERIFICATION CODE (OTP)</Text>
              
              <View style={styles.otpContainer}>
                {[0, 1, 2, 3].map((index) => (
                  <View key={index} style={[styles.otpInputBox, otp.length === index && styles.otpInputBoxActive]}>
                    <Text style={styles.otpInputText}>{otp[index] || ''}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={[styles.button, otp.length === 4 ? styles.buttonActive : styles.buttonInactive]} 
                onPress={handleVerifyOTP}
                disabled={otp.length !== 4}
              >
                <Text style={styles.buttonText}>Verify & Login</Text>
              </TouchableOpacity>

              <View style={styles.resendContainer}>
                <Text style={styles.signupText}>Didn't receive code? </Text>
                <TouchableOpacity onPress={() => { setOtp(''); setStep('phone'); }}>
                  <Text style={styles.signupLinkText}>Change Number</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 'phone' && (
            <>
              <TouchableOpacity style={styles.secondaryLink}>
                <Text style={styles.secondaryLinkText}>Login with Email or ID</Text>
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('AppSignup')}>
                  <Text style={styles.signupLinkText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* Security Badge */}
        <View style={styles.securityBadge}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>BANK-LEVEL SECURITY</Text>
        </View>

        {/* Custom Keypad */}
        <View style={styles.keypadContainer}>
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['', '0', 'delete']
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keypadRow}>
              {row.map((key) => {
                if (key === '') {
                  return <View key={`empty-${rowIndex}`} style={styles.keypadButton} />;
                }
                if (key === 'delete') {
                  return (
                    <TouchableOpacity 
                      key={key} 
                      style={styles.keypadButton} 
                      onPress={() => handleKeyPress('delete')}
                    >
                      <View style={styles.deleteIconBox}>
                        <Text style={styles.deleteIconText}>⌫</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
                // Determine letters
                const lettersMap = {
                  '2': 'ABC', '3': 'DEF',
                  '4': 'GHI', '5': 'JKL', '6': 'MNO',
                  '7': 'PQRS', '8': 'TUV', '9': 'WXYZ'
                };
                
                return (
                  <TouchableOpacity 
                    key={key} 
                    style={styles.keypadButton} 
                    onPress={() => handleKeyPress(key)}
                  >
                    <Text style={styles.keypadNumber}>{key}</Text>
                    {lettersMap[key] && (
                      <Text style={styles.keypadLetters}>{lettersMap[key]}</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FB', // Light snowy grey background based on image
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: Platform.OS === 'android' ? 24 : 0,
  },
  logoIcon: {
    fontSize: 20,
    color: '#0052CC',
    marginRight: 6,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0052CC',
    letterSpacing: 1,
  },
  helpIconContainer: {
    marginLeft: 'auto',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E5EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIcon: {
    fontSize: 14,
    color: '#5B6876',
    fontWeight: 'bold',
  },
  greetingSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  titleHighlight: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0052CC', // Vibrant blue for emphasis
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#5B6876',
    lineHeight: 24,
    paddingRight: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8A94A6',
    letterSpacing: 1,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  countryCodePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F5F8',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginRight: 12,
  },
  countryCodeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 8,
  },
  chevronIcon: {
    fontSize: 14,
    color: '#5B6876',
    marginTop: -4, // Adjust for visual alignment
  },
  numberInput: {
    flex: 1,
    backgroundColor: '#F3F5F8',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: 'center',
  },
  numberInputText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: 1,
  },
  placeholderText: {
    color: '#B0B8C1',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInputBox: {
    width: 60,
    height: 60,
    backgroundColor: '#F3F5F8',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  otpInputBoxActive: {
    borderColor: '#3525CD',
    backgroundColor: '#FFF',
  },
  otpInputText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonActive: {
    backgroundColor: '#3525CD', // Using the primary blue from the dashboard
  },
  buttonInactive: {
    backgroundColor: '#A09DCC', // Lighter purple/blue when disabled
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryLink: {
    alignItems: 'center',
  },
  secondaryLinkText: {
    color: '#0052CC',
    fontSize: 14,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#5B6876',
    fontSize: 14,
  },
  signupLinkText: {
    color: '#0052CC',
    fontSize: 14,
    fontWeight: '700',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: "auto",
  },
  securityIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  securityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D7F41', // Dark green color matching image
    letterSpacing: 0.5,
  },
  keypadContainer: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 40,
    marginTop: 20,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  keypadButton: {
    width: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  keypadNumber: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  keypadLetters: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8A94A6',
    marginTop: 2,
    letterSpacing: 1,
  },
  deleteIconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIconText: {
    fontSize: 24,
    color: '#1A1A1A',
  }
});

export default AppLogin;

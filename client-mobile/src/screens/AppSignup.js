import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Dimensions, 
  Platform,
  TextInput
} from 'react-native';

const { width, height } = Dimensions.get('window');

const AppSignup = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const handleKeyPress = (val) => {
    if (val === 'delete') {
      setPhoneNumber(prev => prev.slice(0, -1));
    } else {
      if (phoneNumber.length < 10) {
        setPhoneNumber(prev => prev + val);
      }
    }
  };

  const handleSignup = () => {
    // Navigate straight to Dashboard on successful signup
    navigation.replace('AppDashboard');
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
          <Text style={styles.title}>Create your</Text>
          <Text style={styles.titleHighlight}>digital vault.</Text>
          <Text style={styles.subtitle}>
            Enter your details to create a secure account.
          </Text>
        </View>

        {/* Card Section */}
        <View style={styles.card}>
          <Text style={styles.inputLabel}>FULL NAME</Text>
          
          <View style={[styles.inputContainer, { marginBottom: 16 }]}>
            <View style={styles.textInputFull}>
              <TextInput 
                style={styles.textInput}
                placeholder="Enter your name"
                placeholderTextColor="#B0B8C1"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

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
            style={[styles.button, (phoneNumber.length === 10 && name.length > 0) ? styles.buttonActive : styles.buttonInactive]} 
            onPress={handleSignup}
            disabled={phoneNumber.length !== 10 || name.length === 0}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('AppLogin')}>
              <Text style={styles.loginLinkText}>Login</Text>
            </TouchableOpacity>
          </View>
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
                  return <View key="empty" style={styles.keypadButton} />;
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
    backgroundColor: '#F7F9FB', // Light snowy grey background
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
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  titleHighlight: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0052CC', // Vibrant blue for emphasis
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#5B6876',
    lineHeight: 20,
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
    marginBottom: 10,
    flexShrink: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8A94A6',
    letterSpacing: 1,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInputFull: {
    flex: 1,
    backgroundColor: '#F3F5F8',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: 1,
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
  button: {
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 16,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#5B6876',
    fontSize: 14,
  },
  loginLinkText: {
    color: '#0052CC',
    fontSize: 14,
    fontWeight: '700',
  },
  keypadContainer: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 40,
    marginTop: 10,
    flexShrink: 0,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  keypadButton: {
    width: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
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

export default AppSignup;

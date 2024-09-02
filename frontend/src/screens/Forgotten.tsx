import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type NavigationProps = NavigationProp<RootStackParamList, 'Forgotten'>;

const Forgotten: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();

  // State to track input fields
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Adresa de email nu este validă');
    } else {
      setEmailError('');
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#00796B', '#004D40', '#00251A']}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Lock Image */}
        <Image source={require('../../assets/images/logo.png')} style={styles.lockIcon} />

        {/* Instruction Section */}
        <Text style={styles.headerText}>Recuperare cont</Text>
        <Text style={styles.subText}>
          Vă rugăm să vă introduceți mai jos email-ul pentru a vă putea recupera contul. 
        </Text>

        {/* Email Input */}
        <TextInput
          label="Email"
          mode="outlined"
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          onBlur={() => validateEmail(email)}
          outlineColor='#00796B'
          activeOutlineColor='#00251A'
          error={!!emailError}  // Show error state
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Submit Button */}
        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={() => {
            // Navigate to GetAccountMessage screen
            navigation.navigate('GetAccountMessage');
          }}
        >
          Trimite-ți
        </Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#FFFFFF', // White background for the form
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 4, // Add some shadow for better UI
  },
  lockIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#00796B',
    borderRadius: 5,
  },
  errorText: {
    color: '#e91e63',
    marginBottom: 15,
  },
});

export default Forgotten;

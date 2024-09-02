import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type NavigationProps = NavigationProp<RootStackParamList, 'OTPExplanations'>;

const OTPExplanations: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();

  // State for input fields
  const [otpCode, setOtpCode] = useState('');
  const [deviceName, setDeviceName] = useState('');

  // Handle OTP link press
  const handleOTPPress = () => {
    Linking.openURL('https://freeotp.github.io/'); // Replace with your actual URL
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#00796B', '#004D40', '#00251A']}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          {/* Logo Image */}
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

          {/* Instruction Section */}
          <View style={styles.instructionContainer}>
            <Text style={styles.welcomeText}>Folosim FreeOTP!</Text>
            <Text style={styles.subText}>
                Din dorința de a crea un mediu mai sigur, am daugat un start în plus de strat de securitate pentru conturile dvs. Astfel, de fiecare dată când va trebui să realizați o acțiune sensibilă, vi se va cere să va confirmați identiatea 
            </Text>

            <Text style={styles.instructionText} onPress={handleOTPPress}>
              1. Instalați FreeOTP pe telefonul dvs.
            </Text>
            <Text style={styles.instructionText} onPress={handleOTPPress}>
              2. Deschideți aplicația și introduceți cheia de autentificare de mai jos:
            </Text>
            <Text selectable style={styles.keyText}>
              AAAA BBBB CCCC DDDD EEEE FFFF GGGG HHHH
            </Text>
            <Text style={styles.instructionText}>
              3. Folosiți următoarele valori de configurare dacă aplicația vă permite:
            </Text>
            <Text selectable style={styles.listItemText}>- Tip: Time-based</Text>
            <Text selectable style={styles.listItemText}>- Algoritm: SHA1</Text>
            <Text selectable style={styles.listItemText}>- Cifre: 6</Text>
            <Text selectable style={styles.listItemText}>- Interval: 30</Text>
            <Text style={styles.instructionText}>
              4. Introduceți codul unic generat de aplicație și apăsați Salvează pentru a finaliza configurarea. Introduceți și un nume pentru dispozitiv pentru a vă ajuta să vă gestionați toate dispozitivele OTP.
            </Text>
          </View>

          {/* OTP and Device Name Inputs */}
          <TextInput
            label="One-time code"
            mode="outlined"
            style={[styles.input, styles.fullWidthInput]}
            value={otpCode}
            left={<TextInput.Icon icon="lock-outline" />}
            onChangeText={setOtpCode}
            outlineColor='#00796B'
            activeOutlineColor='#00251A'
          />

          <TextInput
            label="Device Name"
            mode="outlined"
            style={[styles.input, styles.fullWidthInput]}
            value={deviceName}
            left={<TextInput.Icon icon="phone-outline" />}
            onChangeText={setDeviceName}
            outlineColor='#00796B'
            activeOutlineColor='#00251A'
          />

          {/* Submit Button */}
          <Button
            mode="contained"
            style={[styles.submitButton, styles.fullWidthInput]}
            onPress={() => {
              console.log('Submit pressed');
              // Handle submit logic here
            }}
          >
            Salvează
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    padding: 20,
  },
  innerContainer: {
    width: '85%',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  instructionContainer: {
    marginBottom: 15,
    width: '100%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    marginBottom: 5,
  },
  keyText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    marginBottom: 15,
  },
  fullWidthInput: {
    width: '100%', // Ensure all inputs and button are full width
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#00796B',
  },
});

export default OTPExplanations;

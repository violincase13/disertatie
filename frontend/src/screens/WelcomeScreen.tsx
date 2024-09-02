import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';  // Ensure this import is correct.

type NavigationProps = NavigationProp<RootStackParamList, 'WelcomeScreen'>;

const WelcomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();

  // State to track focus for each TextInput
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#00796B', '#004D40', '#00251A']}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Logo Image */}
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

        {/* Form Section */}
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Bine ați venit!</Text>
          <Text style={styles.subText}>
            Aplicația noastră folosește TOTP pentru autentificare.
          </Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('OTPExplanations')}>
              <Text style={styles.leftText}>Aflați mai multe aici!</Text>
            </TouchableOpacity>
          </View>

          {/* Username Input */}
          <TextInput
            label="Username"
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account-outline" />}
            outlineColor='#00796B'
            activeOutlineColor='#00251A'
            onFocus={() => setIsUsernameFocused(true)}
            onBlur={() => setIsUsernameFocused(false)}
          />

          {/* Password Input */}
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock-outline" />}
            outlineColor='#00796B'
            activeOutlineColor='#00251A'
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />

          <View style={styles.optionsContainer}>
            <View style={styles.centerContainer}>
              <Text style={styles.rightText}>V-ați uitat username-ul/parola?</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Forgotten')}>
              <Text style={styles.leftText}>Click aici!</Text>
            </TouchableOpacity>
          </View>

          <Button mode="contained" style={styles.loginButton}>
            Autentificare
          </Button>

          <View style={styles.optionsContainer}>
            <View style={styles.centerContainer}>
              <Text style={styles.rightText}>Nu aveți deja un cont? </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.leftText}>Înregistrați-vă!</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  formContainer: {
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
  registerText: {
    color: '#e91e63',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    color: '#555',
  },
  leftText: {
    color: '#e91e63',
    fontWeight: 'bold',
  },
  loginButton: {
    marginBottom: 20,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#00796B',
  },
});

export default WelcomeScreen;

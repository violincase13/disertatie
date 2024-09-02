import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { TextInput, Button, Text, Checkbox, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type NavigationProps = NavigationProp<RootStackParamList, 'SignupScreen'>;

const SignupScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();

  // State to track input fields
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Separate states for each checkbox
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isNotificationsChecked, setIsNotificationsChecked] = useState(false);

  // More robust email validation regex
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Adresa de email introdusă nu este validă');
    } else {
      setEmailError('');
    }
  };

  // Password match validation
  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setPasswordError('Parolele nu corespund');
    } else {
      setPasswordError('');
    }
  };

  // Handle Terms and Conditions link press
  const handleTermsPress = () => {
    Linking.openURL('https://www.example.com/terms'); // Replace with your actual terms URL
  };

  // Function to handle user registration
  const handleSignup = async () => {
    try {
      const response = await fetch('http://auth-service-env-2.eba-e9cekxp3.eu-central-1.elasticbeanstalk.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Verificați-vă emailul', 'V-am trimis un link de confirmare pe email. Vă rugăm să-l accesați pentru a vă confirma contul.');
        // Navigați către dashboard sau orice altă acțiune doriți să faceți după înregistrare
        navigation.navigate('WelcomeScreen');
      } else {
        Alert.alert('Eroare la înregistrare', data.message || 'A apărut o eroare. Vă rugăm să încercați din nou.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Eroare', 'A apărut o eroare. Vă rugăm să încercați din nou.');
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#00796B', '#004D40', '#00251A']}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Creați-vă un cont!</Text>
            <Text style={styles.subText}>
              Înregistrați-vă pentru a fi mai aproape de noi.
            </Text>

            <TextInput
              label="Username"
              mode="outlined"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              left={<TextInput.Icon icon="account-outline" />}
              outlineColor='#00796B'
              activeOutlineColor='#00251A'
            />

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
              left={<TextInput.Icon icon="email-outline" />}
              outlineColor='#00796B'
              activeOutlineColor='#00251A'
              error={!!emailError}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextInput
              label="Parola"
              mode="outlined"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                validatePasswordMatch(text, confirmPassword);
              }}
              onBlur={() => validatePasswordMatch(password, confirmPassword)}
              left={<TextInput.Icon icon="lock-outline" />}
              outlineColor='#00796B'
              activeOutlineColor='#00251A'
            />

            <TextInput
              label="Confirmă Parola"
              mode="outlined"
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                validatePasswordMatch(password, text);
              }}
              onBlur={() => validatePasswordMatch(password, confirmPassword)}
              left={<TextInput.Icon icon="lock-outline" />}
              outlineColor='#00796B'
              activeOutlineColor='#00251A'
              error={!!passwordError}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isTermsChecked ? 'checked' : 'unchecked'}
                onPress={() => setIsTermsChecked(!isTermsChecked)}
                color='#00796B'
              />
              <Text style={styles.checkboxText}>
                Sunt de acord cu{' '}
                <Text style={styles.termsText} onPress={handleTermsPress}>
                  termenii și condițiile
                </Text>
              </Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isNotificationsChecked ? 'checked' : 'unchecked'}
                onPress={() => setIsNotificationsChecked(!isNotificationsChecked)}
                color='#00796B'
              />
              <Text style={styles.checkboxText}>
                Sunt de acord să primesc notificări pe telefon
              </Text>
            </View>

            <Button
              mode="contained"
              style={styles.signupButton}
              disabled={!isTermsChecked || !isNotificationsChecked || !!emailError || !!passwordError || !email || !username || !password || !confirmPassword}
              onPress={handleSignup}
            >
              Înregistrați-vă
            </Button>

            <View style={styles.optionsContainer}>
              <View style={styles.centerContainer}>
                <Text style={styles.rightText}>Aveți deja un cont? </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')}>
                <Text style={styles.leftText}>Autentificați-vă</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};;

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
  input: {
    width: '100%',  // Ensure input fields occupy the full width of the form container
    marginBottom: 15,
  },
  checkboxContainer: {
    width: '100%', // Make sure the checkboxes container is also aligned and takes full width
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  checkboxText: {
    flex: 1,
    color: '#333',
  },
  termsText: {
    fontWeight: 'bold',
    color: '#00796B',
  },
  signupButton: {
    width: '100%',  // Ensure the button also occupies the full width of the form container
    marginBottom: 20,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#00796B',
  },
  optionsContainer: {
    width: '100%',
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
  errorText: {
    color: '#e91e63',
    marginBottom: 15,
  },
});

export default SignupScreen;

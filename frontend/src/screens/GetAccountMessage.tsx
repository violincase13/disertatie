import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type NavigationProps = NavigationProp<RootStackParamList, 'GetAccountMessage'>;

const GetAccountMessage: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <LinearGradient
      colors={['#FFFFFF', '#00796B', '#004D40', '#00251A']}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Logo Image */}
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

        {/* Confirmation Message */}
        <Text style={styles.headerText}>Datele dvs v-au fost trimise pe e-mail</Text>
        <Text style={styles.subText}>
          Verificați inbox-ul pentru a urma instrucțiunile de resetare a parolei.
        </Text>

        {/* Back to Login Button */}
        <Button
          mode="contained"
          style={styles.backButton}
          onPress={() => navigation.navigate('WelcomeScreen')}
        >
          Înapoi la Home
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
  },
  logo: {
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
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#00796B',
    borderRadius: 5,
  },
});

export default GetAccountMessage;

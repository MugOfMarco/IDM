import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, Platform, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // --- LÓGICA (Sin cambios) ---
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBmi = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      Alert.alert("Atención", "Por favor, ingresa valores válidos para peso y altura.");
      return;
    }

    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);

    setBmi(bmiValue.toFixed(1));
    setCategory(getBmiCategory(bmiValue));

    Keyboard.dismiss();
  };

  const getBmiCategory = (bmiValue) => {
    if (bmiValue < 18.5) return "Bajo peso";
    if (bmiValue < 24.9) return "Peso saludable";
    if (bmiValue < 29.9) return "Sobrepeso";
    return "Obesidad";
  };

  // --- RENDERIZADO ---
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar style="dark" />

        {/* LOGO */}
        <Image
          source={require('./assets/logo.jpg')}
          style={styles.logo}
        />

        <Text style={styles.title}>Índice de Masa Corporal</Text>
        <Text style={styles.subtitle}>CALCULADORA</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>PESO (KG)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.0"
              placeholderTextColor="#8d6e63"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
          
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>ALTURA (CM)</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#8d6e63"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={calculateBmi} activeOpacity={0.8}>
          <Text style={styles.buttonText}>CALCULAR RESULTADO</Text>
        </TouchableOpacity>

        {bmi && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>RESULTADO FINAL</Text>
            <View style={styles.divider} />
            <Text style={styles.resultBmiValue}>{bmi}</Text>
            
            <View style={[
              styles.categoryBadge,
              category === "Bajo peso" && styles.bgBajo,
              category === "Peso saludable" && styles.bgSaludable,
              category === "Sobrepeso" && styles.bgSobrepeso,
              category === "Obesidad" && styles.bgObesidad
            ]}>
              <Text style={styles.resultCategoryText}>
                {category}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

// --- ESTILOS DISEÑO EDITORIAL ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFbf7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 3,
    color: '#7f8c8d',
    marginBottom: 30,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 5,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#fff',
    height: 60,
    borderColor: '#5D4037',
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 15,
    fontSize: 24,
    color: '#3E2723',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  button: {
    backgroundColor: '#2c3e50',
    paddingVertical: 18,
    width: '100%',
    borderRadius: 0,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#1a252f',
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 5,
  },
  buttonText: {
    color: '#FDFbf7',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  resultContainer: {
    marginTop: 40,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2c3e50',
    padding: 25,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 4,
  },
  resultLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    width: '30%',
    backgroundColor: '#bdc3c7',
    marginVertical: 10,
  },
  resultBmiValue: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 5,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  categoryBadge: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 20,
  },
  resultCategoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    letterSpacing: 1,
  },
  bgBajo: { backgroundColor: '#3498db' },
  bgSaludable: { backgroundColor: '#27ae60' },
  bgSobrepeso: { backgroundColor: '#f39c12' },
  bgObesidad: { backgroundColor: '#c0392b' },
});
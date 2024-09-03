import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useHistory } from './HistoryContext';

export default function CalculatorScreen({ navigation }) {
    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [result, setResult] = useState(null);
    const { history, setHistory } = useHistory();

    const handlePlus = () => {
        const sum = parseFloat(firstNumber) + parseFloat(secondNumber);
        if (!isNaN(sum)) {
            setResult(sum);
            addToHistory(`${firstNumber} + ${secondNumber} = ${sum}`);
        }
    };

    const handleMinus = () => {
        const difference = parseFloat(firstNumber) - parseFloat(secondNumber);
        if (!isNaN(difference)) {
            setResult(difference);
            addToHistory(`${firstNumber} - ${secondNumber} = ${difference}`);
        }
    };

    const addToHistory = (calculation) => {
        setHistory([{ key: Math.random().toString(), calculation }, ...history]);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.innerContainer}>
                        {result !== null && (
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultText}>Result: {result}</Text>
                            </View>
                        )}
                        <View style={styles.calculatorContainer}>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={firstNumber}
                                onChangeText={setFirstNumber}
                                placeholder="First number"
                            />
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={secondNumber}
                                onChangeText={setSecondNumber}
                                placeholder="Second number"
                            />
                            <View style={styles.buttonContainer}>
                                <Pressable
                                    style={styles.button}
                                    onPress={handlePlus}
                                    android_ripple={{ color: '#ddd' }}
                                >
                                    <Text style={styles.buttonText}>+</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.button}
                                    onPress={handleMinus}
                                    android_ripple={{ color: '#ddd' }}
                                >
                                    <Text style={styles.buttonText}>-</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.historyButton]}
                                    onPress={() => navigation.navigate('History')}
                                    android_ripple={{ color: '#ddd' }}
                                >
                                    <Text style={styles.buttonText}>History</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    resultContainer: {
        position: 'absolute',
        top: 100,
        width: '100%',
        alignItems: 'center',
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    calculatorContainer: {
        width: '80%',
        alignItems: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 18,
        borderRadius: 5,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '80%',
    },
    button: {
        backgroundColor: '#ff66b2',
        padding: 15,
        borderRadius: 5,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    historyButton: {
        backgroundColor: '#4CAF50',
        width: 100,
    },
});

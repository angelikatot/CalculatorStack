import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useHistory } from './HistoryContext'; //väliaikainen muisti

export default function HistoryScreen() {
    const { history } = useHistory();

    return (
        <View style={styles.container}>
            <Text style={styles.historyTitle}>History</Text>
            {history.length > 0 ? (
                <FlatList
                    data={history}
                    renderItem={({ item }) => (
                        <Text style={styles.historyItem}>{item.calculation}</Text>
                    )}
                    keyExtractor={(item) => item.key}
                />
            ) : (
                <Text style={styles.noHistoryText}>No history </Text> //jos lista tyhjä
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    historyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    noHistoryText: {
        fontSize: 18,
        color: '#888',
    },
    historyItem: {
        fontSize: 18,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        textAlign: 'center',
    },
});

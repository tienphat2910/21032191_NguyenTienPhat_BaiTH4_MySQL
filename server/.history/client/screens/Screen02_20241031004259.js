import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Modal, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';

const Screen02 = ({ route, navigation }) => {
    const { name, avatar, email, password } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    const handleSignOut = () => {
        setModalVisible(false);
        navigation.navigate('Screen01');
    };

    const handleHomePress = () => {
        console.log("Navigating to Screen01");
        navigation.navigate('Screen01');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <Text style={styles.name}>{name}</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.info}>Email: {email}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.info}>Password: {password.replace(/./g, '•')}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Quay lại" onPress={() => navigation.goBack()} />
                    <Button title="Sign Out" onPress={() => setModalVisible(true)} />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem} onPress={handleHomePress}>
                    <Image source={require('../assets/data/homeicon.png')} style={styles.footerIcon} resizeMode="cover" />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                {/* Các mục footer khác */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    inputContainer: {
        width: '100%',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    footer: {
        backgroundColor: '#5958b2',
        height: 90,
        paddingHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerItem: {
        alignItems: 'center',
    },
    footerIcon: {
        width: 30,
        height: 30,
    },
    footerText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 3,
    },
});

export default Screen02;

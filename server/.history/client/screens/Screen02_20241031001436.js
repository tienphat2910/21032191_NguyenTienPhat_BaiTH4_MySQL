import { StyleSheet, Text, View, Image } from 'react-native';

const Screen02 = ({ route }) => {
    const { name, avatar } = route.params; // Nhận dữ liệu từ params

    return (
        <View style={styles.container}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <Text style={styles.name}>{name}</Text>
            {/* Thêm các thông tin khác nếu cần */}
        </View>
    );
}

export default Screen02;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
});

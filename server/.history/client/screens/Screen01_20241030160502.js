import { StyleSheet, Text, View, ScrollView, Image, TextInput, FlatList } from 'react-native'
import { useState, useEffect } from 'react'

const Screen01 = () => {
    const [category, setCategory] = useState([]);
    const [location, setLocation] = useState([]);

    // const category = [
    //   {name: 'Resort', image: require('../assets/data/resort.png')},
    //   {name: 'Homestay', image: require('../assets/data/homestay.png')},
    //   {name: 'Hotel', image: require('../assets/data/hotel.png')},
    //   {name: 'Lodge', image: require('../assets/data/lodge.png')},
    //   {name: 'Villa', image: require('../assets/data/villa.png')},
    //   {name: 'Apartment', image: require('../assets/data/apartment.png')},
    //   {name: 'Hostel', image: require('../assets/data/hostel.png')},
    //   {name: 'See all', image: require('../assets/data/seeall.png')},
    // ];
    // const location = [
    //   {image: require('../assets/data/photo1.png')},
    //   {image: require('../assets/data/photo2.png')},
    //   {image: require('../assets/data/photo3.png')},
    //   {image: require('../assets/data/photo4.png')},
    //   {image: require('../assets/data/photo5.png')},
    //   {image: require('../assets/data/photo5.png')},
    // ];
    const footer = [
        { image: require('../assets/data/homeicon.png'), name: 'Home' },
        { image: require('../assets/data/exploreicon.png'), name: 'Explore' },
        { image: require('../assets/data/searchicon.png'), name: 'Search' },
        { image: require('../assets/data/profileicon.png'), name: 'Profile' },
    ];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch('https://671c7d512c842d92c383026f.mockapi.io/TH/v1/categories');
                const data = await respone.json();
                setCategory(data);

                const respone1 = await fetch('https://671c7d512c842d92c383026f.mockapi.io/TH/v1/location');
                const data1 = await respone1.json();
                setLocation(data1);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Image source={require('../assets/data/logoicon.png')}
                        style={styles.logoIcon} resizeMode="contain" />
                    <View style={styles.searchContainer}>
                        <TextInput placeholder="Search here ..."
                            style={{ flex: 1, height: '100%', outline: 'none' }}
                            placeholderTextColor='#D3D3D3' />
                        <Image source={require('../assets/data/findicon.png')}
                            style={styles.searchIcon} resizeMode="contain" />
                    </View>
                </View>
                <View style={styles.welcomeContainer}>
                    <Image source={require('../assets/data/personicon.png')}
                        style={styles.personIcon} resizeMode="cover" />
                    <View style={styles.welcomeTextContainer}>
                        <Text style={styles.welcomeText}>Welcome!</Text>
                        <Text style={styles.nameText}>Donna Stroupe</Text>
                    </View>
                    <Image source={require('../assets/data/ringicon.png')}
                        style={{ width: 40, marginLeft: 'auto' }} resizeMode="contain" />
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.categoryTitle}>
                    <Text style={styles.sectionTitle}>Category</Text>
                    <Image source={require('../assets/data/3gach.png')}
                        style={{ width: 30, }}
                        resizeMode="contain" />
                </View>
                <View style={styles.categoryList}>
                    {category.map((item, index) => (
                        <View style={styles.categoryItem}>
                            <Image source={{ uri: item.image }}
                                style={styles.categoryImage}
                                resizeMode="contain" />
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.locationTitle}>
                    <Text style={styles.sectionTitle}>Popular Destination</Text>
                    <Image source={require('../assets/data/3gach.png')}
                        style={{ width: 30, }}
                        resizeMode="contain" />
                </View>
                <FlatList data={location}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.locationList}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.image }}
                            style={styles.locationImage}
                            resizeMode="cover" />
                    )}
                />
                <View style={styles.locationTitle}>
                    <Text style={styles.sectionTitle}>Recommend</Text>
                    <Image source={require('../assets/data/3gach.png')}
                        style={{ width: 30, }}
                        resizeMode="contain" />
                </View>
                <FlatList data={location.slice(3, 5)}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.locationList}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.image }}
                            style={styles.recommendImage}
                            resizeMode="cover" />
                    )}
                />
            </View>
            <View style={styles.footer}>
                {footer.map((item, index) => (
                    <View key={index} style={styles.footerItem}>
                        <Image source={item.image}
                            style={styles.footerIcon}
                            resizeMode="cover" />
                        <Text style={styles.footerText}>{item.name}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default Screen01

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#5958b2',
        height: 150,
        paddingHorizontal: 40,
        justifyContent: 'center',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logoIcon: {
        width: 43,

    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 30,
        flex: 1
    },

    searchIcon: {
        width: 25,

    },

    welcomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    personIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 5,
    },
    welcomeTextContainer: {
        marginLeft: 10
    },
    welcomeText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    nameText: {
        fontSize: 13,
        color: '#fff',
    },
    content: {
        paddingHorizontal: 40,
        paddingBottom: 20,
    },
    categoryTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '500',
    },
    categoryList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15,
        marginTop: 20
    },
    categoryItem: {
        alignItems: 'center',
        width: '20%'
    },
    categoryImage: {
        width: 70,
        height: 70
    },
    categoryText: {
        fontSize: 12,
    },
    locationTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    locationList: {
        marginTop: 10,
    },
    locationImage: {
        width: 82,
        height: 90,
        borderRadius: 10,
        marginRight: 10,
    },
    recommendImage: {
        width: 130,
        height: 90,
        borderRadius: 10,
        marginRight: 10,
    },
    footer: {
        backgroundColor: '#5958b2',
        height: 90,
        paddingHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    footerItem: {
        alignItems: 'center'
    },
    footerIcon: {
        width: 30, height: 30
    },
    footerText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 3,
    }
})
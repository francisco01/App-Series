import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';

const SerieCard = ({ serie, isFirstColumn, onNavigate }) => (
    <TouchableOpacity 
        onPress={ onNavigate }
    style={[
        styles.container,
        isFirstColumn ? styles.firstColumn : styles.lastColumn
    ]}>
        <View style={styles.card}>
            {
                serie.img64
                    ?   <Image 
                            source={{
                                uri: `data:image/jpeg;base64,${serie.img64}`
                            }}
                            aspectRatio={1}
                            resizeMode="cover"
                        />
                    : null    
            }
            <View style={styles.cardTitleWrapper}>
                <Text style={styles.cardTitle}>{serie.title}</Text>
            </View>
         </View>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //width: '100%',
        padding: 5,
        height: Dimensions.get('window').width / 2,

        //borderWidth: 1,
        //borderColor: 'red',
       // flexGrow: 1,
        //flexBasis: 0,
        aspectRatio: 1,
        
    },
    card:{
        flex: 1,
        borderWidth: 1,
        //margin: 10,
        //flexGrow: 1,
        //flexBasis: 0,
        
    },
    cardTitle:{
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        //flexGrow: 1,
        //flexBasis: 0,
        alignItems: 'center',
    },
    cardTitleWrapper:{
        backgroundColor: 'black',
        height: 50,
        position: 'absolute',
        bottom: 0,
        opacity: .8,

        width: '100%',
        alignItems: 'center',
    },

    firstColumn: {
        paddingLeft: 10,

    },

    lastColumn: {
        paddingRight: 10,
    }
});

export default SerieCard;
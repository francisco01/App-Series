import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';

const AddSerieCard = ({ serie, isFirstColumn, onNavigate }) => (
    <TouchableOpacity 
        onPress={ onNavigate }
    style={[
        styles.container,
        isFirstColumn ? styles.firstColumn : styles.lastColumn
    ]}>
        <View style={styles.card}>
          
            <Text>teste</Text>
         </View>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        height: Dimensions.get('window').width / 2,
        aspectRatio: 1,
        
    },
    card:{
        borderWidth: 1,   
    },
    firstColumn: {
        paddingLeft: 10,

    },

    lastColumn: {
        paddingRight: 10,
    }
});

export default AddSerieCard;
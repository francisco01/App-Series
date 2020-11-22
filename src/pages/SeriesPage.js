import React from 'react';
import {View, Text, StyleSheet, FlatList } from 'react-native';
import SerieCard from '../components/serieCard';
import series from '../../series.json';


const isEven = number => number % 2 === 0;

const SeriesPage = props => (
    <View>
        <FlatList
            data={series}
            renderItem={({ item, index }) => (
                <View>
                   <SerieCard 
                    serie={item}
                    isFirstColumn={isEven(index)}
                   />
                </View>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
            ListHeaderComponent={props => <View style={styles.marginTop} />}
            ListFooterComponent={props => <View style={styles.marginBottom} />}
        />
    </View>
);

const styles = StyleSheet.create({
    marginTop:{
        paddingTop: 5,
    },
    marginBottom: {
        paddingBottom: 5,
    }
});

export default SeriesPage;
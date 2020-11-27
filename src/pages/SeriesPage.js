import React from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, } from 'react-native';
import SerieCard from '../components/serieCard';

import AddSerieCard from '../components/AddSerieCard';

import { connect } from 'react-redux';
import { watchSeries } from '../actions';


const isEven = number => number % 2 === 0;

class SeriesPage extends React.Component {

    componentDidMount(){ 
        this.props.watchSeries();
    }
    render() {
        const { series, navigation } = this.props;
        if(series === null){
            //console.log("series:", series);
            //return <ActivityIndicator/>;
            return <AddSerieCard 
                        isFirstColumn={true}
                        onNavigate={() => navigation.navigate('SerieForm')} 
                    />
        }
        return (
            <View>
                <FlatList
                    data={[...series, {isLast: true}]}
                    renderItem={({ item, index }) => (
                        item.isLast
                        ? <AddSerieCard 
                            isFirstColumn={isEven(index)}
                            onNavigate={() => navigation.navigate('SerieForm')} 
                        />
                        :<View>
                            <SerieCard 
                                serie={item}
                                isFirstColumn={isEven(index)}
                                onNavigate={() => navigation.navigate('SerieDetail',{ serie: item })}
                            />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    ListHeaderComponent={props => <View style={styles.marginTop} />}
                    ListFooterComponent={props => <View style={styles.marginBottom} />}
                />
             </View>
        )
    }
}

const styles = StyleSheet.create({
    marginTop:{
        paddingTop: 5,
    },
    marginBottom: {
        paddingBottom: 5,
    }
});

const mapStateToProps = state => {
    const { series } = state;
    if (series === null){
        return { series }
    }
    const keys = Object.keys(series);
    const seriesWithKeys = keys.map(id => {
        return { ...series[id], id } 
    })
    return { series: seriesWithKeys };
}

export default connect(mapStateToProps, { watchSeries })(SeriesPage);
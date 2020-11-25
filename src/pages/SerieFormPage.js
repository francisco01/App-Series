import React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TextInput, 
    Picker, 
    Slider, 
    Button, 
    ScrollView, 
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert,
} from 'react-native';

import { connect } from 'react-redux';
import FormRow from '../components/FormRow';
import { setField, saveSerie } from '../actions';


class SerieFormPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
        }
    }
    render(){
        const {
            serieForm, 
            setField, 
            saveSerie, 
            navigation
        } = this.props;

        return (
            <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
                <ScrollView>
                    <FormRow first>
                        <TextInput 
                            style={styles.input}
                            placeholder="Título"
                            value={serieForm.title}
                            onChangeText={value => setField('title', value )}
                        />
                    </FormRow>
                    <FormRow>
                        <TextInput 
                            style={styles.input}
                            placeholder="URL Image"
                            value={serieForm.img}
                            onChangeText={value => setField('img', value )}
                        />
                    </FormRow>
        
                    <FormRow>
                        <Picker
                            selectedValue={serieForm.gender}
                            onValueChange={ itemValue => setField('gender',itemValue)} >
                            <Picker.Item label="Ação" value="acao" />
                            <Picker.Item label="Comédia" value="comedia" />
                            <Picker.Item label="Romance" value="romance" />
                            <Picker.Item label="Terror" value="terror" />
                        </Picker>
                </FormRow>
                <FormRow>
                    <View style={styles.sameRow}>
                            <Text>Nota:</Text>
                            <Text>{serieForm.rate}</Text>
                    </View>
                    <Slider 
                        onValueChange={value => setField('rate', value)}
                        value={serieForm.rate}
                        minimumValue={0}
                        maximumValue={100}
                        step={5}
                    />
                </FormRow>
                <FormRow first>
                        <TextInput 
                            style={styles.input}
                            placeholder="Descrição"
                            value={serieForm.description}
                            onChangeText={value => setField('description', value )}
                            numberOfLines={5}
                            multiline={true}
                        />
                    </FormRow>
                    {
                        this.state.isLoading 
                            ? <ActivityIndicator />
                            : <Button 
                                title="Salvar"
                                onPress={ async () => {
                                    this.setState({isLoading: true});
                                    try{
                                        await saveSerie(serieForm);
                                        navigation.goBack();
                                    }catch(error){
                                        Alert.alert('Erro!', `Ocorreu eum erro - ${error.message}`);
                                    }finally{
                                        this.setState({isLoading: false});
                                    }
                                          
                            }} />
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}  

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    sameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    }
    
});

function mapStateToProps(state) {
    return {
        serieForm: state.serieForm
    }
}

const mapDispatchToProps ={
    setField,
    saveSerie
}


export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);
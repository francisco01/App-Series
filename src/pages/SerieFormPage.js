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
    Image,
} from 'react-native';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { connect } from 'react-redux';
import FormRow from '../components/FormRow';
import { setField, saveSerie, setWholeSerie, resetForm } from '../actions';


class SerieFormPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
        }
    }
    componentDidMount(){

        const { navigation, setWholeSerie, resetForm } = this.props;
        const { params } = navigation.state;
        if(params && params.serieToEdit){
            setWholeSerie(params.serieToEdit);
        } else{
            resetForm();
        }
        
    }
    async pickImage(){
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted'){
            Alert.alert('É necessário a permissão do acesso!');
            return;
        }
        const result  = await ImagePicker.launchImageLibraryAsync({
            quality: 0.2,
            base64: true,
            allowsEditing: true,
            aspect: [1, 1]
        });

        if (!result.cancelled){
            this.props.setField('img64', result.base64);
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
                        { serieForm.img64
                            ? <Image 
                                source={{
                                    uri: `data:image/jpeg;base64,${serieForm.img64}`
                                }}
                                style={styles.img} />
                            : null
                        }
                        <Button title="Selecione uma imagem"
                        onPress={() => this.pickImage()}/>
                    </FormRow>
        
                    <FormRow>
                        <Picker
                            selectedValue={serieForm.gender}
                            onValueChange={ itemValue => setField('gender',itemValue)} >
                            <Picker.Item label="Ação" value="Ação" />
                            <Picker.Item label="Comédia" value="Comédia" />
                            <Picker.Item label="Romance" value="Romance" />
                            <Picker.Item label="Terror" value="Terror" />
                            <Picker.Item label="Ficção cientifica" value="Ficção cientifica" />
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
    },
    img: {
        aspectRatio: 1,
        width: '100%',
    }
    
});

function mapStateToProps(state) {
    return {
        serieForm: state.serieForm
    }
}

const mapDispatchToProps ={
    setField,
    saveSerie,
    setWholeSerie,
    resetForm,
}


export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);
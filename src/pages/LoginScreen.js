import React from 'react';
import {View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import firebase from 'firebase';

import FormRow from '../components/FormRow';

import { connect } from 'react-redux';

import { tryLogin } from '../actions';

class LoginScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: '',
        }
    }

    componentDidMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyAMdB4Kp4k688q1OFmtSGDFZqbvzNAyUvw",
            authDomain: "series-f68f9.firebaseapp.com",
            databaseURL: "https://series-f68f9.firebaseio.com",
            projectId: "series-f68f9",
            storageBucket: "series-f68f9.appspot.com",
            messagingSenderId: "807219244567",
            appId: "1:807219244567:web:22cda4a138e71795693652"
        };
          // Initialize Firebase
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
         } 
    }

    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        });
    }

    tryLogin(){
        this.setState({isLoading: true, message: '' });
        const {mail, password} = this.state;

        this.props.tryLogin({ mail, password });
    }

    getMessageByErrorCode(errorCode) {
        switch(errorCode){
            case 'auth/wrong-password':
                return 'Senha incorreta!';
            case 'auth/user-not-found':
                return 'Usuário NÃO encontrado!';
            default:
                return 'Erro desconhecido!';    
        }
    }

    renderButton(){
        if (this.state.isLoading) {
            return <ActivityIndicator />;
        }
        return(
            <Button 
                title="Entrar"
                onPress={() => this.tryLogin()}
            />
        );
    }
    renderMessage(){
        const { message } = this.state;
        if (!message) {
            return null;
        }
        return(
            <View>
                <Text>{message}</Text>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.container}>
                <FormRow first>
                    <TextInput 
                        style={styles.input}
                        placeholder = "user@email.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput 
                        placeholder = "******"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>
                
                { this.renderButton() }
                { this.renderMessage() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
    }
});

export default connect(null, { tryLogin })(LoginScreen)
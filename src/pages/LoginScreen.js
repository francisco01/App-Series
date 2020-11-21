import React from 'react';
import {View, TextInput, StyleSheet } from 'react-native';

import FormRow from '../components/FormRow';

export default class LoginScreen extends React.Component {
    render(){
        return (
            <View>
                <FormRow>
                    <TextInput 
                        style={styles.input}
                        placeholder = "user@email.com"
                        />
                </FormRow>
                <FormRow>
                    <TextInput 
                        placeholder = "******"
                        secureTextEntry/>
                </FormRow>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
    }
})
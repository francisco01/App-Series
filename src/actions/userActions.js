import firebase from 'firebase';
import { Alert } from 'react-native';

export const USER_LOGIN_SUCESS = 'USER_LOGIN_SUCESS';
const userLoginSucess = user => ({
    type: USER_LOGIN_SUCESS,
    user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT,
});


export const tryLogin = ({ mail, password }) => dispatch => {

    return firebase
        .auth()
        .signInWithEmailAndPassword(mail, password)
        .then(user => {
            const action = userLoginSucess(user);
            dispatch(action);
            return user;
        })
        .catch(error => {
            if (error.code === 'auth/user-not-found'){
                return new Promise((resolve, reject) => {
                    Alert.alert(
                        'Usuário não encontrado',
                        'Deseja se cadastar?',
                        [{
                            text: 'Não',
                            onPress: () => resolve(),
                        }, {
                            text: 'Sim',
                            onPress: () => {
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(mail, password)
                                    .then(user => resolve(user))
                                    .catch(reject)
                            }
                        }],
                        { cancelable: false }    
                    )
                })
               
            }
            return Promise.reject(error);
        })
}


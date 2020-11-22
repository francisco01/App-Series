const USER_LOGIN = 'USER_LOGIN';
const userLogin = user => ({
    type: USER_LOGIN,
    user
});

const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT,
});


export const tryLogin = ({ mail, password }) => dispatch => {

    firebase
        .auth()
        .signInWithEmailAndPassword(mail, password)
        .then(loginUserSucess)
        .catch(error => {
            if (error.code === 'auth/user-not-found'){
                Alert.alert(
                    'Usuário não encontrado',
                    'Deseja se cadastar?',
                    [{
                        text: 'Não',
                    }, {
                        text: 'Sim',
                        onPress: () => {
                            firebase
                                .auth()
                                .createUserWithEmailAndPassword(mail, password)
                                .then(loginUserSucess)
                                .catch(loginUserFailed)
                        }
                    }],
                    { cancelable: false }    
                )
            } else{
                loginUserFailed(error);
            }
            
        })
        .then(() => this.setState({isLoading: false}));
}


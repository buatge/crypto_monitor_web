import request from '../../common/api/request';

export const login = (username, password) => {
    return request.post('/account/login', {username: username, password: password});
};
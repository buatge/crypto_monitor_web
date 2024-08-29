import request from '../../common/api/request';

export const startSpiderApi = () => {
    return request.post('/spider/start_spider');
};

export const isSpiderRunningApi = () => {
    return request.get('/spider/is_spider_running');
}
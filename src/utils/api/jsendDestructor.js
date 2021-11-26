import axios from 'axios';

class jsendDestructor {
    constructor(header) {
        this.header = header || {
            'Content-Type': 'application/json'
        }
    }

    async destructFromApi(url, method, payload) {
        let response = {}

        await axios({
            method: method,
            baseURL: process.env.REACT_APP_ENVIRONMENT === 'development'?'http://localhost:5000/v1':'Hosting URL',
            url: url,
            headers: this.header,
            data: payload
        })
        .then(res => response = res?.data)
        .catch(err => response = err.response.data)

        return response
    }
}

export default jsendDestructor;
var axios = require('axios');


axios.post("http://192.168.0.5:2000/nodejs/deploy")
    .then(function (response) {
        console.log(response.data);
    })


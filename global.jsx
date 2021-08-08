import axios from "axios"

axios.defaults.headers.common["X-Auth-Token"] = "brrijLkcofcJVlwt-Qmd2xM-TXU"
axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"
import axios from 'axios'
import credentials from '../credentials.js'
import * as hosts from '../hosts.config.js'

function getNewsFromNASA (callback) {
  axios.get(`https://api.nasa.gov/planetary/apod?api_key=${credentials.nasa_api_key}`)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}


getNewsFromNASA(function (data) {
    axios.post(`http://${hosts.default.host}:${hosts.default.port}/api/news`, {
        title: data.title,
        description: data.explanation,
        date: data.date,
        author_id: 1,
        image: data.url
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        if (error.response && error.response.data.code === "SQLITE_CONSTRAINT") {
            console.log("News already exists")
        } else {
            console.log(error)
        }
    })
})
const Axios = require('axios').default

const axios = Axios.create({
  baseURL: process.env.SUPPORT_BASE_URL,
})

export default axios

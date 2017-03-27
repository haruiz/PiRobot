const axios = require("axios");

module.exports = {
      getToken : async(apikey)=>{
        var config = {
            headers: {'Ocp-Apim-Subscription-Key': apikey}
        };
      return axios.post("https://api.cognitive.microsoft.com/sts/v1.0/issueToken",{}, config); 
    }
}
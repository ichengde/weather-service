const request = require('../weather.js')

request().then(res=>{
	console.log(res);
})

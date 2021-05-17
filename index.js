const http = require('http')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

let city = 'moscow'
if (argv._.length > 0 ) city = argv._.join(' ')

const apiKey = process.env.TOKEN

const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
http.get(url, (res) => {
    res.setEncoding('utf8');
    let rawData = ''; 
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        let parsedData = JSON.parse(rawData);
        console.log(parsedData);    
    });
})
.on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});

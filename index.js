const cluster = require('cluster');
const process = require('process');
if (cluster.isMaster) {
    for (var i = 0; i < 1; i++) {
        let worker = cluster.fork();
    }
} else {
    const getWeather = require('./weather');
    const notify = require('./notify');
    const fs = require('fs');

    const system_log = console.log;
    console.log = function (...params) {
        system_log(...params);
        const now = new Date();
        fs.appendFile('weather.log', now.toLocaleString() + ' ' + params + '\n', (err) => {
            if (err) throw err;
        });
    }

    try {
        setInterval(() => {
    		console.log('child progress start');
            const now = new Date();
            if (now.getHours() === 8) {
                getWeather().then((ans) => {
    				console.log('today weather: ' + ans);
                    if (ans.indexOf('雨') >= 0) {
                        notify('记得带伞 ' + ans);
                    }
                });
            }
        }, 1000 * 60 * 60);
    } catch (e) {
        console.log(e);
    }

}

cluster.on('death', function (worker) {
    console.log('worker ' + worker.pid + ' died. restart...');
    cluster.fork();
});

process.on('SIGINT', function () {
    if (cluster.isMaster) {
        console.log('user fired. main progress exit.');
    } else {
        console.log('child progress exit.');
    }
    setTimeout(() => {
        process.exit()
    }, 1000);
});



    const getWeather = require('./weather');
    const notify = require('./notify');
	const env = require('./env');
    const fs = require('fs');

    const system_log = console.log;
    console.log = function (...params) {
        system_log(...params);
        const now = new Date();
        fs.appendFile('service.log', now.toLocaleString() + ' ' + params + '\n', (err) => {
            if (err) throw err;
        });
    }

    const [myHour, myMinute] = env.time.split(':');
    try {
        setInterval(() => {
            const now = new Date();
            if (now.getHours() === myHour && now.getMinutes() === myMinute) {
                getWeather().then((ans) => {
                    console.log('today weather: ' + ans);
                    if (ans.indexOf('雨') >= 0) {
                        notify('带伞 ' + ans);
                    }
                });
            }
        }, 1000 * 60);
    } catch (e) {
        console.log(e);
    }


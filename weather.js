const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = function () {
    return new Promise((resolve, reject) => {
        // http://www.nmc.cn/f/rest/real/59493
        JSDOM.fromURL("http://www.nmc.cn/publish/forecast/AGD/shenzhen.html", {
            /* 
             runScripts: "dangerously", resources: "usable",
             beforeParse(window) {
                 window.alert = window.console.log.bind(window.console);
             }, 
            */
        }).then(dom => {
            const day = dom.window.document.querySelector('.today').querySelector('tr').querySelectorAll('td')[1].innerHTML.trim();
            const condition = dom.window.document.querySelector('.day').querySelector('.wdesc').innerHTML.trim();
            resolve(day + condition);
        });
    });
}
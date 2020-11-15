const fs = require('fs'); //file system
const cheerio = require('cheerio'); //alternate jquery for servers
const got = require('got'); //request library

const targetUrl = 'https://electionresults.govt.nz/';

setInterval(function () {
    got(targetUrl).then(response => {
        console.clear();
        const $ = cheerio.load(response.body);
        let totalPercent = $('#main-block > div.main-block-content.clearfix > div.main-content-block > div.page-title > h3').text();
        let firstPartyName = $('#overall-results-table > tbody > tr:nth-child(1) > td.text-left.bold').text();
        let firstPartyPercent = $('#overall-results-table > tbody > tr:nth-child(1) > td.pr20').text();
        let secondPartyName = $('#overall-results-table > tbody > tr:nth-child(2) > td.text-left.bold').text();
        let secondPartyPercent = $('#overall-results-table > tbody > tr:nth-child(2) > td.pr20').text();
        let thirdPartyName = $('#overall-results-table > tbody > tr:nth-child(3) > td.text-left.bold').text();
        let thirdPartyPercent = $('#overall-results-table > tbody > tr:nth-child(3) > td.pr20').text();
        let forthPartyName = $('#overall-results-table > tbody > tr:nth-child(4) > td.text-left.bold').text();
        let forthPartyPercent = $('#overall-results-table > tbody > tr:nth-child(4) > td.pr20').text();

        console.log(totalPercent);
        console.log(textFormater(firstPartyName, firstPartyPercent));
        console.log(textFormater(secondPartyName, secondPartyPercent));
        console.log(textFormater(thirdPartyName, thirdPartyPercent));
        console.log(textFormater(forthPartyName, forthPartyPercent));
    }).catch(err => {
        console.log(err);
    });
}, 5000); //Refresh rate

function textFormater(name, percent) {
    var text =
        name +
        (name.length > 14 ? '\t' : '\t\t') +
        percent + "%";

    return text;
}
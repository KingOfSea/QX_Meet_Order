
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = `https://raw.githubusercontent.com/KingOfSea/QX_Meet_Order/master/meet_info.json`;
const method = `GET`;
const headers = {
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1`,
'Host' : `raw.githubusercontent.com`,
'Connection' : `keep-alive`,
'Accept-Language' : `zh-cn`,
'Accept-Encoding' : `gzip, deflate, br`,
'Accept' : `text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    var data = response.body;
    console.log(data.cookie);
    console.log(data.date);
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});


/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

function Base64() {

    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding  
    this.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding  
    this.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding  
    _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding  
    _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

this.base64 = new Base64();
var theme = this.base64.decode("5LmY5a6i5L2T6aqM5oqA5pyv5ZGo5Lya")
var room_name = this.base64.decode("5aSq55m95bGx77yI5paw5qmZ5rW3QuW6pzJG77yJ")
var address = this.base64.decode("5YyX5LqsLeaWsOapmea1t+Wkp+WOpg==")

const cookie = $prefs.valueForKey('meet_ck');
const day = $prefs.valueForKey('meet_date');

var cookieDict = parseCookieToDict(cookie);

const csrftoken = cookieDict.csrftoken;

console.log(csrftoken);
const url = this.base64.decode("aHR0cDovL21lZXRpbmcueGlhb2p1a2VqaS5jb20vYXBpL3dlYi9yZXNlcnZlL2FkZA==");
const host = this.base64.decode("bWVldGluZy54aWFvanVrZWppLmNvbQ==")
const referer = this.base64.decode("aHR0cDovL21lZXRpbmcueGlhb2p1a2VqaS5jb20v")
const origin = this.base64.decode("aHR0cDovL21lZXRpbmcueGlhb2p1a2VqaS5jb20=")
const method = `POST`;
const headers = {
  'csrftoken' : `${csrftoken}`,
  'Origin' : `${origin}`,
  'Cookie' : `${cookie}`,
  'Referer' : `${referer}`,
  'Host' : `${host}`,
  'Connection' : `keep-alive`,
  'Accept-Encoding' : `gzip, deflate`,
  'Content-Type' : `application/x-www-form-urlencoded`,
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15",
  'language' : `zh`,
  'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
  'Accept' : `application/json, text/plain, */*`
};

const startTime = "16:00";
const endTime = "18:00";
const bodyDict = getBody(day, startTime, endTime)
const body = getBodyStr(bodyDict);

function parseCookieToDict(cooikeString) {
    var ck_arr = []
    if (cooikeString) {
      cooikeString = cooikeString.replaceAll('\n', '');
      ck_arr = cooikeString.split(";");
    }
  
    var cookieDict = {};
    ck_arr.forEach(element => {
      var string = element.replace('=', '\n');
      var sep_arr = string.split("\n");
      if (sep_arr.length == 2) {
        var key = sep_arr[0];
        key = replaceSpaceStr(key);
        var value = sep_arr[1];
        value = replaceSpaceStr(value);
        cookieDict[key] = value;
      }
    });
    return cookieDict;
}

function replaceSpaceStr(str) {
    str = str.replace(/^\s*|\s*$/g, "");
    return str;
}

function getBody(day, startTime, endTime) {
    var body = {
      "isService": "0",
      "meetingTheme": `${theme}`,
      "departmentLevel": "",
      "meetingRoomId": "6817",
      "persons": "",
      "simpleName": `${room_name}`,
      "isSupportService": "true",
      "overReserveCost": "0.00",
      "type": "",
      "remark": "<p><br></p>",
      "areaName": `${address}`,
      "applyReason": "",
      "overCostCenter": "",
      "isChooseDepartment": "0",
      "departmentName": "",
      "startDate": `${day}`,
      "endDate": `${day}`,
      "startTime": `${startTime}`,
      "endTime": `${endTime}`
    }
    return body;
  }
  
function getBodyStr(body) {
    var kv_arr = []
    for (var key in body) {
        var value = encodeURIComponent(body[key])
        var item = `${key}=${value}`
        kv_arr.push(item)
    }
    var body_str = kv_arr.join("&");
    return body_str;
}

function isDateOverdue(day) {
  const date = new Date(day);
  if (date.getTime() < Date.now()) {
    return true
  }
  return false
}

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

var count = 10
var interval = 1000 / count
for (index = 3; index < 8; index = index + 2) {
    setTimeout(requestData, index * interval)
}

var done = false
var executedCount = 0
function requestData() {
    if (done) {
      $done()
      return
    }
    var isOverdue = isDateOverdue(day)
    if (isOverdue == false) {
      if (csrftoken) {
        $task.fetch(myRequest).then(response => {
          console.log(response.statusCode + "\n\n" + response.body);
          executedCount++
          var body = JSON.parse(response.body)
          if (executedCount >= count || body.code == "200") {
            done = true
            $done()
          }
        }, reason => {
          console.log(reason.error);
          executedCount++
          if (executedCount >= count) {
            done = true
            $done()
          }
        });
      } else {
        console.log(`cookie里没有csrftoken`);
        done = true
        $done()
      }
    } else {
      console.log(`${day}日期已过期`);
      done = true
      $done()
    }
}

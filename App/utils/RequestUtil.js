/**
* Description:
* Created by Yacheng Lee on 2017-03-05 18:24:45
* @flow
*/


//const HOST = 'http://apis.baidu.com/';
const HOST = '';
export const request = (url,params,  method,body) => {
    let isOk;
    return new Promise((resolve, reject) => {
        if(params){
            var paramsBody = Object.keys(params)
                .reduce((a, k) => {
                    a.push(k + "=" + encodeURIComponent(params[k]));
                    return a;
                }, [])
                .join('&');
            url += "?" + paramsBody;
        }
        console.log('url:'+url);
        fetch(HOST + url, {
            method,
            headers: {
              //  apikey: '19ffb04654b0f50d003e0a58abf2c50b'
            },
            body
        })
            .then((response) => {
                if (response.ok) {
                    isOk = true;
                } else {
                    isOk = false;
                }
                return response.json();
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

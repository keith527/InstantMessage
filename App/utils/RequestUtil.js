/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-07 15:01:07
* @flow
*/

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
              //  apikey: ''
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

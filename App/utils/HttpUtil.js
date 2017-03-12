/**
* Description:网络请求工具类
 * url:请求地址
 * successCallback:成功回调
 * failCallback:失败回调
 * Tips：暂时没用到
* Created by Xiaocheng Zuo on 2017-03-05 18:31:40
* @flow
*/


let HttpUtil = {

    /**
     * Get請求，沒有參數傳null
     */
    fetchGet: (url, params, successCallback, failCallback) => {

        // 1.拼接參數
        //url += "?key=4b82308b740b32e1fd95e8818a730d3f";
        if (params) {
            var paramsBody = Object.keys(params)
                .reduce((a, k) => {
                    a.push(k + "=" + encodeURIComponent(params[k]));
                    return a;
                }, [])
                .join('&');
            url += "&" + paramsBody;
        }
        fetch(url)
            .then((response) => response.json())
            .then((responseObj) => {successCallback(responseObj)})
            .catch((error) => failCallback(error));
    },

    /**
     * POST請求
     */
    fetchPost: (url, params, successCallback, failCallback) => {

        // 1.拼接參數
        var paramsBody = Object.keys(params)
            .reduce((a, k) => {
                a.push(k + "=" + encodeURIComponent(obj[k]));
                return a;
            }, [])
            .join('&');
        // 2.發送請求
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
           // body: paramsBody + "&key=4b82308b740b32e1fd95e8818a730d3f"
            body: paramsBody
        })
            .then((response) => response.json())
            .then((responseObj) => successCallback(responseObj))
            .catch((error) => failCallback(error));
    }
}

export default HttpUtil;

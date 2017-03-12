
/**
* Description:
* Created by Yacheng Lee on 2017-03-07 10:46:01
* @flow
*/

import {Dimensions, Platform} from 'react-native';

const WINDOW_DIMEN={
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
}

const isPlatformIOS = Platform.OS === 'ios'? true:false;

export {WINDOW_DIMEN, isPlatformIOS}
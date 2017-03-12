/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-05 15:38:57
* @flow
*/

import { ActionConst } from 'react-native-router-flux';

const initialState = {
    scene: {},
};

export default function reducer(state=initialState, action={}) {
    switch (action.type){
        case ActionConst.FOCUS:
            return Object.assign({}, state, {
                scene:action.scene
            });
        default: return state;
    }
}
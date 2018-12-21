import Vue from 'vue';
import Vuex from 'vuex';

let ApiConf = require('./config/apis');

Vue.use(Vuex);
let langObj: any = {};
let configObj: any = {};

export default new Vuex.Store({
    state: {
        lang: langObj,
        config: configObj,
    },
    getters: {
        lang: function(state){
            return state.lang['lang']
        }
    },
    mutations: {
        setLang (state, lang: any) {
            state.lang = lang;
        }

    },
    actions: {
        setLang( store, chosenLang ) {
            console.log(chosenLang);
            let Url = ApiConf.langApi + 'getLanguage';
            let reqData = '{"lang":"' + chosenLang + '"}';
            let Params = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                method: "POST",
                body: reqData
            };

            fetch( Url ,Params)
                .then((response) => {
                    return response.json()
                })
                .then( (data) => {
                    store.commit({type: 'setLang', lang: data});
                })
                .catch(error=>console.log("error: ", error))

        }

    },

});

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let langObj: any = {};

export default new Vuex.Store({
    state: {
        lang: langObj,
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
            let Url = 'http://127.0.0.1:10080/getLanguage';
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
                .then(function(response) {
                    return response.json()
                })
                .then( function(data) {
                    let lang = "{";
                    for (let jsonDict of data) {

                        lang += '"';
                        lang += jsonDict['lang_key'];
                        lang += '":"';
                        lang += jsonDict['value'];
                        lang += '",';
                    }
                    lang = lang.slice(0,-1) + "}";
                    langObj = JSON.parse(lang);
                    store.commit({type: 'setLang', lang: langObj});

                })
                .catch(error=>console.log(error))

        }

    },

});

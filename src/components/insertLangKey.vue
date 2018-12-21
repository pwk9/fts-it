<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-alert
                        :value="dataSaved"
                        type="success"
                        transition="scale-transition"
                        outline
                    >
                        {{ lang['dataSavedSuccess']}}
                    </v-alert>
                    <v-alert
                            :value="dataCouldNotBeSaved"
                            type="error"
                            transition="scale-transition"
                    >

                    </v-alert>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-textarea
                                v-model="langKey"
                                :rules="langKeyRules"
                                label="Name"
                                required
                        ></v-textarea>
                        <v-textarea
                                v-model="de"
                                :rules="deRules"
                                :label="lang['de']"
                                required
                        ></v-textarea>
                        <v-textarea
                                v-model="en"
                                :rules="enRules"
                                :label="lang['en']"
                                required
                        ></v-textarea>
                        <v-textarea
                                v-model="fr"
                                :rules="frRules"
                                :label="lang['fr']"
                                required
                        ></v-textarea>
                        <v-btn
                                :disabled="!valid"
                                @click="submit"
                        >
                            submit
                        </v-btn>
                        <v-btn @click="clear">clear</v-btn>

                    </v-form>
                </v-flex>
            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
    export default {
        name: 'TestComponent',
        props: {
            msg: String,
        },
        computed:{
            lang() {
                console.log(this.$store.state.lang['lang']);
                return this.$store.getters.lang
            }
        },
        data: function () {
            return {
                valid: true,
                langKey: '',
                langKeyRules: [
                    v => !!v || 'is required'
                ],
                de: '',
                deRules: [
                    v => !!v || 'is required'
                ],
                en: '',
                enRules: [
                    v => !!v || 'is required'
                ],
                fr: '<emtpy>',
                frRules: [
                    v => !!v || 'is required'
                ],
                dataSaved: false,
                dataCouldNotBeSaved: false,
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    let Url = 'http://192.168.30.103:10080/insertValue';
                    let reqData = JSON.stringify({
                        lang_key: this.langKey,
                        values: [{
                            lang: 'de',
                            value: this.de
                        },
                        {
                            lang: 'en',
                            value: this.en
                        },
                        {
                            lang :'fr',
                            value: this.fr
                        }]
                    });
                    let Params = {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        method: "POST",
                        body: reqData
                    };
                    let self = this;

                    fetch( Url ,Params)
                        .then( response => {
                            console.log('pka here (data saved) : ', this.$data.dataSaved, ' response: ', response);
                            this.changeDataSaved(true);
                            console.log('changed dataSaved: ', this.$data.dataSaved);
                            return response

                        })
                        .then(response => {
                            console.log('this.sleep start', this.$data.dataSaved);
                            //setTimeout executes the function but  returns the value after the timeout.
                            //so we need to execute the function '()' return '=>' the function we want to execute after  the timeout
                            setTimeout(() => this.changeDataSaved(false), 5000)
                        })
                        .catch( function () {
                            alert('there was an error inserting the new Language values');
                        })
                }
            },
            clear () {
                this.$refs.form.reset()
            },
            changeDataSaved(value) {
                console.log('5 seconds later', this.$data.dataSaved);
                this.$data.dataSaved = value;
                console.log('alert finished', this.$data.dataSaved);
            }
        }

    }

</script>

<style scoped>

</style>
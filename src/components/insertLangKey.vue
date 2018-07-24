<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
                <v-alert
                    :value="dataSaved"
                    type="success"
                    transition="scale-transition"
                    outline
                >

                </v-alert>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            v-model="langKey"
                            :rules="langKeyRules"
                            label="Name"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="de"
                            :rules="deRules"
                            :label="lang['de']"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="en"
                            :rules="enRules"
                            :label="lang['en']"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="fr"
                            :rules="frRules"
                            :label="lang['fr']"
                            required
                    ></v-text-field>
                    <v-btn
                            :disabled="!valid"
                            @click="submit"
                    >
                        submit
                    </v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </v-form>
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
                fr: '',
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
                    let Url = 'http://127.0.0.1:10080/insertValue';
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

                    fetch( Url ,Params)
                        .then( function () {
                            console.log(this.$data.dataSaved);
                            this.$data.dataSaved = true;
                            console.log('changed dataSaved')

                        })
                        .then(this.sleep(5000))
                        .then( function () {
                            this.$data.dataSaved = false;
                        })
                        .catch( function () {
                            alert('there was an error inserting the new Language values');
                        })
                }
            },
            clear () {
                this.$refs.form.reset()
            },
            sleep(ms = 0) {
                return new Promise(r => setTimeout(r, ms));
            }
        }

    }

</script>

<style scoped>

</style>
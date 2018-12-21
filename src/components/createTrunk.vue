<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout row wrap>
                <v-flex xs6 offset-xs3>
                    <v-alert
                            :value="dataSaved"
                            type="success"
                            transition="scale-transition"
                            outline
                    >

                    </v-alert>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field
                                v-model="mainNumber"
                                :rules="mainNumberRules"
                                label="Name"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="startNumber"
                                :rules="startNumberRules"
                                :label="lang['startNumber']"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="endNumber"
                                :rules="endNumberRules"
                                :label="lang['endNumber']"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="exceptionNumbers"
                                :rules="exceptionNumberRules"
                                :label="lang['exceptionNumbers']"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="exceptionNumberRanges"
                                :rules="exceptionNumberRangesRules"
                                :label="lang['exceptionNumberRange']"
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
                mainNumber: '',
                mainNumberRules: [
                    v => !!v || 'is required',
                    v => /^$|^\d{11,13}$/.test(v) || 'number must contain between 11 and 13 digits'
                ],
                startNumber: '',
                startNumberRules: [
                    v => !!v || 'is required',
                    v => /^$|^\d{11,13}$/.test(v) || 'number must contain between 11 and 13 digits'
                ],
                endNumber: '',
                endNumberRules: [
                    v => !!v || 'is required',
                    v => /^$|^\d{11,13}$/.test(v) || 'number must contain between 11 and 13 digits'
                ],
                exceptionNumbers: '',
                exceptionNumberRules: [
                    v => /^$|^(\d{11,13})$|^(\d{11,13},)*(\d{11,13})$/.test(v) || 'each number must contain between 11 and 13 digits and must be seperated with a comma'
                ],
                exceptionNumberRanges: '',
                exceptionNumberRangesRules: [
                    v => /^$|^(\d{11,13}-\d{11,13},)*(\d{11,13}-\d{11,13})$|^(\d{11,13}-\d{11,13})$/.test(v) || 'except number ranges must look like 41554125500-41554125599 and must be seperated with a comma'
                ],
                clearFollowMe: false,
                dataSaved: false,
                dataCouldNotBeSaved: false,
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    let Url = 'http://192.168.30.103:11000/insertValue';



                    let exceptNumbersAsString;

                    let exceptNumbersAsInt = [];

                    let reqData;

                    let baseReqData;

                    if (this.exceptionNumbers != "") {
                        exceptNumbersAsString = this.exceptionNumbers.split(",")
                        exceptNumbersAsString.forEach(function (item){
                            exceptNumbersAsInt.push(+item)
                        });
                    }

                    baseReqData = {
                        start_number: +this.startNumber,
                        end_number: +this.endNumber,
                        main_number: +this.mainNumber,
                        clear_follow_me: this.clearFollowMe
                    };

                    if (this.exceptionNumberRanges !== "" && this.exceptionNumbers !== "") {

                        baseReqData.except_numbers = exceptNumbersAsInt;
                        baseReqData.except_number_ranges = this.exceptionNumberRanges.split(",");

                        reqData = JSON.stringify(baseReqData);

                    } else if (this.exceptionNumberRanges === "" && this.exceptionNumbers !== "") {

                        baseReqData.except_numbers = exceptNumbersAsInt;

                        reqData = JSON.stringify(baseReqData);

                    } else if (this.exceptionNumberRanges !== "" && this.exceptionNumbers === ""){

                        baseReqData.except_number_ranges = this.exceptionNumberRanges.split(",");

                        reqData = JSON.stringify(baseReqData);

                    } else {
                        reqData = JSON.stringify(baseReqData);
                    }

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
                        .then( response => {
                            console.log('pka here (data saved) : ', this.$data.dataSaved, ' response: ', response);
                            this.changeDataSaved(true);
                            console.log('changed dataSaved: ', this.$data.dataSaved);
                            return response

                        })
                        .then( () => {
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
            }
        }

    }

</script>

<style scoped>

</style>
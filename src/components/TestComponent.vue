<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
                <p class="mainTitle">{{lang.welcome}}</p>
                <p>{{lang.introText}}</p>
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

    }

</script>

<style scoped>

</style>
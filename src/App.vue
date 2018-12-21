<template>
    <v-app dark

    >
        <v-navigation-drawer
            persistent
            :mini-variant="miniVariant"
            :clipped="clipped"
            v-model="drawer"
            enable-resize-watcher
            fixed
            app
            class="orange"
        >
            <v-list class="orange">
                <v-list-tile
                    value="true"
                    v-for="(item, i) in items"
                    :key="i"
                    @click.stop="navPage(item.target)"
                >
                    <v-list-tile-action dark>
                        <v-icon v-html="item.icon" color="black"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="black--text">
                            {{lang[item.title]}}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
            app
            :clipped-left="clipped"
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn icon @click.stop="miniVariant = !miniVariant" >
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" ></v-icon>
            </v-btn>
            <v-btn icon @click.stop="clipped = !clipped">
                <v-icon>web</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <v-btn
                        icon
                        slot="activator"
                        dark
                >
                    <v-icon>language</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile
                            v-for="(item, index) in languages"
                            :key="index"
                            @click="changeLanguage(item.lang)"
                    >
                        <v-list-tile-title>{{ lang[item.lang] }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <v-content>
            <router-view/>
        </v-content>

        <v-footer :fixed="fixed" app>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
import TestComponent from './components/TestComponent';
import router from './router';
import LanguageSelection from "./components/languageSelection";

export default {
    name: 'App',
    components: {
        LanguageSelection,
        TestComponent,
    },
    data() {
        return {
            clipped: true,
            drawer: true,
            fixed: false,
            miniVariant: true,
            right: true,
            rightDrawer: false,
            title: 'FTS IT',
            language: false,
            items: [
                {
                    icon: 'bubble_chart',
                    title: 'Home',
                    target: '/',
                },
                {
                    icon: 'contact_support',
                    title: 'about',
                    target: 'about'
                },
                {
                    icon: 'input',
                    title: 'insertLangKey',
                    target: 'insertLangKey'
                },
                {
                    icon: 'input',
                    title: 'createTrunk',
                    target: 'createTrunk'
                }

            ],
            languages: [
                {
                    lang: 'de'
                },
                {
                    lang: 'en',
                }
            ]
        }
    },
    methods: {
        navPage(page) {
            console.log(page);
            router.push({path: page});
        },
        changeLanguage: function ( lang ) {
            this.$store.dispatch('setLang', lang)
                .then( answer =>{
                    console.log("created Language ", answer);
                })
        },
    },
    beforeCreate: function(){
        this.$store.dispatch('setLang', 'de')
            .then(function(){
                console.log("created Language");
            })
    },
    computed:{
        lang() {
            console.log(this.$store.state.lang['lang']);
            return this.$store.getters.lang
        },
    },

}
</script>

<style>
    @import './assets/main.css';
</style>

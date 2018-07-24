<template>
    <v-list>
        <v-list-tile
                value="true"
                v-for="(item, i) in items"
                :key="i"
                @click.stop="changeLanguage(item.lang)"
                class="align-center"
        >
            <div class="align-center">
                <v-btn>
                    {{ item.lang }}
                </v-btn>
            </div>
        </v-list-tile>
    </v-list>
</template>

<script>
    export default {
        name: "languageSelection",
        data() {
            return {
                items: [
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
            changeLanguage: function ( lang ) {
                this.$store.dispatch('setLang', lang)
                    .then(function(){
                        console.log("created Language");
                    })
            }
        },

    }

</script>

<style scoped>

</style>
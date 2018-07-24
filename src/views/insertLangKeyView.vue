<template>
    <div class="home">
        <insertLangKey />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import insertLangKey from '../components/insertLangKey.vue';

    @Component({
        components: {
            insertLangKey,

        },
    })
    export default class Home extends Vue {}
</script>

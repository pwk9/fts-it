<template>
    <div class="home">
        <createTrunk />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import createTrunk from '../components/createTrunk.vue';

    @Component({
        components: {
            createTrunk,

        },
    })
    export default class Home extends Vue {}
</script>
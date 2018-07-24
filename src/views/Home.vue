<template>
  <div class="home">
    <TestComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TestComponent from '../components/TestComponent.vue';

@Component({
  components: {
    TestComponent,

  },
})
export default class Home extends Vue {}
</script>

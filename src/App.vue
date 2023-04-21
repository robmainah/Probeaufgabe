<template>  
    <div class="w-96">
        <nav class="bg-blue-500">
            <div class="flex justify-center text-white p-4">
                <p>App Title</p>
            </div>
        </nav>

        <router-view />
    </div>
</template>

<script setup lang="ts">
    import { useStore } from "vuex";
    import { onMounted } from "vue";

    const store = useStore();

    onMounted(() => {
        store.commit('initializeStore');
        store.commit('initializeWatchlistStore');
    });
</script>
<style>
#app {
  @apply antialiased flex flex-col items-center mt-4;
}
</style>

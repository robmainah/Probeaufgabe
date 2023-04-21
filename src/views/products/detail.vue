<template>
    <div>
        <div class="flex mt-4 p-2 border border-gray-400">
            <img class="mr-3 h-32" :src="product.imageURL" :alt="`${product.name} image`">
            <div class="w-100">
                <p class="font-bold">{{ product.name }}</p>
                <p>rating {{ product.rating }}</p>
                <p><span class="font-bold">Price:</span> {{ product.price.value }} {{ product.price.currency }}</p>
            </div>
        </div>
        
        <p>{{ product.description }}</p>

        <button class="bg-blue-500 w-full py-2 text-white font-bold my-3" @click="toggleWatchlist">
            <span v-if="isInWatchlist">Forget</span>
            <span v-else>Remember</span>
        </button>
        
        <p>{{ product.longDescription }}</p>
    </div>
</template>

<script setup>
    import { useStore } from "vuex";
    import { useRoute } from 'vue-router';
    import { computed, ref } from "vue";

    const store = useStore();
    const route = useRoute();

    const watchlist = store.state.watchlist
    
    let product = computed(() => {
        return store.state.products.find(product => product.id == route.params.id)
    });

    const isInWatchlist = computed(() => {
        const index = watchlist.findIndex(item => item == route.params.id)

        if (index !== -1) {
            return true;
        }

        return false;
    })

    const toggleWatchlist = () => {
        store.commit('updateWatchList', route.params.id);
    }
</script>

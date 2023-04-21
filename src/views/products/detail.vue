<template>
    <div>
        <div class="flex mt-4 p-2">
            <img class="mr-3 h-32" :src="product.imageURL" :alt="`${product.name} image`">
            <div>
                <h1 class="font-bold">{{ product.name }}</h1>
                <p><span class="font-bold">Price:</span> {{ product.price.value }} {{ product.price.currency }}</p>
                <div class="flex justify-between">
                    <div class="stars-outer">
                        <div class="stars-inner" :style="{ 'width': fillStar(product.rating) }"></div>
                    </div>
                    <span class="text-gray-600 date ml-5">{{ formDate(product.releaseDate) }}</span>
                </div>
            </div>
        </div>
        
        <p>{{ product.description }}</p>

        <button class="bg-blue-500 w-full py-2 text-white font-bold my-3" @click="toggleWatchlist">
            <span v-if="isInWatchlist">Forget</span>
            <span v-else>Remember</span>
        </button>
        
        <h2 class="font-bold">Description</h2>
        <p>{{ product.longDescription }}</p>
    </div>
</template>

<script setup>
    import { useStore } from "vuex";
    import { useRoute } from 'vue-router';
    import { computed, ref } from "vue";
    import moment from 'moment';

    const store = useStore();
    const route = useRoute();

    const watchlist = store.state.watchlist
    
    const fillStar = (rating) => {
        const starTotal = 5;
        const starPercentage = (rating / starTotal) * 100;
        return `${(Math.round(starPercentage / 10) * 10)}%`;
    }

    const toggleWatchlist = () => {
        store.commit('updateWatchList', route.params.id);
    }

    const formDate = (milliseconds) => {
        return moment(milliseconds).format('DD.MM.YYYY')
    }

    let product = computed(() => {
        return store.state.products.find(product => product.id == route.params.id);
    });

    const isInWatchlist = computed(() => {
        const index = watchlist.findIndex(item => item == route.params.id)

        if (index !== -1) {
            return true;
        }

        return false;
    });
</script>


<template>
    <div>
        <ul class="font-medium flex px-4 md:space-x-8 bg-gray-800">
            <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white" @click="getAllProducts">All</a>
            </li>
            <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white" @click="showAvailableProducts">Available</a>
            </li>
            <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white" @click="showWatchlistProducts">Watchlist</a>
            </li>
        </ul>
    </div>

    <div>
        <div v-for="product in products" :key="product.id" class="flex mt-4 p-2 border border-gray-400" :style="{ backgroundColor: isInWatchlist(product.id) ? '#D1C4E9' : '' }">
            <img class="mr-3 h-28" :class="{'order-last ml-3' : !product.available }" :src="product.imageURL" :alt="`${product.name} image`">
            <div class="w-100">
                <div class="flex">
                    <h1>
                        <router-link :to="{ name: 'ProductDetail', params: {id: product.id}}" class="font-bold">{{ product.name }}</router-link>
                    </h1>

                    <span class="date ml-5 text-gray-600">{{ formDate(product.releaseDate) }}</span>
                </div>
                <p>{{ shortenStringLength(product.description) }}</p>
                <div class="flex justify-between">
                    <p v-if="product.available" class="mr-4"><span class="font-bold">Price:</span> {{ product.price.value }} {{ product.price.currency }}</p>
                    <div class="stars-outer">
                        <div class="stars-inner" :style="{ 'width': fillStar(product.rating) }"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useStore } from "vuex";
    import { ref, onMounted } from "vue";
    
    import moment from 'moment';

    const store = useStore();
    let products = ref([]);
    let watchlist = ref([]);


    const getAllProducts = () => {
        products.value = store.state.products
    }

    const shortenStringLength = (string) => {
        return string.substring(0, 50)
    }
    
    const formDate = (milliseconds) => {
        return moment(milliseconds).format('DD.MM.YYYY')
    }
    
    const fillStar = (rating) => {
        const starTotal = 5;
        const starPercentage = (rating / starTotal) * 100;
        return `${(Math.round(starPercentage / 10) * 10)}%`;
    }

    const showAvailableProducts = () => {
        products.value = store.state.products.filter(product => product.available);
    };

    const showWatchlistProducts = () => {
        products.value = store.state.products.filter(product => watchlist.value.includes(product.id));
    };

    const isInWatchlist = (productId) => {
        return watchlist.value.includes(productId);
    }

    onMounted(() => {
        watchlist.value = store.state.watchlist.map(Number);
        getAllProducts();
    });
</script>


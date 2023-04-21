<template>
    <div>
        <ul class="font-medium flex px-4 md:space-x-8 bg-gray-800">
            <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white" >All</a>
            </li>
            <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white" >Available</a>
            </li>
            <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white" >Watchlist</a>
            </li>
        </ul>
    </div>

    <div>
        <div v-for="product in products" :key="product.id" class="flex mt-4 p-2 border border-gray-400">
            <img class="mr-3 h-28" :class="{'order-last ml-3' : !product.available }" :src="product.imageURL" :alt="`${product.name} image`">
            <div class="w-100">
                <router-link :to="{ name: 'ProductDetail', params: {id: product.id}}" class="font-bold">{{ product.name }}</router-link>
                <p>{{ shortenStringLength(product.description) }}</p>
                <p>rating {{ product.rating }}</p>
                <p><span class="font-bold">Price:</span> {{ product.price.value }} {{ product.price.currency }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useStore } from "vuex";
    import { ref, onMounted } from "vue";

    const store = useStore();
    let products = ref([]);

    const getItems = () => {
        products.value = store.state.products
    }

    const shortenStringLength = (string) => {
        return string.substring(0, 50)
    }

    onMounted(() => {
        getItems();
    });
</script>

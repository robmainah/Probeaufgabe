import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        products: [],
        watchlist: [],
    },
    mutations: {
        async initializeStore(state) {
            const itemsUrl = 'https://gist.githubusercontent.com/benfranke/c33280a8df5f4f9db2e63ad45cab26a4/raw/f3ad6c00ff520c2667305103d5705bcbb57a7778/products.json';

            if (localStorage.getItem('products')) {
                state.products = JSON.parse(localStorage.getItem('products'))
            } else {
                await axios.get(itemsUrl)
                .then(({data}) => {
                    state.products = data.products
                });

                localStorage.setItem('products', JSON.stringify(state.products))
            }
        },
        async initializeWatchlistStore(state) {
            if (localStorage.getItem('watchlist')) {
                state.watchlist = JSON.parse(localStorage.getItem('watchlist'))
            }
        },
        updateWatchList(state, productId) {
            const index = state.watchlist.findIndex(item => item === productId)
            
            if (index === -1) {
                state.watchlist.push(productId)
            } else {
                state.watchlist.splice(index, 1)
            }

            localStorage.setItem('watchlist', JSON.stringify(state.watchlist))
        }
    }
})

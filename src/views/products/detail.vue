<template>
    <div>
        <p>detail {{ route.params }}</p>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();

</script>

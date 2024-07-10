<script setup>
    const error = useError();

    const handleError = () => {
        clearError({
            redirect: '/',
        });
    };

    definePageMeta({
        layout: false
    })
</script>
<template>
    <div>
        <div>  
            <h1>404</h1>
            <div>
                <div>Oh NO!!Page Not Found 😮</div>
                <NuxtLink to="/" >Back to the INDEX</NuxtLink>
            </div>
        </div>
    </div>
</template>


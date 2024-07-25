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
            <h1>[Root] Error:{{ error.statusCode }}</h1>
            <div>
                <div>{{ error.statusMessage }} 😮</div>
                <NuxtLink to="/" >Back to the INDEX</NuxtLink>
            </div>
        </div>
    </div>
</template>


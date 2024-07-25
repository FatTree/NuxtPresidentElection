<script setup>
    const error = useError();
    error.showErrorMessage
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
            <h1>[Page]</h1>
            <div>
                <div>{{ error.showErrorMessage }} 😮</div>
                <NuxtLink to="/" >Back to the INDEX</NuxtLink>
            </div>
        </div>
    </div>
</template>


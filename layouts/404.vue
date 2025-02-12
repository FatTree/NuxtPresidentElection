<script setup lang="ts">
  const error = useError();

  const handleError = () => {
      clearError({
          redirect: '/',
      });
  };
</script>
<template>
  <div>
    <div>
        <div>  
            <h1>[Layout]404</h1>
            <div>
                <div>Oh NO!!Page Not Found 😮</div>
                <NuxtLink to="/" >Back to the INDEX</NuxtLink>
            </div>
        </div>
    </div>
    Layout: 404
    <slot />
  </div>
</template>

<style scoped></style>

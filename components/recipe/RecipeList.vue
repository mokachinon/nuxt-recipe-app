<template>
    <div class="container">
        <div v-if="recipes.length" class="row g-5">
            <app-recipe-item :recipe="data" v-for="data in recipes" :key="data.id" :isUser="isUser"></app-recipe-item>
        </div>
        <div v-else>
            <h2 class="text-center" style="color: grey;">Recipes Not Found</h2>
        </div>
    </div>
</template>

<script>
import RecipeItem from "./RecipeItem.vue";

export default {
    components: {
        "app-recipe-item": RecipeItem,
    },
    props: {
        recipes: {
            required: true,
            type: Array
        },
        isUser: {
            type: Boolean,
            default: false
        }
    }

}
</script>

<style>
.recipes {
    display: flex;
    flex-wrap: wrap;
}
</style>
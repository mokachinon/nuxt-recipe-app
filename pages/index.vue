<template>
    <div>
        <main>
            <app-recipe-list :recipes="recipesData"></app-recipe-list>
        </main>
    </div>
</template>

<script>
import RecipeList from "~/components/recipe/RecipeList.vue";

export default {
    name: 'RecipeContent',
    middleware: 'check-auth',
    components: {
        "app-recipe-list": RecipeList,
    },
    computed: {
        recipesData() {
            return this.$store.getters.recipesData
        }
    }, 
    created() {
        this.$store.dispatch("getRecipesList")
    }
}
</script>

<style>

</style>
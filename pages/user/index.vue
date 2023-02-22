<template>
    <div>
        <app-recipe-list :recipes="recipesData" :isUser="true"></app-recipe-list>
    </div>
</template>

<script>
import RecipeList from "../../components/recipe/RecipeList.vue";
export default {
    middleware: ['check-auth', 'auth' ],
    components: {
        "app-recipe-list": RecipeList,
    },
    created() {
        this.$store.dispatch("getRecipesList")
    },
    computed: {
        recipesData() {
            const userId = this.$store.getters.userId;
            const recipes = this.$store.getters.recipesData

            return recipes.filter((recipe) => recipe.userId === userId)
        }
    },
};
</script>
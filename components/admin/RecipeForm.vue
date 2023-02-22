<template>
    <div class="container w-50">
        <div class="row g-3 justify-content-md-center">
            <app-input placeholder="Chicken friedrice" v-model="newRecipe.recipeTitle">
                <label class="form-label">Recipe Title</label>
            </app-input>
            <app-input placeholder="www.imgelink.com/fried-rice.jpg" v-model="newRecipe.recipeImage">
                <label class="form-label">Recipe Image</label>
            </app-input>
            <app-text-area v-model="newRecipe.body">
                <label class="form-label">Recipe Description</label>
            </app-text-area>
        </div>
        <div>
            <div class="col-12">
                <h2>Ingredients</h2>
            </div>
            <div class="row g-1 justify-content-md-center" style="margin-top: 5px" v-for="item in ingredientCount"
                :key="item">
                <app-input colStyle="col-8" placeholder="2 large eggs"
                    v-model="newRecipe.ingredients[item - 1]"></app-input>
                <app-button :buttonType="item !== ingredientCount ? 'delete' : 'add'" @click="addIngredient(item)">
                    {{ item !== ingredientCount ? "Delete" : "Add" }}
                </app-button>
            </div>
        </div>
        <div>
            <div class="col-12">
                <h2>Directions</h2>
            </div>
            <div class="row g-1 justify-content-md-center" style="margin-top: 5px" v-for="item in directionCount"
                :key="item">
                <app-input colStyle="col-8" :placeholder="`Step ${item}`"
                    v-model="newRecipe.directions[item - 1]"></app-input>
                <app-button :buttonType="item !== directionCount ? 'delete' : 'add'" @click="addDirection(item)">{{ item
                    !== directionCount ? "Delete" : "Add" }}</app-button>
            </div>
        </div>
        <app-button @click="addRecipe">{{ recipe ? "Update" : "Submit" }}</app-button>
    </div>
</template>

<script>
import Input from "../../components/newRecipe/Input.vue";
import Button from "../../components/newRecipe/Button.vue";
import TextArea from "../../components/newRecipe/TextArea.vue"

export default {
    props: {
        recipe: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            newRecipe: this.recipe ? { ...this.recipe } :
                {
                    recipeImage: "",
                    recipeTitle: "",
                    ingredients: [],
                    directions: [],
                    body: "",
                },
            ingredientCount: 1,
            directionCount: 1,
        }
    },
    components: {
        "app-input": Input,
        "app-button": Button,
        "app-text-area": TextArea
    },
    mounted() {
        if (this.recipe) {
            this.ingredientCount = this.recipe.ingredients.length;
            this.directionsCount = this.recipe.directions.length;
        }
    },
    methods: {
        addIngredient(item) {
            if (item === this.ingredientCount) {
                this.ingredientCount += 1;
            } else {
                this.newRecipe.ingredients.splice(item - 1, 1);
                this.ingredientCount -= 1;
            }
        },
        addDirection(item) {
            if (item === this.directionCount) {
                this.directionCount += 1;
            } else {
                this.newRecipe.directions.splice(item - 1, 1);
                this.directionCount -= 1;
            }
        },
        async addRecipe() {
            if (!this.recipe) {
                await this.$store.dispatch("addRecipe", this.newRecipe)
                this.$router.push("/")
            } else {
                let { id: _, ...newRecipe } = this.newRecipe;

                await this.$store.dispatch("updateRecipe", { newRecipe, id: this.$route.params.detail })
                this.$router.push("/user")
            }
        }
    },
}
</script>

<style>
.add-recipe__title,
.add-recipe__desc {
    display: block;
    width: 100%;
    margin: 10px 0px;
    border: none;
}

.add-recipe__title {
    height: 50px;
    font-size: 25px;
}

.add-recipe__desc {
    height: 300px;
}

.add-recipe__img {
    border: none;
    height: 30px;
}

.add-recipe__button {
    color: white;
    background-color: #4B56D2;
    border: none;
    padding: 20px;
    border-radius: 15px;
    font-weight: bold;
}

.add-recipe__button:hover {
    cursor: pointer;
    background-color: #82C3EC;
    color: #4B56D2;
}
</style>


<template>
    <div class="col-md-6 col-lg-3">
        <div class="card">
            <img class="recipes-content__img card-img-top rounded" alt="Pasta" :src="recipe.recipeImage">
            <div class="card-body">
                <p class="username">{{ recipe.userName }}</p>
                <nuxt-link tag="h1" :to="{ name: 'recipe-detail', params: { detail: recipe.id } }" class="card-text fs-5 text"
                    style="height: 45px; align-items:center;">{{ recipe.recipeTitle }}
                </nuxt-link>
                <div class="recipes-content__body__review card-footer bg-transparent row">
                    <div class="col-2">
                        <img :src="likeImage" alt="Heart" @click="likeClick">
                    </div>
                    <div class="col-6">
                        <p>{{ likeCount }} Likes</p>
                    </div>
                    <div v-show="isUser" class="col-2">
                        <img src="images/edit.svg" alt="Heart" @click="deleteRecipe">
                    </div>
                    <div v-show="isUser" class="col-2">
                        <img src="images/trash.svg" alt="Heart" @click="editRecipe">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        recipe: {
            type: Object,
            default: ""
        },
        isUser: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        likeCount() {
            if (this.recipe.dataLikes.length === 1) {
                if (this.recipe.dataLikes[0] === "null") {
                    return 0;
                } else {
                    return 1
                }
            } else {
                return this.recipe.dataLikes.length
            }
        },
        likeImage() {
            const checkLike = this.recipe.dataLikes.find((user) => {
                return user === this.userEmail
            })

            if (checkLike) {
                return "images/heart-red.png"
            } else {
                return "images/heart-black.png"
            }
        },
        userEmail() {
            return this.$store.getters.userEmail
        },
    },
    methods: {
        async likeClick() {
            if (!this.$store.getters.isAuth) {
                this.$router.push('/user/login')
            }
            const userEmail = this.userEmail;
            const recipe = JSON.parse(JSON.stringify(this.recipe));

            if (recipe.dataLikes.length === 1 && recipe.dataLikes[0] === 'null') {
                recipe.dataLikes[0] = userEmail
            } else {
                const checkLike = recipe.dataLikes.find((email) => {
                    return email === userEmail
                })

                if (!checkLike) {
                    recipe.dataLikes.push(userEmail)
                } else {
                    if (recipe.dataLikes.length === 1) {
                        recipe.dataLikes[0] = "null";
                    } else {
                        const userEmailIndex = recipe.dataLikes.findIndex((email) => {
                            return email === userEmail
                        })

                        recipe.dataLikes.splice(userEmailIndex, 1)
                    }
                }
            }

            let { id: _, ...newRecipe } = recipe
            await this.$store.dispatch("likeUpdate", {
                recipeId: this.recipe.id,
                newDataRecipe: newRecipe
            })

            await this.$store.dispatch("getRecipesList")
        },
        deleteRecipe() {
            this.$store.dispatch("deleteRecipe", this.recipe.id)
        },
        editRecipe() {
            this.$router.push("/recipe/" + this.recipe.id + "/edit")
        }
    }
}
</script>


<style>
.username {
    margin-bottom: 0px;
}

/* Recipe Content */
.recipes-content {
    background-color: #EEF2E6;
    padding: 10px;
    margin: 13px 13px;
}

.recipes-content__body {
    padding: 5px;
}

.recipes-content__img {
    width: 100%;
    height: 25vh;
}

.recipes-content__body__review {
    display: flex;
    align-items: center;
}

.recipes-content__body__review img {
    width: 20px;
    height: 20px;
    margin: 5px 10px 5px 0px;
}

.recipes-content__body__review p {
    margin: 0px;
}

.recipes-content__body__review img:hover {
    cursor: pointer;
}

.recipes-content__body__title {
    margin: 5px 0px;
}
</style>
const app = Vue.createApp({
    data() {
        return {
            category: '',
            area: '',
            instructions: '',
            meal: '',
            picture: '',
            source: '',
            youtube: '',
            ingredients: [],
            loading: true,
        }
    },

    mounted() {
        this.getMeal();
    },

    methods: {
        async getMeal() {
            this.loading = true;
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            console.log(res);
            const { meals } = await res.json();

            console.log(meals);

            const ingredients = [];

            for (let i = 1; i < 21; i++) {
                if (meals[0][`strIngredient${i}`] !== '' && meals[0][`strIngredient${i}`] !== null) {
                    ingredients.push({
                        ingredient: meals[0][`strIngredient${i}`],
                        measure: meals[0][`strMeasure${i}`]
                    })
                }
            }

            console.log(ingredients);

            this.category = meals[0].strCategory,
            this.area = meals[0].strArea,
            this.instructions = meals[0].strInstructions,
            this.meal = meals[0].strMeal,
            this.picture = meals[0].strMealThumb,
            this.source = meals[0].strSource,
            this.youtube = meals[0].strYoutube
            this.ingredients = ingredients;

            // this.firstName = results[0].name.first,
            // this.lastName = results[0].name.last,
            // this.email = results[0].email,
            // this.gender = results[0].gender,
            // this.picture = results[0].picture.large

            this.loading = false;
        }
    }
})

app.mount('#app')
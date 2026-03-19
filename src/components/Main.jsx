import React, { useEffect } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromChefClaude } from "../ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);

    const [recipe, setRecipe] = React.useState("");
    const recipeSection = React.useRef(null)

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients((prev) => [...prev, newIngredient]);
    }

    async function showRecipe() {
        const response = await getRecipeFromChefClaude(ingredients);
        setRecipe(response);
    }

    useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])


    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList 
                ref={recipeSection}
                ingredients={ingredients} 
                showRecipe={showRecipe} 
                />
            )}

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}



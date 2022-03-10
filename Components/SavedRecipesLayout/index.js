import React, { useState, useEffect } from "react";
import SavedRecipeCard from "./SavedRecipeCard";
import { Container, Card } from "@nextui-org/react";
import css from "./style.module.css";

function SavedRecipesLayout({ savedRecipesData }) {
  const [recipeIDs, setRecipeIDs] = useState(savedRecipesData);
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    async function getRecipeData() {
      //fetch all of the recipe id data at outlineColor
      //store all of that in recipeData
      //map tyhrough recipeData and render the components we need
      // when a user deletes something filter it from recipeData
      const fetches = recipeIDs.map((recipeID) => {
        return fetch(
          `https://api.edamam.com/api/recipes/v2/${recipeID}?type=public&app_id=${process.env.NEXT_PUBLIC_EDAMAM_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_APP_KEY}`
        );
      });
      const allPromise = Promise.all([fetches]);
      const res = await allPromise;
      const data = res.map(async (resItem) => {
        const test = await resItem.json();
        return test;
      });
      console.log(data);
      //cant resolve each promise with .json
    }
    getRecipeData();
  }, []);

  function deleteSavedRecipe(recipeID) {
    const index = recipeIDs.indexOf(recipeID);
    const newState = [
      ...recipeIDs.slice(0, index),
      ...recipeIDs.slice(index + 1, recipeIDs.length),
    ];
    setRecipeIDs(newState);
    console.log("Button has been clicked", recipeID);
  }
  return (
    <div>
      <div>
        <h3 className={css.title}>Saved Recipes</h3>
        <hr></hr>
      </div>
      {/* {recipeIDs.map((item, index) => {
        return (
          <div key={item}>
            <Container className={css.container}>
              <Card
                className={css.card}
                shadow={true}
                clickable
                bordered
                hoverable
                css={{ mw: "375px" }}
              >
                <SavedRecipeCard
                  deleteSavedRecipe={deleteSavedRecipe}
                  recipeID={item}
                  key={index}
                />
              </Card>
            </Container>
          </div>
        );
      })} */}
    </div>
  );
}

export default SavedRecipesLayout;

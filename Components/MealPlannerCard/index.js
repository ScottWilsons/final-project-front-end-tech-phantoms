import React, { useEffect } from "react";
import Image from "next/image";
import css from "../style.module.css";
import {
  breakfast as bf,
  lunch as lh,
  dinner as dr,
} from "../../mealPlannerDb";
import { useState } from "react";
import AddMealModal from "../AddMealModal";

function MealPlannerCard() {
  const [breakfast, setBreakfast] = useState(bf);
  const [lunch, setLunch] = useState(lh);
  const [dinner, setDinner] = useState(dr);
  const [show, setShow] = useState(false);


  function handleAdd() {
      setShow(true);
  }

  function handleDeleteBf(id) {
    const newBf = breakfast.filter((item) => {
      return item.linkToInstructions !== id;
    });
    setBreakfast(newBf);
  }
  function handleDeleteLh(id) {
    const newLh = lunch.filter((item) => {
      return item.linkToInstructions !== id;
    });
    setLunch(newLh);
  }
  function handleDeleteDr(id) {
    const newDr = dinner.filter((item) => {
      return item.linkToInstructions !== id;
    });
    setDinner(newDr);
  }
  return (
    <div className={css.container}>
      {breakfast.map((meal) => {
        return (
          <div key={meal.linkToInstructions}>
            <h3>{meal.recipeName}</h3>
            <Image
              src={meal.recipeImage}
              alt={meal.recipeName}
              height={100}
              width={100}
            />
            <button>
              <a href={meal.linkToInstructions}> Method</a>
            </button>
            <button
              onClick={() => {
                handleDeleteBf(meal.linkToInstructions);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
      {lunch.map((meal) => {
        return (
          <div key={meal.linkToInstructions}>
            <h3>{meal.recipeName}</h3>
            <Image
              src={meal.recipeImage}
              alt={meal.recipeName}
              height={100}
              width={100}
            />
            <button>
              <a href={meal.linkToInstructions}> Method</a>
            </button>
            <button
              onClick={() => {
                handleDeleteLh(meal.linkToInstructions);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
      {dinner.map((meal) => {
        return (
          <div key={meal.linkToInstructions}>
            <h3>{meal.recipeName}</h3>
            <Image
              src={meal.recipeImage}
              alt={meal.recipeName}
              height={100}
              width={100}
            />
            <button>
              <a href={meal.linkToInstructions}> Method</a>
            </button>
            <button
              onClick={() => {
                handleDeleteDr(meal.linkToInstructions);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
      <button>Add</button>
    </div>
  );
}

export default MealPlannerCard;

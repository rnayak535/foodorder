import React, {useState, useEffect} from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = (props) => {

  const [meals, setMeals] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    const fetchMeals = async () => {
      setError(null);
      const response = await fetch('http://react-http-c1e91-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Request Failed');
      }
      const responseData = await response.json();
      const loadMeals = [];
      for(const key in responseData){
        loadMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setError(error.message);
      setIsLoading(false);
    });
    
  }, []);
  
  if(isloading){
    return (
      <section className={classes.mealIsLoading}>
          <p>Loading...</p>
      </section>
    );
  }

  if(error){
    return (
      <section className={classes.mealHasError}>
         <p>{error}</p>
      </section>
    );
  }
  
  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
        <Card>
           {mealsList}
        </Card>
    </section>
  );
};

export default AvailableMeals;
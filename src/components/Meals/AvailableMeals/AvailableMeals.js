import React, {useEffect, useState} from "react";
import classes from './AvailableMeals.module.css'

import Card from "../../UI/Card/Card";
import MealItem from "./MealItem/MealItem";


const AvailableMeals = props => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState('')

    useEffect(() => {
        (async () => {
            const response = await fetch('https://maxreact-15877-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')

            if (!response.ok) {
                throw new Error('Something is wrong!')
            }
            const responseData = await response.json()
            const loadedMeals = []

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }
            setMeals(loadedMeals)
            setIsLoading(false)

        })()
            .catch(error => {
                setIsLoading(false)
                setHttpError(error.message)
            })


    }, [])

    if (isLoading) {
        return (
            <section className={classes['meals-loading']}>
                <p>Loading...</p>
            </section>
        )
    }
    if (httpError) {
        return (
            <section className={classes['meals-error']}>
                <p>httpError</p>
            </section>
        )
    }

    const mealsList = meals.map(meal => {
        return <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    })

    return (<section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>

    </section>)
}

export default AvailableMeals

// import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchFilmsReviews } from "api-srv/fetchFilms";

export const Reviews = () => {
   const [reviews, setReviews] = useState([])
//    const location = useLocation();
   const {itemId} = useParams();

   useEffect(() => {
     async function Reviews () {
        try {
            const reviewItem = await fetchFilmsReviews(itemId);
            setReviews(reviewItem)
        } catch (error) {
            console.log(error)
        }
       };
     Reviews();
    }, [itemId])

    if (reviews.length !== 0) {
        return (
            <ul>
                {reviews.map(({id, author, content}) => (
                  <li key={id}>
                      <p>author: {author}</p>
                      <p>{content}</p>
                  </li>  
                ))}
            </ul>
        )
    } else {
        return (
            <h3>We don`t have any reviews for this movie</h3>
        )
    }
}
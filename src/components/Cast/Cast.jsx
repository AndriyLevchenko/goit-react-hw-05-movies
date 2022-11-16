import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchFilmsCredits } from 'api-srv/fetchFilms';
import { ActorImg, ActorContainer } from './Cast.styled';

export const Cast = () => {
  const [actors, setActors] = useState([]);
  const {itemId} = useParams();

  useEffect(() => {
    async function FetchActors() {
      try {
        const findActors = await fetchFilmsCredits(itemId);
        setActors(findActors);
      } catch (error) {
        console.log(error);
      }
    }
    FetchActors();
  }, [itemId]);

  return (
    <>
      {actors !== [] && (
        <ActorContainer>
          {actors.map(({ id, profile_path, original_name, character }) => (
            <li key={id}>
              {profile_path ? (
                <ActorImg
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt="No image"
                />
              ) : (
                <img
                  src="http://artismedia.by/blog/wp-content/uploads/2018/05/in-blog2-1.png"
                  alt=""
                  height={300}
                  width={200}
                />
              )}
              <div>
                <p>Name: {original_name}</p>
                <p>Character: {character}</p>
              </div>
            </li>
          ))}
        </ActorContainer>
      )}
    </>
  );
};
import { useEffect, useState } from 'react';
import { fetchFilmsTrending } from 'api-srv/fetchFilms';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from '../Navigation/Navigation.styled';

export default function HomePage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchPictures() {
      try {
        const response = await fetchFilmsTrending();
        setList(response);
      } catch (error) {
        toast.error('Все пропало!', { position: 'top-center' });
      }
    }
    fetchPictures();
  }, []);

  return (
    <>
      <main>
        <h1>Trending today</h1>
        <ul>
          {list.map(item => (
            <li key={item.id}>
              <Link to={`/movies/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </main>
      <ToastContainer autoClose={2000} />
    </>
  );
}
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Navigation } from './Navigation/Navigation'
import { Cast } from './Cast/Cast';
import { Reviews } from './Reviews/Reviews';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('./HomePage/HomePage'));
const MoviesPage = lazy(() => import('./MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./MovieDetailsPage/MovieDetailsPage'));

export const App = () => {
  return (
    <>
      <Suspense fallback={''}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:itemId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </Suspense>
    </>
  );
};

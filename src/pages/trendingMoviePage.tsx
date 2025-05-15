import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { getTrendingMovies } from "../api/tmdb-api";

const TrendingMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    "trending",
    getTrendingMovies
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data ? data.results : [];

  return (
    <PageTemplate
      title="Trending Movies"
      movies={movies}
      action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
    />
  );
};

export default TrendingMoviesPage;

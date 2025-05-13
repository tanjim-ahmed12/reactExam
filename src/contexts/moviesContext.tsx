import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";


interface MovieContextInterface {
    favourites: number[];
    mustWatch: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);  // NEW
    addToMustWatch: ((movie: BaseMovieProps) => void);  // NEW
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    mustWatch: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (movie, review) => { movie.id, review},  // NEW
    addToMustWatch: () => {},  // NEW
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);;

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [myReviews, setMyReviews] = useState<Review[]>( [] )  // NEW
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const addToMustWatch = useCallback((movie: BaseMovieProps) => {
        setMustWatch((prevMustWatch) => {
            if (!prevMustWatch.includes(movie.id)) {
                return [...prevMustWatch, movie.id];
            }
            return prevMustWatch;
        });
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
      };

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,    // NEW
                mustWatch,
                addToMustWatch,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
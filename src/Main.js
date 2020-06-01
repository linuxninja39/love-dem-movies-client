import React from 'react';
import './App.css';
import MovieList from "./MovieList";

class Main extends React.Component {
    render() {
        return (
            <div>
                Sweet movies
                <MovieList/>
            </div>
        );
    }
}


export default Main;

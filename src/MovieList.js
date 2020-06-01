import * as React from "react";
import {connect} from "react-redux";
import {fetchMovies, saveRating} from "./store/actions";
import {Movie} from "./Movie";

const stateToProps = state => {
    return {movies: state.movies}
}

const dispatchToProps = dispatch => {
    return {
        updateMovies: movies => {
            console.log('updating movies', movies, dispatch);
            dispatch(fetchMovies());
        },
        saveRating: (ratingInfo) => {
            dispatch(saveRating(ratingInfo));
        }
    }
}

class StatelessMovieList extends React.Component {
    constructor(props) {
        super(props);
    }

    handleUpdate = () => {
        console.log('handleUpdate: state', this.state);
        console.log('handleUpdate: props', this.props);
        this.props.updateMovies();
    }

    render() {
        console.log('render: props', this.props);
        return (
            <div>
                {this.props.movies.map(
                    el => (<Movie movie={el} saveRating={this.props.saveRating}/>)
                )}
                <button onClick={this.handleUpdate}>Update</button>
            </div>
        );
    }
}

const MovieList = connect(stateToProps, dispatchToProps)(StatelessMovieList);

export default MovieList;

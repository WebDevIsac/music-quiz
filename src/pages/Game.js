import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom';
import Quiz from 'components/Quiz';

const Game = () => {
    const location = useLocation();
    const { artists } = location.state || {};
    console.log(artists);

    return (
        <Quiz allArtists={artists} />
    )
}

Game.propTypes = {

}

export default Game

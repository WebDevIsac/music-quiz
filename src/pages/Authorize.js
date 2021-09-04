import React from 'react'
import PropTypes from 'prop-types'
import { authorize} from 'functions/spotify';

const Authorize = props => {
    return (
        <div>
            <div>We need you to authorize with your spotify account</div>
            <button onClick={authorize}>AUTHORIZE</button>
        </div>
    )
}

Authorize.propTypes = {

}

export default Authorize

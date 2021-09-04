import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import { authorize} from 'functions/spotify';

const Button = styled('button')`
    width: 100%;
    max-width: 320px;
    height: 56px;
`;

const Authorize = props => {
    return (
        <div>
            <div>We need you to authorize with your spotify account</div>
            <Button onClick={authorize}>LOGIN</Button>
        </div>
    )
}

Authorize.propTypes = {

}

export default Authorize

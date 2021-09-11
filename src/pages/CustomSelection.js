import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import { artists } from 'data/artists';

const PageWrapper = styled('div')`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Row = styled('div')`

`;

const List = styled('div')`
    display: flex;
    flex-direction: column;
`;

const Item = styled('div')`

`;

const Cross = styled('span')``;


const CustomSelection = () => {
    const location = useLocation();

    return (
        <PageWrapper>
            <Row>

            </Row>
            <List>
                {artists.map((artist, index) => (
                    <Item key={index}>
                        <Cross>X</Cross>
                        <span>{artist}</span>
                    </Item>
                ))}
            </List>
        </PageWrapper>
    )
}

CustomSelection.propTypes = {

}

export default CustomSelection

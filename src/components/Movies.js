import React from 'react';
import Entity from './Entity';

export default function Movies() {
    return (
        <>
            <Entity entityType="movie" dbEntity="movies/" linkToLabel="IMDb link" entityTitle="MOVIES" doneTitle="Watched!"/>
        </>
    )
}

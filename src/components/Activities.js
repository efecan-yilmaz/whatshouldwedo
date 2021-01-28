import React from 'react';
import Entity from './Entity';

export default function Movies() {
    return (
        <>
            <Entity entityType="activity" dbEntity="activities/" linkToLabel="Activity Link" entityTitle="ACTIVITIES" doneTitle="Done!"/>
        </>
    )
}

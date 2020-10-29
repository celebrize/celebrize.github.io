import React, { useState } from 'react';
import AnniversaryCalculator from '../anniversaryCalculator';

function Anniversary(props) {
    const anniversary = props.anniversary
    const key = anniversary.getTime()
    console.log(anniversary)
    return (<li key={key}>{anniversary.date.toLocaleDateString()}: {anniversary.getNumberLabel()} {anniversary.getPeriodLabel()}</li>)
}

export default Anniversary;

import React from 'react'
import moment from 'moment'

function RelativeDay(props) {
    const now = new Date(props.now || new Date())
    const day = new Date(props.day)
    
    return (
        <span>{moment(day).calendar(now, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: '[This] dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'MMMM Do YYYY (dddd)',
        })}</span>
    )
}

export default RelativeDay;
import React from 'react'

const baseUri = "https://images.unsplash.com"
const ixlib = "rb-1.2.1"
const ixid = "eyJhcHBfaWQiOjE3OTQ1NX0"
const crop = "faces,center"

function UnsplashImg(props) {
    const id = props.id
    const width = props.width || 300
    const height = props.height || 200

    return <img src={`${baseUri}/photo-${id}?ixlib=${ixlib}&ixid=${ixid}&w=${width}&h=${height}&crop=${crop}`} width={width} height={height} />
}

export default UnsplashImg

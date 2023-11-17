'use client'

import React, { useCallback, useState } from 'react'
import L from 'leaflet'
// import '../Stylesheets/Map.css'
// import propertyMap from '../images/262.png'


const propertyMap = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const INIT_BOUNDS = [[0, 0], [638, 906]]

export default function Map() {
    // const [map, setMap] = useState()
    // const [editMode, setEditMode] = useState(true)
    const [count, setCount] = useState(0)
    const mapElementRefCallback = useCallback((nullableElement) => {
        var bounds = [[0, 0], [638, 906]]
        if (!nullableElement){
            console.log('error');
            return
        }
        var map = L.map(nullableElement, { crs: L.CRS.Simple, dragging: false, doubleClickZoom: false, touchZoom: false, scrollWheelZoom: false, boxZoom: false, keyboard: false, zoomControl: false, layers: L.imageOverlay(propertyMap, bounds).addTo(map), INIT_BOUNDS, center: [51.505, -0.09]})
        map.on('click', (clickEvent) => {
            setCount(prevCount => prevCount + 1);
            L.marker(clickEvent.latlng).addTo(map)
        })
    }
    )
    return (
        <div id="mapDiv">
            <div ref={mapElementRefCallback}></div>
            <h2>{count}</h2>
        </div>
    )
}
    // Place Marker on Map
    // function placeMarker(e) {
    //     console.log(count)
    //     setCount(count + 1)
    //     var latlng = e.latlng
    //     console.log(latlng)
    //     L.marker(latlng).addTo(map)
    // }

    // // Create map only on initial load
    // useEffect(() => {
    //     var map = L.map(nullableElement, { crs: L.CRS.Simple, dragging: false, doubleClickZoom: false, touchZoom: false, scrollWheelZoom: false, boxZoom: false, keyboard: false, zoomControl: false, layers: L.imageOverlay(propertyMap, bounds).addTo(map), INIT_BOUNDS, center: [51.505, -0.09]})
    //     map.on('click', (clickEvent) => {
    //         setCount(prevCount => prevCount + 1);
    //         L.marker(clickEvent.latlng).addTo(map)
    //     })
    //     setMap(map)
        // var bounds = [[0, 0], [638, 906]]
        
    //     // map.fitBounds(bounds)
    // }, [])


    // useEffect(() => {
    //     if (map) {
    //         console.log("here")
    //         map.on('click', placeMarker)
    //     }
    // }, [map])






// }
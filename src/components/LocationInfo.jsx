import React from 'react'

const LocationInfo = ({location}) => {
   
  return (
    <article className='location'>
        <h2 className='location__name'>{location?.name}</h2>
        <ul className='location__ul'>
            <li><span className='location__description'>Type</span><span className='location__result'> {location?.type}</span></li>
            <li><span className='location__description'>Dimention</span><span className='location__result'> {location?.dimension}</span></li>
            <li><span className='location__description'>Population</span><span className='location__result'> {location?.residents.length}</span></li>
        </ul>
    </article>
  )
}

export default LocationInfo
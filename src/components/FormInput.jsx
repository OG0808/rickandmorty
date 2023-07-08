import React from 'react'
import getRaondomNumber from '../utils/getRaondomNumber'

const FormInput = ({setIdLocation}) => {


    const handleEvent = (e) => {
        e.preventDefault()
        const inputValue = e.target.id.value.trim()
       if (inputValue !== '' || inputValue === 0 ) {
        setIdLocation(e.target.id.value.trim());
       }else{
        setIdLocation(getRaondomNumber(126))
       }
       e.target.id.value=''

    }

  return (
    <form className='inputValue' onSubmit={handleEvent}>
        <input type="text"
        name='id'/>
        <button>Search</button>
    </form>
  )
}

export default FormInput
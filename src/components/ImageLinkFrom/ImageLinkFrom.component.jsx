import React from 'react';
import './ImageLinkFrom.style.css';

const ImageLinkFrom  = ({ onInputChange , buttonOnSubmit }) => {
     return (
       <div>
         <p className="f3">
           {'Lusy will detect faces in your pictures , give Lusy a try .'}
         </p>
         <div className='center'>
         <div className='form center pa4 br3 shadow-5'>
           <input className='f4 pa2 w-70 center' type="text" placeholder='Lusy needs a image Url' onChange={onInputChange} />
           <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={buttonOnSubmit} >Detect</button>
         </div>
         </div>
       </div>

     );
}


export default ImageLinkFrom;
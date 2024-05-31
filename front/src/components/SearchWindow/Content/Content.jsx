import React , { useState } from 'react'
import noImg from '../../../img/no-img.png'
import Modal from './Modal/Modal'
import { fetchPutFav, fetchChangeFav, fetchAddtoCollecFav, fetchRemoveFromCollecFav } from '../../../utils/fetch';
import { useEffect } from 'react';


export const ModalContext = React.createContext();

export default function Content({ index, datas }){
    const [showModal, setShowModal] = useState(false)
    const [mydesc, setMyDesc] = useState(null)
    const [fav, setFav] = useState(datas.fav)
     function handleClick(){
        setShowModal(true)
        console.log(datas.fav)
    }

    async function handleClickFav(){
        if (fav) {
            const fav = await fetchChangeFav(datas.id)
            const bye = await fetchRemoveFromCollecFav(datas.id)
        } else {
            const fav = await fetchPutFav(datas.id)
            const res = await fetchAddtoCollecFav(datas.id)
        }
        setFav(!fav)
    }

    return(
        <>
            <ModalContext.Provider value={{showModal, setShowModal, mydesc, setMyDesc}}>
                {showModal ? <Modal datas={datas}/> : null}
            </ModalContext.Provider>
            
            <div className={index%2 === 0 ? "grid-content bg-even" : "grid-content bg-odd"}>
                <div className='img-log' onClick={handleClick}><img src={datas.img !== 'None' ? `${datas.img}`: noImg} alt="Img-Livre" /></div>
                <p>{datas.title}</p>
                <p>{datas.author}</p>   
                <div onClick={handleClickFav}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={fav ? '#FFFF00' : 'none'} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="fav">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                    </svg>
                </div>             
            </div>
        </>
    )
}
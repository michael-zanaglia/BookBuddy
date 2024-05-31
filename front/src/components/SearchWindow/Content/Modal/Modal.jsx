import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../Content";
import noImg from '../../../../img/no-img.png'
import { fetchPut } from "../../../../utils/fetch";

export default function Modal({ datas }){
    const {showModal, setShowModal, mydesc, setMyDesc} = useContext(ModalContext);

    console.log(datas.desc)

    function closeModal(){
        setShowModal(false)
    }

    async function handleNote(e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const descForm = formData.get('desc');
        const update = await fetchPut([descForm, datas.id])
        setMyDesc(descForm)
        alert(update.msg)
    }


    return (
        <div className="overlay">
            <div className="cross" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f1f1f1" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
            <div className="modal">
                <h1>{datas.title}</h1>
                <div className='img-modal'><img src={datas.img !== 'None' ? `${datas.img}`: noImg} alt="Img-Livre" /></div>
                <p>Auteur : {datas.author}</p>
                <p>Catégorie : {datas.category}</p>
                <p>Nombres de pages : {datas.pages}</p>
                <p>Statut : '<i>{datas.state}'</i></p>
                {datas.desc ? <p>Note : <i>{mydesc || datas.desc}</i></p>:null}
                {datas.state === 'en cours'? 
                    <form className="form_modal" onSubmit={handleNote}>
                        <input className="fi" name="desc" type="text" placeholder="Ajouter une note, ex : je suis à la page 12..." />
                        <button className="fb">Valider</button>
                    </form>: null
                }
            </div>
            
        </div>
    )
}
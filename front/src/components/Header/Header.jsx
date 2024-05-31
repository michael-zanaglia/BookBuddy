import React from "react";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
    
            <nav>
                <ul>
                    <li><Link to='/add'>Ajouter un livre</Link></li>
                    <li><Link to='/books'>Rechercher un livre</Link></li>
                    <li><Link to='/favoris'>Favoris</Link></li>
                    <li></li>
                </ul>
            </nav>
    
    )
}
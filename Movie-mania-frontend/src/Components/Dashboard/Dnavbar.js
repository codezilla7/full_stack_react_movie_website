import React from 'react'
import { Link } from 'react-router-dom'

export default function Dnavbar() {
    let handleDelete = (e) => {

        localStorage.removeItem('token')
    }
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
                <Link to='/' className="nav-item d-none d-sm-inline-block">
                    <a href="index3.html" className="nav-link">Home</a>
                </Link>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/login" onClick={(e) => { handleDelete(e) }} className="nav-link">Log out</Link>
                </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                    </a>
                </li>
            </ul>
        </nav>
    )
}

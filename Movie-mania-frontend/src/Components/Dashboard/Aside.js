import React from 'react'
import { Link } from 'react-router-dom'

export default function Aside() {
    return (
        <aside style={{height:'200px'}} className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <Link to="/dashboard" className="brand-link">
                <img src="https://i.pinimg.com/736x/a1/3f/4b/a13f4bf358ff7490a80d929785b54a0a.jpg" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">MM Dashboard</span>
            </Link>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="/dist/img/profile.png" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <Link to="/dashboard" className="d-block">Mustafa Nazari</Link>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
                            with font-awesome or any other icon font library */}
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon pr-1 bi bi-film"></i>
                                <p>
                                    movies
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/dashboard/addmovie" className="nav-link">
                                    <i class="nav-icon pr-1 bi bi-plus-square-fill"></i>
                                        <p>Add movie</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dashboard/viewmovie" className="nav-link">
                                    <i class="nav-icon pr-1 bi bi-eye-fill"></i>
                                        <p>View movies</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href='#' className="nav-link">
                            <i class="nav-icon pr-1 bi bi-credit-card-2-front-fill"></i>
                                <p>
                                    Category
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/dashboard/addcategory" className="nav-link">
                                    <i class="nav-icon pr-1 bi bi-plus-square-fill"></i>
                                        <p>Add Category</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dashboard/viewcategory" className="nav-link">
                                    <i class="nav-icon pr-1 bi bi-eye-fill"></i>
                                        <p>View Category</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href='#' className="nav-link">
                            <i class="nav-icon pr-1 bi bi-bullseye"></i>
                                <p>
                                    Carousel
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/dashboard/addcarousel" className="nav-link">
                                    <i class="nav-icon pr-1 bi bi-plus-square-fill"></i>
                                        <p>Add Carousel</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dashboard/viewcarousel" className="nav-link">
                                    <i class="nav-icon pr-1 bi bi-eye-fill"></i>
                                        <p>View Carousel</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    )
}

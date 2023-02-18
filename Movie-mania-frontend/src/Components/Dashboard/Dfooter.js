import React from 'react'
import { Link } from 'react-router-dom'

export default function Dfooter() {
    return (
        <footer className="main-footer">
            <strong>Copyright © 2014-2022 <Link to="http://localhost:8000" >Movie mania</Link>.</strong>
            All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.2.0-rc
            </div>
        </footer>
    )
}

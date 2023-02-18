import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Aside from './Aside'
import Loader from './Loader'
import Dfooter from './Dfooter'
import Dnavbar from './Dnavbar'

const AddCategory = React.lazy(() => import('./Addcategory'))
const ViewCategory = React.lazy(() => import('./Viewcategory'))
const EditCategory = React.lazy(() => import('./Editcategory'))
const Addmovies = React.lazy(() => import('./Addmovies'))
const Viewmovie = React.lazy(() => import('./Viewmovie'))
const Editmovie = React.lazy(() => import('./Editmovie'))
const Viewmoviedes = React.lazy(() => import('./Viewmoviedes'))
const Addcarousel = React.lazy(() => import('./Addcarousel'))
const Viewcarousel = React.lazy(() => import('./Viewcarousel'))
const Editcarousel = React.lazy(() => import('./Editcarousel'))
export default function Dhome() {
  return (
    <>
    <Dnavbar></Dnavbar>
    <Aside />
    <div className="content-wrapper">
        <Suspense fallback={<Loader />} >
            <Routes>
                <Route path='/addmovie' element={<Addmovies></Addmovies>} />
                <Route path='/viewmovie' element={<Viewmovie></Viewmovie>} />
                <Route path='/editmovie/:id' element={<Editmovie></Editmovie>} />
                <Route path='/viewmoviedes/:id' element={<Viewmoviedes></Viewmoviedes>} />
                <Route path='/addcategory' element={<AddCategory></AddCategory>} />
                <Route path='/viewcategory' element={<ViewCategory></ViewCategory>} />
                <Route path='/editcategory/:id' element={<EditCategory></EditCategory>} />
                <Route path='/addcarousel' element={<Addcarousel></Addcarousel>} />
                <Route path='/viewcarousel' element={<Viewcarousel></Viewcarousel>} />
                <Route path='/editcarousel/:id' element={<Editcarousel></Editcarousel>} />
            </Routes>
        </Suspense>
    </div>
    <Dfooter></Dfooter>
</>
  )
}

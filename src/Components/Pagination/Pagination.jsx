import React, { useState, useEffect, useContext } from 'react'

import { Link, useParams } from 'react-router-dom'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

import shopContext from '../../Context/contex'

import "./Pagination.css"

export default function Pagination({ item, itemCount, setPaginationProduct }) {

    const { setLoading } = useContext(shopContext);
    const [pageCount, setPageCount] = useState(null);
    const { categoryID } = useParams();

    useEffect(() => {
        let endIndex = categoryID * itemCount;
        let startIndex = endIndex - itemCount;
        let paginationProducts = [...item].slice(startIndex, endIndex);
        setPaginationProduct(paginationProducts)

        let pageNumber = Math.ceil(item.length / itemCount);
        setPageCount(pageNumber);


        // setTimeout(() => {
        //     setLoading(false)
        // }, 500);
    }, [item, categoryID])

    const paginationClickHandler = () => setLoading(false)


    return (
        <ul className="pagination">
            <li className="pagination-item" onClick={paginationClickHandler}>
                <Link to={`/category/${Number(categoryID) === 1 ? categoryID : Number(categoryID) - 1}`}><MdKeyboardArrowLeft /></Link>
            </li>

            {
                Array(pageCount).fill(0).map((item, index) => (
                    <li onClick={paginationClickHandler} key={index + 1} className={`pagination-item ${index + 1 === Number(categoryID) && 'active'}`}>
                        <Link to={`/category/${index + 1}`} >{index + 1}</Link>
                    </li>
                ))
            }

            <li className="pagination-item" >
                <Link to={`/category/${Number(categoryID) !== pageCount ? Number(categoryID) + 1 : categoryID}`} onClick={paginationClickHandler}>
                    <MdKeyboardArrowRight />
                </Link>
            </li>
        </ul >
    )
}

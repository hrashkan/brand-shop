import React, { useContext } from 'react'
import shopContext from '../../Context/contex';

import { MdOutlineDone, MdClose } from "react-icons/md"

import "./Toast.css";

export default function Toast({ message, title }) {

    const { ToastShow, setToastShow, toastTitle } = useContext(shopContext);


    const closeBtnToastHandler = index => {
        setToastShow(prev => {
            return prev.filter((item, itemIndex) => itemIndex !== index)
        })
    }

    return (

        <div className={`toast__alert ${ToastShow.length && 'active'}`}>
            {
                ToastShow.length ?
                    (
                        ToastShow.map((toast, index) => (
                            <div className={`toast ${toastTitle === 'Notification' ? 'toast__notification' : ''}`} key={index}>
                                <div className="toast-icon">
                                    <MdOutlineDone />
                                </div>
                                <div className="toast-detail">
                                    <div className="toast-title">{title}</div>
                                    <div className="toast-desc">{message}</div>
                                </div>
                                <div className="toast-close" >
                                    <MdClose onClick={() => closeBtnToastHandler(index)} />
                                </div>
                                <span className="toast__time-line"></span>
                            </div>
                        ))
                    )
                    : ('')
            }
        </div>


    )
}

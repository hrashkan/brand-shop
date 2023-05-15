import React from 'react'

import "./ContentTabTitle.css"

export default function ContentTabTitle({ title, onChangeTab, contentTable }) {

    const titleClickHandler = () => onChangeTab(title)

    return (
        <p className={`tab__title ${title.toLowerCase() === contentTable && 'active'}`} onClick={titleClickHandler}>{title}</p>
    )
}

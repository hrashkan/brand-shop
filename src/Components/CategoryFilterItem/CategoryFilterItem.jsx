import React from 'react'

import "./CategoryFilterItem.css"

export default function CategoryFilterItem() {
    return (
        <div className="widget__items">
            <input type="checkbox" className="widget__item-input" />
            <label htmlFor="" className="widget__item-title">Samsung</label>
        </div>
    )
}

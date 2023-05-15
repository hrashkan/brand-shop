import React, { useState, useEffect } from 'react'


import CategoryFilterItem from '../../Components/CategoryFilterItem/CategoryFilterItem'

import { Range, getTrackBackground } from 'react-range'

import { AiOutlineClose, AiOutlineStar, AiFillStar } from "react-icons/ai"

import "./Sidebar.css"

export default function Sidebar({ onClose, onRateFilter, onSellFilter, minPrice, maxPrice, onPriceFilter }) {

    const [values, setValues] = useState([minPrice, maxPrice]);


    const [scoreRate, setScoreRate] = useState([
        { id: 1, rate: 1 },
        { id: 2, rate: 2 },
        { id: 3, rate: 3 },
        { id: 4, rate: 4 },
        { id: 5, rate: 5 },
    ]);

    const STEP = 0.1;


    return (
        <aside className="sidebar">
            <AiOutlineClose className='responsive-sidebar__button' onClick={() => onClose()} />
            <div className="widget">
                <h3 className="widget__title">sort base sell</h3>
                <div className="widget__filters">
                    <div className="widget__items">
                        <input name='sell' value='bestsell' type="radio" className="widget__item-input" onChange={e => onSellFilter(e.target.value)} />
                        <label className="widget__item-title">Best selling</label>
                    </div>
                    <div className="widget__items">
                        <input name='sell' value='default' type="radio" className="widget__item-input" defaultChecked onChange={e => onSellFilter(e.target.value)} />
                        <label className="widget__item-title">default</label>
                    </div>
                </div>
            </div>
            <div className="widget">
                <h3 className="widget__title">score</h3>
                <div className="widget__filters">
                    {
                        scoreRate.map(score => (
                            <div className="widget-score" key={score.id}>
                                <input value={score.rate} type="checkbox" className="score-filter" onChange={onRateFilter} />
                                <label className="score-rate">
                                    {
                                        Array(score.rate).fill(0).map((item, index) => <AiFillStar className='score-start__fill' key={index} />)
                                    }
                                    {
                                        Array(5 - score.rate).fill(0).map((item, index) => <AiOutlineStar className='score-start__outline' key={index} />)
                                    }
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="widget">
                <h3 className="widget__title">price filter</h3>
                {/* price range slider input */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}
                >
                    <Range
                        draggableTrack
                        values={values}
                        step={STEP}
                        min={0}
                        max={2000}
                        onChange={(values) => {
                            setValues(values)
                            onPriceFilter(values)
                        }}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: '3.6rem',
                                    display: 'flex',
                                    width: '90%'
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: '5px',
                                        width: '100%',
                                        borderRadius: '4px',
                                        background: getTrackBackground({
                                            values,
                                            colors: ['var(--gray-400)', 'var(--primary)', 'var(--gray-400)'],
                                            min: minPrice,
                                            max: maxPrice,

                                        }),
                                        alignSelf: 'center'
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({ props, isDragged }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '2rem',
                                    width: '2rem',
                                    borderRadius: '.8rem',
                                    backgroundColor: '#var(--white)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                }}
                            >
                                <div
                                    style={{
                                        height: '2rem',
                                        width: '2rem',
                                        backgroundColor: isDragged ? 'var(--primary)' : 'var(--gray-500)',
                                        borderRadius: '.8rem'
                                    }}
                                />
                            </div>
                        )}
                    />
                    <output style={{ marginTop: '1rem' }} id="output">
                        ${minPrice} - ${maxPrice}
                    </output>
                </div>

            </div>
        </aside>
    )
}

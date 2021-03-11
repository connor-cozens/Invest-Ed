import React, { useState } from 'react'

export const Collapsible = (props) => {
    const [open, setOpen] = useState(props.open != undefined ? props.open : true);

    const toggle = () => {
        setOpen(!open)
    }

    return (
        <div>
            <div onClick={(e) => toggle(e)} className='header'>
                {open ? <i className="arrow up"></i> : <i className="arrow down"></i>}
                {props.title}
            </div>

            {open ? (
                <div className='content'>
                    {props.children}
                </div>
            ) : null}
        </div>
    );
}
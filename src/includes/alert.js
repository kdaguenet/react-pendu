import React from 'react'

const alert = (props) => (
    <div className={`alert alert-${props.type} ${!props.visible ? 'd-none' : ''}`} role="alert">
        {props.msg}
    </div>
)

export default alert

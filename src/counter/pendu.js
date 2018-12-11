import React from 'react'

const penduPos = [
  '0 200px',
  '0 0',
  '-240px 0',
  '-480px 0',
  '-720px 0',
  '0 -255px',
  '-240px -255px',
  '-480px -255px',
  '-720px -255px'
]

// {/*<div className={'pendu'} style={{ backgroundPosition: penduPos[props.id] }}> </div>*/}

const pendu = (props) => (
    <span>Vie perdu : {props.id} / 8</span>
)

export default pendu

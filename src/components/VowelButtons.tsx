import React from 'react'

function VowelButtons(props: {page: number}) {
  return (
  <div className="vowel-buttons">
      <button className="btn">
        Close
      </button>
      <button className="btn">
        Open
      </button>

    </div>
  )
}

export default VowelButtons

import React from 'react'

type Props = {
  page: number
}

function ConsonantButtons({ page }: Props) {
  return (
  <div className="consonant-buttons">
      <button className="btn">
        Fricative
      </button>
      <button className="btn">
        Sibilant
      </button>
    </div>
  )
}

export default ConsonantButtons

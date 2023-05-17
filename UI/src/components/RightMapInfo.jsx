import React, { useEffect } from "react"
import { useSelector } from "react-redux"

const RightMapInfo = () => {
  useEffect(() => {
    return () => {
      //unmount: selectedMarker remove
    }
  }, [])
  const selectedMarker = useSelector((state) => state.map.selectedMarker)
  console.log(selectedMarker)
  return <div>{selectedMarker && selectedMarker.address}</div>
}

export default RightMapInfo

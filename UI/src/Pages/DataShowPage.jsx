import { useSelector, useDispatch } from "react-redux";
import { selectMarker } from "../Store/mapSlice";
import { Table } from "@mantine/core";
import { fetchMarkers } from "../thunks/getmarkers";
import { useEffect, useState } from "react";

const DataShowPage = () => {
  const [dbMarkers, setDbMarkers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMarkers())
      .unwrap()
      .then((markers) => {
        setDbMarkers(markers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);
  console.log(dbMarkers);
  const handleMarkerClick = (marker) => {
    dispatch(selectMarker(marker));
    // Burada seçilen markerın yol tarifi gösterme işlemlerini yapabilirsiniz
  };
  const rows = dbMarkers.map((marker, index) => (
    <tr
      className="relative top-10 right-2"
      key={index}
      onClick={() => handleMarkerClick(marker)}
    >
      <td>{marker.address}</td>
      <td>{marker.rate}</td>
    </tr>
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr className="">
            <tr className="  fixed top-18">Adres</tr>
            <tr className="fixed top-20 right-5">Puan</tr>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default DataShowPage;

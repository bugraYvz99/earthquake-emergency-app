import { useSelector, useDispatch } from "react-redux";
import { selectMarker } from "../Store/mapSlice";
import { Table } from '@mantine/core';



const DataShowPage = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.map.markers);

  const handleMarkerClick = (marker) => {
    dispatch(selectMarker(marker));
    // Burada seçilen markerın yol tarifi gösterme işlemlerini yapabilirsiniz
  };
  const rows = markers.map((marker, index) => (
    <tr key={index} onClick={() => handleMarkerClick(marker)}>
      <td>{marker.address}</td>
      <td>{marker.hasarMiktari}</td>
    </tr>
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Adres</th>
            <th>Hasar</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default DataShowPage;

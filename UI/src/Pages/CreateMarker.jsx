import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postMarker } from "../thunks/postMarker";
import { Input } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateMarker = () => {
  const navigate = useNavigate();
  const { lat, lng } = useParams();
  const dispatch = useDispatch();
  const [incidentData, setIncidentData] = useState({
    type: "",
    details: {
      status: "",
      roof: "",
      floor: "",
      stairs: "",
      elevator: "",
      wall: "",
      column: "",
    },
    media: [],
    persons: {
      inside: 0,
      trapped: 0,
      rescued: 0,
      dead: 0,
      injured: 0,
      identities: [],
    },
  });
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDXUM99i5wpXdDa8fqqW18TtwHKrQYimyE`
        );
        const results = response.data.results;
        if (results.length > 0) {
          setAddress(results[0].formatted_address);
        }
      } catch (error) {
        console.log("Error retrieving address:", error);
      }
    };

    getAddress();
  }, [lat, lng]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncidentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    const markerData = {
      position: {
        lat: lat,
        lng: lng,
      },
      address: address,
    };
    dispatch(postMarker({ markerData, incidentData }));
    window.location.href = "/page1";
  };
  return (
    <div className="grid gap-4">
      {/* Input fields for incident data */}
      <Input.Wrapper>
        <Input
          type="text"
          name="type"
          value={incidentData.type}
          onChange={handleInputChange}
        />
      </Input.Wrapper>
      <Input.Wrapper>
        <Input
          type="text"
          name="status"
          value={incidentData.details.status}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper>
        <Input
          type="text"
          name="roof"
          value={incidentData.details.roof}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper>
        <Input
          type="text"
          name="floor"
          value={incidentData.details.floor}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper>
        <Input
          type="text"
          name="stairs"
          value={incidentData.details.stairs}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper>
        <Input
          type="text"
          name="elevator"
          value={incidentData.details.elevator}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper>
        <Input
          type="text"
          name="wall"
          value={incidentData.details.wall}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper>
        <Input
          type="text"
          name="column"
          value={incidentData.details.column}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper>
        <Input
          type="number"
          name="inside"
          value={incidentData.persons.inside}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper>
        <Input
          type="number"
          name="trapped"
          value={incidentData.persons.trapped}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper>
        <Input
          type="number"
          name="rescued"
          value={incidentData.persons.rescued}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper>
        <Input
          type="number"
          name="dead"
          value={incidentData.persons.dead}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper label="injured">
        <Input
          type="number"
          name="injured"
          value={incidentData.persons.injured}
          onChange={handleInputChange}
        />{" "}
      </Input.Wrapper>{" "}
      <Input.Wrapper>
        <Input
          type="text"
          name="identities"
          value={incidentData.persons.identities}
          onChange={handleInputChange}
        />
      </Input.Wrapper>
      <button onClick={handleSubmit}>Create Marker</button>
    </div>
  );
};

export default CreateMarker;

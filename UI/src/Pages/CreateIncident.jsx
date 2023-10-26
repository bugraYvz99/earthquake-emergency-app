import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postIncident } from "../thunks/postIncident";
import { Button, Card, Input, Notification, Select } from "@mantine/core";
import EarthquakeEvent from "../incident-types/EartquakeEvent";
import FireEvent from "../incident-types/FireEvent";
import GasLeak from "../incident-types/GasLeak";

export const CreateIncident = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const navigate = useNavigate();
  const { markerId } = useParams();
  console.log(markerId);
  const [incidentData, setIncidentData] = useState({
    type: "",
    details: {
      personInfos: [],
    },
    media: [],
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [category, fieldName] = name.split(".");

    if (category === "details") {
      setIncidentData((prevState) => ({
        ...prevState,
        details: {
          ...prevState.details,
          [fieldName]: value,
        },
      }));
    } else if (category === "persons") {
      // Updated condition for "persons" category
      setIncidentData((prevState) => ({
        ...prevState,
        details: {
          // Updated to store "persons" data within "details"
          ...prevState.details,
          persons: {
            ...prevState.details.persons,
            [fieldName]: value,
          },
        },
      }));
    } else {
      setIncidentData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    const [category, fieldName, personIndex, subFieldName] = name.split(".");

    if (category === "details" && fieldName === "personInfos") {
      const index = parseInt(personIndex, 10);
      setIncidentData((prevState) => {
        const updatedPersonInfos = [...prevState.details.personInfos];
        updatedPersonInfos[index] = {
          ...updatedPersonInfos[index],
          [subFieldName]: value,
        };

        return {
          ...prevState,
          details: {
            ...prevState.details,
            personInfos: updatedPersonInfos,
          },
        };
      });
    } else {
      setIncidentData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(incidentData.type);
      if (incidentData.type.trim() === "") {
        throw new Error("Lütfen bir olay türü seçiniz.");
      }
      const status = await postIncident(markerId, incidentData);
      console.log("Status:", status);
      if (status === 201) {
        navigate("/page1", {
          state: {
            showNotification: true,
            notificationText: "Olay başarılı şekilde oluşturuldu",
          },
        });
      }
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error);
      // Show a notification with the error message
      setShowNotification(true);
      setNotificationText(error.message);
    }
    // Reset the form or perform any other necessary actions
  };

  const renderEventComponent = () => {
    const { type } = incidentData;

    switch (type) {
      case "Deprem":
        return (
          <EarthquakeEvent
            setIncidentData={setIncidentData}
            handleInputChange2={handleInputChange2}
            handleInputChange={handleInputChange}
            incidentData={incidentData}
          />
        );
      case "Yangın":
        return (
          <FireEvent
            setIncidentData={setIncidentData}
            handleInputChange2={handleInputChange2}
            handleInputChange={handleInputChange}
            incidentData={incidentData}
          />
        );
      case "Gaz kaçağı":
        return (
          <GasLeak
            setIncidentData={setIncidentData}
            handleInputChange2={handleInputChange2}
            handleInputChange={handleInputChange}
            incidentData={incidentData}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="grid gap-4">
      {/* Input fields for incident data */}
      <Card h="100%" className=" pb-32">
        <Select
          className=" "
          pos={"relative"}
          label={"Olay tipi"}
          dropdownPosition="bottom"
          defaultValue={"earthquake"}
          data={[
            { label: "Yangın Bilgisi", value: "Yangın" },
            { label: "Gaz Kaçağı Bilgisi", value: "Gaz kaçağı" },
            { label: "Genel Hasar Bilgisi", value: "Deprem" },
            // Diğer tipleri buraya ekleyebilirsiniz
          ]}
          placeholder="Olay tipi"
          value={incidentData.type}
          onChange={(value) =>
            setIncidentData((prevState) => ({ ...prevState, type: value }))
          }
        />
        {renderEventComponent()}
      </Card>
      {showNotification && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Notification
            title={notificationText}
            onClose={() => setShowNotification(false)}
            shadow
            color={notificationText.includes("başarılı") ? "teal" : "red"}
            style={{ marginTop: "1rem", zIndex: "auto" }}
          >
            <Button onClick={() => setShowNotification(false)}>Close</Button>
          </Notification>
        </div>
      )}

      <button onClick={handleSubmit}>Onayla</button>
    </div>
  );
};

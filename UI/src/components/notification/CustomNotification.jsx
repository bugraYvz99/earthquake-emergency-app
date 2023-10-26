import React from "react";
import {
  Notification as MantineNotification,
  Button,
  CheckIcon,
} from "@mantine/core";
import { IconCircleXFilled } from "@tabler/icons-react";

import { useLocation, useNavigate } from "react-router-dom";

function CustomNotification() {
  const locations = useLocation();
  const navigate = useNavigate();

  const icon =
    (locations.state &&
      locations.state.notificationText &&
      locations.state.notificationText.includes("Başarılı")) ||
    locations.state.notificationText.includes("başarılı") ? (
      <CheckIcon size="1.1rem" />
    ) : (
      <IconCircleXFilled />
    );

  const color =
    (locations.state &&
      locations.state.notificationText &&
      locations.state.notificationText.includes("Başarılı")) ||
    locations.state.notificationText.includes("başarılı")
      ? "teal"
      : "red";

  const handleClose = () => {
    navigate("/page1", { state: null });
  };

  return (
    <MantineNotification
      w={350}
      icon={icon}
      onClose={handleClose}
      color={color}
      style={{ marginTop: "1rem" }}
    >
      <div className="mt-8">
        {locations.state &&
          locations.state.notificationText &&
          locations.state.notificationText}
      </div>
      <Button mt={20} variant="outline" onClick={handleClose}>
        Kapat
      </Button>
    </MantineNotification>
  );
}

export default CustomNotification;

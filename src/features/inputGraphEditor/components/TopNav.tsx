import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Box, Typography, Button } from "@mui/material";
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined";

interface TopNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopNav({ sidebarOpen, setSidebarOpen }: TopNavProps) {
  const [isRenameMode, setRenameMode] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("Untitled Document 1");
  const navigate = useNavigate();

  const handleDocumentTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDocumentTitle(event.target.value);
  };

  const handleTitleDoubleClick = () => {
    setRenameMode(true);
  };

  const handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && documentTitle !== "") {
      setRenameMode(false);
    }
  };

  const handleTitleComplete = () => {
    if (documentTitle !== "") {
      setRenameMode(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1000,
        left: "15px",
        top: "15px",
        width: sidebarOpen ? "69.5%" : "98%",
        transition: "all .25s linear",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            padding: "10px 17px",
            cursor: "pointer",
            transition: "opacity 0.3s", // Transition for opacity change
            "&:hover": {
              opacity: 0.8, // Change opacity on hover
            },
          }}
          onClick={navigateToHome}
        >
          <ArrowBackIcon
            htmlColor="#1C4C82"
            sx={{
              padding: "3px",
            }}
          />
          <Typography
            sx={{
              pl: "5px",
              color: "#1C4C82",
              textAlign: "left",
              fontFamily: "Poppins",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Back
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <Typography
              variant="h6"
              style={{
                flexGrow: 1,
                textAlign: "center",
                color: "black",
                fontFamily: "Montserrat",
                fontSize: 16,
                fontWeight: 600,
              }}
              onDoubleClick={handleTitleDoubleClick}
            >
              {isRenameMode ? (
                <>
                  <input
                    type="text"
                    value={documentTitle}
                    onChange={handleDocumentTitleChange}
                    onKeyPress={handleTitleKeyPress}
                    onBlur={handleTitleComplete}
                    style={{
                      border: "none",
                      outline: "none",
                      minWidth: "150px",
                      borderBottom: "2px solid black",
                      color: "black",
                      fontFamily: "Montserrat",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  />
                  <DoneRoundedIcon
                    sx={{ marginLeft: "8px", verticalAlign: "middle", cursor: "pointer" }}
                    onClick={handleTitleComplete}
                  />
                </>
              ) : (
                <>
                  {documentTitle}
                  <EditOutlinedIcon
                    sx={{ marginLeft: "8px", verticalAlign: "middle", cursor: "pointer" }}
                    onClick={handleTitleDoubleClick}
                  />
                </>
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <Typography
              sx={{
                pr: "5px",
                color: "#1C4C82",
                textAlign: "left",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
              Save As
            </Typography>
            <KeyboardArrowDownOutlinedIcon
              htmlColor="#1C4C82"
              sx={{
                padding: "3px",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginRight: "0.5rem" }}>
          <Button
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: sidebarOpen ? "50%" : "5rem",
              border: "1px solid #E0E0E0",
              transition: "all .5s linear",
              padding: "1rem",
            }}
            onClick={toggleSidebar}
          >
            <KeyboardTabOutlinedIcon
              sx={{
                transition: "all .25s linear",
                transform: sidebarOpen ? "rotate(0deg)" : "rotate(-180deg)",
                marginRight: sidebarOpen ? "0" : ".5rem",
              }}
            />
            {!sidebarOpen && (
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  textTransform: "capitalize",
                }}
              >
                Open Sidebar
              </Typography>
            )}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

import * as React from "react";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

function TeamRegistration() {
  const [registered, setRegsitered] = useState(false);
  // const [extraPlayers, setextraPlayers] = useState([]);
  const [hasError, sethasError] = useState(false);
  const [displayMessage, setdisplayMessage] = useState("");
  const [team, setteam] = useState({
    name: "Software 5th sem Team A",
    year: "2018",
    semester: "5th",
    faculty: "Software",
    memberIds: [],
    coach: "",
    manager: "",
    captain: "",
    sportId: "",
  });
  const students = [
    { label: "Sunil Poudel" },
    { label: "Anil Bhujel" },
    { label: "Utasb Gurung" },
    { label: "Biwash Thapa" },
  ];
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // const isObjEmpty=(obj)=>{
  //   if (obj && Object.keys(obj).length === 0
  //   && Object.getPrototypeOf(obj) === Object.prototype) {
  //     return true;
  //   }
  //   else return false;
  // }

  const handleRegister = () => {
    if (
      !registered &&
      team.memberIds.length !== 0 &&
      team.captain.length !== 0 &&
      team.coach.length !== 0 &&
      team.manager.length !== 0
    ) {
      setdisplayMessage("Successfully registered a Team");
      console.log("team register vayo!");
      console.log(team);
      sethasError(false);
      setRegsitered(!registered);
      setOpen(!open);
    } else if (registered) {
      console.log("leave hanyo! ");
      sethasError(true);
      setdisplayMessage("You Left the Team");
      setteam({
        name: "Software 5th sem Team A",
        year: "2018",
        semester: "5th",
        faculty: "Software",
        memberIds: [],
        coach: "",
        manager: "",
        captain: "",
        sportId: "",
      });
      setRegsitered(!registered);
      setOpen(!open);
    } else {
      sethasError(true);
      setdisplayMessage("Please Fill the empty fields");
      setOpen(!open);
      console.log("partner chaina");
    }
  };

  const handleLimitedPlayers = (checkIn, maxLimit) => {
    if (checkIn.length >= maxLimit) return true;
    else return false;
  };
  return (
    <>
      <div
        className="banner"
        style={{
          minHeight: "30vh",
          backgroundImage:
            "url(https://i2-prod.irishmirror.ie/incoming/article8074062.ece/ALTERNATES/s1227b/Atletico-Madrid-v-Real-Madrid.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <Container sx={{ marginTop: 5 }}>
        <Stack spacing={3}>
          <Typography variant="h4">Football</Typography>
          <p>
            Fact: There are over 318 billion different possible positions after
            four moves each.
          </p>
          {!registered ? (
            <Stack spacing={{ xs: 2, md: 4 }}>
              <div>
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option.label === value.label
                  }
                  disablePortal
                  options={students}
                  onChange={(e) =>
                    setteam((prev) => {
                      return { ...prev, manager: e.target.value };
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Manager" variant="standard" />
                  )}
                />
              </div>
              <div>
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option.label === value.label
                  }
                  disablePortal
                  options={students}
                  onChange={(e) =>
                    setteam((prev) => {
                      return { ...prev, captain: e.target.value };
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Captain" variant="standard" />
                  )}
                />
              </div>
              <div>
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option.label === value.label
                  }
                  multiple
                  onChange={(event, value) =>
                    setteam((prev) => {
                      return {
                        ...prev,
                        memberIds: [...team.memberIds, ...value],
                      };
                    })
                  }
                  options={students}
                  getOptionDisabled={() =>
                    handleLimitedPlayers(team.memberIds, 2)
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" label="Players" />
                  )}
                />
              </div>
              <div>
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option.label === value.label
                  }
                  disablePortal
                  onChange={(e) =>
                    setteam((prev) => {
                      return { ...prev, coach: e.target.value };
                    })
                  }
                  options={students}
                  renderInput={(params) => (
                    <TextField {...params} label="Coach" variant="standard" />
                  )}
                />
              </div>
              <div>
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option.label === value.label
                  }
                  multiple
                  options={students}
                  getOptionDisabled={() =>
                    handleLimitedPlayers(team.memberIds, 5)
                  }
                  onChange={(event, value) =>
                    setteam((prev) => {
                      return {
                        ...prev,
                        memberIds: [...team.memberIds, ...value],
                      };
                    })
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" label="Extras" />
                  )}
                />
              </div>
            </Stack>
          ) : (
            <div>
              <Typography variant="h6">Team Members</Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    lg: "repeat(12,1fr)",
                    xs: "repeat(2,1fr)",
                    md: "repeat(6,1fr)",
                  },
                }}
              >
                {team.memberIds.map((member, index) => (
                  <Chip
                    sx={{ m: 1 }}
                    key={index}
                    label={member.label}
                    variant="outlined"
                  />
                ))}
              </Box>
            </div>
          )}
          <Button
            variant="contained"
            sx={{ width: 150, alignSelf: "center" }}
            onClick={() => handleRegister()}
          >
            {registered ? "Leave" : "Register"}
          </Button>
          <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={hasError ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {displayMessage}
            </Alert>
          </Snackbar>
          <Typography variant="h4">Rules</Typography>
          <ul>
            <li>
              The King may move one square in any direction, so long as no piece
              is blocking his path.
            </li>
            <li>
              The Queen may move any number of squares straight or diagonally in
              any direction.
            </li>
            <li>
              The Rook may move in a straight line, any number of squares
              horizontally or vertically.
            </li>
          </ul>
        </Stack>
      </Container>
    </>
  );
}

export default TeamRegistration;

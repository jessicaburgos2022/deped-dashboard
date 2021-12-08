import React, { useState } from "react";
import { Container, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import "../../styles/interface.css";
import SearchFilter from "./_components/SearchFilter";
import Table from "./_components/DataTable";
// import BC from "./_components/Header";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Create from "./_components/NewInterface";
import "./_css/interface.css";

const InterfaceScreen = (props) => {
  const [createIsOpen, setCreateOpen] = useState(false);
  const userState = useSelector(state => state.user);
  function isAdmin(){
    return userState && userState.userInfo && userState.userInfo.details && userState.userInfo.details.Title && userState.userInfo.details.Title === "Administrator"? true : false
  }
  return (
    <div style={{ height:"100vh",overflow:"auto"}}>
      <div className="text">E2E Interfaces</div>
      <Container fixed maxWidth={true}>
        {/* <div style={{ display: isAdmin()?'flex':'none', padding: "10px 0px" }}>
          <IconButton
            size="small"
            onClick={() => setCreateOpen(true)}
            style={{ marginLeft: "auto" }}
          >
            <AddCircleOutlineIcon color="primary" />
          </IconButton>
        </div> */}
        <SearchFilter/>
        <Table />
        {createIsOpen && (
          <Create
            open={createIsOpen}
            handleClose={() => setCreateOpen(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default InterfaceScreen;

import React, { useEffect, useState } from "react";
import Table from "./table";
import "./rolemanagement.css";
import CreateRole from "./forms/createRole";
import { Button, Container } from "@material-ui/core";
import { searchRoleAction } from "../../../actions/roleManagementActions";
import { useDispatch } from "react-redux";
export default () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchRoleAction());
  }, [])
  return (
    <>
      <div style={{ marginTop: 80 }}>
        <Container>
          <Button onClick={() => setIsCreateOpen(true)} variant="contained" color="primary">Create Role</Button>
        </Container>
        <Table />
      </div>
      {isCreateOpen && (
        <CreateRole
          openCreateForm={isCreateOpen}
          setOpenCreate={setIsCreateOpen}
        />
      )}
    </>
  );
};

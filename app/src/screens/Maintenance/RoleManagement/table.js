import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import {
  searchRoles,
  searchActions,
  deleteRole
} from "../../../actions/roleManagementActions";
import {
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Container,
  Button,
} from "@material-ui/core";
import EditForm from "./forms/editAction";
import MessageBar from "../../../components/MessageBar";
export default () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.roles);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(0);
  const deleteConfirmationRef = React.createRef();
  useEffect(() => {
    dispatch(searchRoles());
    dispatch(searchActions());
  }, [dispatch]);
  const distinctRoles = [
    ...new Map(store.roles.map((item) => [item["Id"], item])).values(),
  ];
  const handleDelete = async (roleId) => {
    const modal = deleteConfirmationRef.current;
    setTimeout(async () => {
      try {
        await modal.show();
        await dispatch(
          deleteRole(roleId)
        );
        dispatch(searchRoles());
        dispatch(searchActions());
        await modal.hide();
      } catch (err) {
        await modal.hide();
      }
    }, 100);
  };
  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><span style={{fontWeight:'bold'}}>Role Id</span></TableCell>
            <TableCell><span style={{fontWeight:'bold'}}>Title</span></TableCell>
            <TableCell><span style={{fontWeight:'bold'}}>Description</span></TableCell>
            <TableCell><span style={{fontWeight:'bold'}}>Status</span></TableCell>
            <TableCell><span style={{fontWeight:'bold'}}>Actions</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {distinctRoles.map((r) => {
            return (
              <TableRow>
                <TableCell><span style={{fontWeight:'bold'}}>{r.Id}</span></TableCell>
                <TableCell><span style={{fontWeight:'bold'}}>{r.Name}</span></TableCell>
                <TableCell><span style={{fontWeight:'bold'}}>{r.Description}</span></TableCell>
                <TableCell>{r.RoleIsActive?'Enabled':'Disabled'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedRoleId(r.Id);
                      setEditOpen(!isEditOpen);
                    }}
                  >
                    Edit
                  </Button>
                  {
                    r.Name !== "Administrator" && r.Name !== "Default" &&
                    <Button onClick={() => handleDelete(r.Id)} style={{marginLeft:10}}
                      color="secondary">Delete</Button>
                  }
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isEditOpen && (
        <EditForm
          openEditForm={isEditOpen}
          roleId={selectedRoleId}
          setEditOpen={setEditOpen}
        />
      )}
      {alert.message === "" ? null : <MessageBar />}
      
      <ConfirmationDialog
        ref={deleteConfirmationRef}
        open={false}
        confirmTitle="Confirmation"
        confirmationDetail="Are you sure you want to delete this record?"
        confirmButtonText="Yes"
        cancelButtonText="No"
      ></ConfirmationDialog>
    </Container>
  );
};

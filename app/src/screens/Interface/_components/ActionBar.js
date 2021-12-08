import { Button, Paper } from "@material-ui/core";
import React, { useState } from "react";
import {
  deleteMultipleInterface,
  searchInterface,
} from "../../../actions/interfaceActions";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import EditInterface from "./EditInterface";
import AddInterface from "./NewInterface";
import {AddOutlined ,EditOutlined,DeleteOutlined, BugReportOutlined, StorageOutlined, ConfirmationNumberOutlined, InsertChartOutlined, FolderSpecialOutlined} from '@material-ui/icons';

export default (props) => {
  const dispatch = useDispatch();
  const userState = useSelector((s) => s.user);
  const { setActiveSubModule, selectedInterfaces } = props;
  const [isEditOpen, setEditOpen] = useState(false);
  const [isAddOpen, setAddOpen] = useState(false);
  const state = useSelector((state) => state.user)

  function hasAccess(actionId) {
    if (state && state.userInfo && state.userInfo.role && state.userInfo.role.find(r => r.ActionId === actionId)) {
      return  state.userInfo.role.filter(r => r.ActionId === actionId).length > 0;
    }
    return false;
  }
  const deleteHandler = async (interfaceIds) => {
    Swal.fire({
      title: "Do you want to delete the interface(s)?",
      text: "Once deleted, this will not be recoverable",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then(async (r) => {
      if (r.isConfirmed) {
        var ret = await dispatch(
          deleteMultipleInterface({
            InterfaceId: interfaceIds,
            UserId: userState.userInfo.user_id,
          })
        );
        Swal.fire(
          ret.Message.split("|")[0],
          ret.Message.split("|")[1],
          ret.Message.split("|")[0] === "Success" ? "success" : "error"
        );

        dispatch(
          searchInterface({
            BusinessUnit: "",
            ObjectId: "",
            InterfaceId: "",
            InterfaceName: "",
          })
        );
      }
    });
  };
  return (
    <React.Fragment>
      {hasAccess(17) && isEditOpen && selectedInterfaces.length !== 0 && (
        <EditInterface
          interfaceId={selectedInterfaces[0]}
          open={isEditOpen}
          handleClose={() => setEditOpen(false)}
        />
      )}
      {hasAccess(22) && isAddOpen && (
        <AddInterface
          open={isAddOpen}
          handleClose={() => setAddOpen(false)}
        />
      )}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddOutlined />}
        onClick={() => setAddOpen(true)}
        disabled={!hasAccess(22)}
        style={{ display: hasAccess(22) ? 'absolute' : 'none', marginBottom:3 }}
      >
        New
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<EditOutlined />}
        onClick={() => setEditOpen(true)}
        disabled={selectedInterfaces.length !== 1 || !hasAccess(17)}
        style={{ marginLeft: 3, display: hasAccess(17) ? 'absolute' : 'none', marginBottom:3 }}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<DeleteOutlined />}
        onClick={() => deleteHandler(selectedInterfaces)}
        disabled={selectedInterfaces.length === 0 || !hasAccess(18)}
        style={{ marginLeft: 3, display: hasAccess(18) ? 'absolute' : 'none', marginBottom:3 }}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<StorageOutlined />}
        onClick={() => {
          if (selectedInterfaces && Array.isArray(selectedInterfaces) && selectedInterfaces.length > 30) {
            Swal.fire({
              title: "You have selected multiple interfaces which may cause performance issue.",
              text: "Do you want to continue?",
              icon: "warning",
              focusConfirm: true,
              buttons: true,
              showCancelButton: true,
              confirmButtonText: "Yes",
              denyButtonText: "No"
            }).then(async (r) => {
              if (r.isConfirmed) {
                setActiveSubModule(1);
              }
            });
          }
          else {
            setActiveSubModule(1);
          }
        }
        }
        disabled={selectedInterfaces.length < 1}
        style={{ marginLeft: 3, marginBottom:3 }}
      >
        SAP BAPI
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ConfirmationNumberOutlined />}
        onClick={() => setActiveSubModule(2)}
        disabled={selectedInterfaces.length !== 1}
        style={{ marginLeft: 3, marginBottom:3 }}
      >
        Related Tickets
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<FolderSpecialOutlined />}
        onClick={() => setActiveSubModule(3)}
        disabled={selectedInterfaces.length !== 1}
        style={{ marginLeft: 3, marginBottom:3 }}
      >
        Subversion
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<BugReportOutlined />}
        onClick={() => setActiveSubModule(4)}
        disabled={selectedInterfaces.length !== 1}
        style={{ marginLeft: 3 , marginBottom:3}}
      >
        Errors
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<InsertChartOutlined />}
        onClick={() => setActiveSubModule(5)}
        disabled={selectedInterfaces.length !== 1}
        style={{ marginLeft: 3, marginBottom:3 }}
      >
        Performance Analysis
      </Button>
    </React.Fragment>
  );
};

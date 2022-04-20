import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  Switch,
  Typography,
  FormControlLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createRole,
  searchRoles,
  searchActions,
} from "../../../../actions/roleManagementActions";
export default (props) => {
  const { openCreateForm, setOpenCreate } = props;
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(true);
  const [title, setTitle] = useState("");
  const submitNewRole = async () => {
    await dispatch(createRole(title, isActive));
    setOpenCreate(false);
    await dispatch(searchRoles());
    await dispatch(searchActions());
  };
  return (
    <>
      <Dialog open={openCreateForm}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 30px 0 30px",
          }}
        >
          <Typography variant="h5">Create New Role</Typography>
        </div>
        <DialogContent>
          <div style={{ padding: 30 }}>
            <TextField
              autoFocus
              required={true}
              margin="dense"
              type="text"
              fullWidth
              value={title}
              name="value01"
              id="value01"
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              size="small"
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  variant="contained"
                  color="secondary"
                  onChange={(e) => {
                    setIsActive(!isActive);
                  }}
                />
              }
              label={isActive ? "Enabled" : "Disabled"}
            />
          </div>
          <div style={{ float: "right" }}>
            <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 20 }}
              onClick={() => submitNewRole()}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

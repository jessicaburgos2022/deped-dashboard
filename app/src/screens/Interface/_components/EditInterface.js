import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormInputErrorLabel from "../../../components/FormInputErrorLabel";

import {
  editInterface,
  searchInterface,
} from "../../../actions/interfaceActions";
import {
  logout
} from "../../../actions/userActions";
import moment from "moment";

function groupByKey(array, key) {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});
}
function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
export default (props) => {
  const { open, handleClose, interfaceId } = props;
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control, setValue, getValues } =
    useForm();
  const businessUnitState = useSelector((state) => state.businessUnitReducer);
  const interfaceState = useSelector((state) => state.interfaceReducer);
  const userState = useSelector((state) => state.user);
  const selectedData = interfaceState.interfaces.find(
    (r) => r.id === interfaceId
  );
  const value = getValues("DateDeployed");
  const [date, setSelectedDate] = React.useState(
    new Date(moment(selectedData.date_deployed).format("YYYY-MM-DD"))
  );
  useEffect(() => {
    register("DateDeployed");
    register("UserID");
    register("UId");
  }, [register]);
  useEffect(() => {
    setSelectedDate(date || null);
    setValue("DateDeployed", date);
    setValue("UserID", userState.userInfo.user_id);
    setValue("UId", interfaceId);
  }, [
    setSelectedDate,
    value,
    setValue,
    userState.userInfo.user_id,
    interfaceId,
    date,
  ]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue("DateDeployed", date);
  };
  const onSubmit = async (data) => {
    var ret = await dispatch(editInterface(data));
    Swal.fire(
      ret.Status,
      ret.Message,
      ret.Status === "Success" ? "success" : "error"
    );
    
    handleClose();

    dispatch(
      searchInterface({
        BusinessUnit: "",
        ObjectId: "",
        InterfaceId: "",
        InterfaceName: "",
      })
    );
  };
  const GenerateOptions = () => {
    var Options = [];
    if (businessUnitState.businessUnits) {
      var groupedList = groupBy(
        businessUnitState.businessUnits,
        (data) => data.country_id
      );
      var groupedByKey = groupByKey(
        businessUnitState.businessUnits,
        "country_id"
      );
      for (var key in groupedByKey) {
        var obj = groupedByKey[key];
        Options.push(
          <optgroup label={obj[0].Country} key={obj[0].country_id}>
            {groupedList.get(obj[0].country_id).map((r) => {
              return (
                <option value={r.id} key={r.id}>
                  {r.name}
                </option>
              );
            })}
          </optgroup>
        );
      }
    }
    return Options;
  };
  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Interface
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} id="edit-interface">
          <DialogContent dividers>
            <div className="form-group">
              <FormControl fullWidth>
                <InputLabel htmlFor="grouped-native-select">BU</InputLabel>
                <Controller
                  control={control}
                  name="BusinessUnit"
                  defaultValue={selectedData.businessunit_id}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  as={
                    <Select
                      native
                      value={getValues("BusinessUnit")}
                      id="grouped-select"
                    >
                      <option aria-label="None" value="" />
                      {<GenerateOptions />}
                    </Select>
                  }
                />
              </FormControl>
              {errors.BusinessUnit ? (
                <FormInputErrorLabel message={errors.BusinessUnit.message} />
              ) : null}
            </div>
            <div className="form-group">
              <Controller
                control={control}
                name="ObjectID"
                defaultValue={selectedData.object_id}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                as={
                  <TextField
                    label="Object ID"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={errors.ObjectID != null}
                    helperText={errors.ObjectID ? errors.ObjectID.message : ""}
                  />
                }
              />
            </div>
            <div className="form-group">
              <Controller
                control={control}
                name="InterfaceName"
                defaultValue={selectedData.interface_id}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                as={
                  <TextField
                    label="Interface Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={errors.InterfaceName != null}
                    helperText={
                      errors.InterfaceName ? errors.InterfaceName.message : ""
                    }
                  />
                }
              />
            </div>

            <div className="form-group">
              <Controller
                control={control}
                name="InterfaceDescription"
                defaultValue={selectedData.interface_name}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                as={
                  <TextField
                    label="Interface Description"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={errors.InterfaceDescription != null}
                    helperText={
                      errors.InterfaceDescription
                        ? errors.InterfaceDescription.message
                        : ""
                    }
                  />
                }
              />
            </div>
            <div className="form-group">
              <Controller
                control={control}
                name="SVNPath"
                defaultValue={selectedData.svn_path}
                rules={{
                  required: { value: false, message: "This field is required" },
                }}
                as={
                  <TextField
                    label="SVN Path"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={errors.SVNPath != null}
                    helperText={errors.SVNPath ? errors.SVNPath.message : ""}
                  />
                }
              />
            </div>

            <div className="form-group">
              <FormControl fullWidth>
                <InputLabel htmlFor="grouped-native-select">
                  Is Active
                </InputLabel>
                <Controller
                  control={control}
                  name="IsActive"
                  defaultValue={selectedData.isActive}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  as={
                    <Select
                      native
                      value={getValues("IsActive")}
                      id="grouped-select"
                    >
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                    </Select>
                  }
                />
              </FormControl>
              {errors.BusinessUnit ? (
                <FormInputErrorLabel message={errors.BusinessUnit.message} />
              ) : null}
            </div>
            <div className="form-group">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="dialog"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date Deployed"
                    value={date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
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
  insertInterface,
  searchInterface,
} from "../../../actions/interfaceActions";

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
  const { open, handleClose } = props;
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control, setValue, getValues } =
    useForm();
  const businessUnitState = useSelector((state) => state.businessUnitReducer);
  const userState = useSelector((state) => state.user);
  const value = getValues("DateDeployed");
  const [date, setSelectedDate] = React.useState(new Date("2014-08-18"));
  useEffect(() => {
    register("DateDeployed");
    register("UserID");
  }, [register]);
  useEffect(() => {
    setSelectedDate(value || null);
    setValue("UserID", userState.userInfo.user_id);
  }, [setSelectedDate, value, setValue, userState.userInfo.user_id]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue("DateDeployed", date, { shouldValidate: true, shouldDirty: true });
  };
  const onSubmit = async (data) => {
    var ret = await dispatch(insertInterface(data));
    console.log(ret.Message);
    Swal.fire(
      ret.Message.split("|")[0],
      ret.Message.split("|")[1],
      ret.Message.split("|")[0] === "Success" ? "success" : "error"
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
          New Interface
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} id="new-interface">
          <DialogContent dividers>
            <div className="form-group">
              <FormControl fullWidth error={errors.BusinessUnit != null}>
                <InputLabel htmlFor="grouped-native-select">Market</InputLabel>
                <Controller
                  control={control}
                  name="BusinessUnit"
                  defaultValue=""
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
                <FormHelperText>
                  {errors.BusinessUnit ? errors.BusinessUnit.message : ""}
                </FormHelperText>
              </FormControl>
            </div>

            <div className="form-group">
              <Controller
                control={control}
                name="ObjectID"
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
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

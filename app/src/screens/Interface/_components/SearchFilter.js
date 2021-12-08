import {
  Box,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { searchInterface } from "../../../actions/interfaceActions";

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
export default () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 140,
      height: "small",
    },
  }));
  const classes = useStyles();
  const { handleSubmit, control, getValues } = useForm();
  const {bu} = useParams();
  const dispatch = useDispatch();
  const businessUnitState = useSelector((state) => state.businessUnitReducer);
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
          <optgroup key={obj[0].country_id} label={obj[0].Country}>
            {groupedList.get(obj[0].country_id).map((r, e) => {
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
  useEffect(() => {
    dispatch(
      searchInterface({
        BusinessUnit: bu,
        ObjectId: "",
        InterfaceId: "",
        InterfaceName: "",
      })
    );
  }, [dispatch]);
  const onSubmit = (data) => {
    dispatch(searchInterface(data));
  };
  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="search-interface-form"
        autoComplete="off"
      >
        <Paper style={{borderRadius:0}}>
          <h4 style={{ padding: "20px 0 0 30px" }}>Search Filter</h4>
          <Box className="search-container">
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="grouped-native-select">Market</InputLabel>
              <Controller
                control={control}
                name="BusinessUnit"
                defaultValue={bu}
                as={
                  <Select id="grouped-select" native value={getValues("BusinessUnit")} >
                    <option value="">
                    </option>
                    {<GenerateOptions />}
                  </Select>
                }
              />
            </FormControl>
            {/* <FormControl className={classes.formControl}>
              <Controller
                control={control}
                name="ObjectId"
                defaultValue=""
                as={
                  <TextField
                    label="Object ID"
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </FormControl> */}
            <FormControl className={classes.formControl}>
              <Controller
                control={control}
                name="InterfaceId"
                defaultValue=""
                as={
                  <TextField
                    label="Interface Name"
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <Controller
                control={control}
                name="InterfaceName"
                defaultValue=""
                as={
                  <TextField
                    label="Interface Description"
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </FormControl>
            <div className="searchbtn-container">
              <div className="ml-1">
                <Button type="Submit" variant="contained" color="primary">
                  Search
                </Button>
              </div>
            </div>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};

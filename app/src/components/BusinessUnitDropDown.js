import { Select } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
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
  const buState = useSelector((s) => s.businessUnitReducer);

  if (buState.businessUnits) {
    var groupedList = groupBy(buState.businessUnits, (data) => data.country_id);
    var groupedByKey = groupByKey(buState.businessUnits, "country_id");
    for (var key in groupedByKey) {
      var obj = groupedByKey[key];
      console.log(groupedList.get(obj[0].country_id));
    }
  }
  const generateOption = () => {
    var Gen;
    for (var key in groupedByKey) {
      var obj = groupedByKey[key];
      Gen.push(<option value={`${groupedList.get(obj[0].id)}`}>${groupedList.get(obj[0].name)}</option>)
      console.log(groupedList.get(obj[0].country_id));
    }
    return Gen;
  };
  return (
    <Select native defaultValue="" id="grouped-native-select">
      <option aria-label="None" value="" />
      {
      }
      <optgroup label="Philippines">
        <option value={1}>ZPC</option>
        <option value={2}>MDI</option>
      </optgroup>
      <optgroup label="Category 2">
        <option value={3}>Option 3</option>
        <option value={4}>Option 4</option>
      </optgroup>
    </Select>
  );
};

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { register as UserRegistration } from '../../../actions/userActions';
import { fetchUnitByDepartmentId } from '../../../actions/appActions';


export default (props) => {
    const { open, handleClose, handleRefresh } = props;
    //react hook form
    const { handleSubmit, errors, control, setValue, register } = useForm();
    const appState = useSelector((state) => state.app);
    const userState = useSelector((state) => state.user);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const dispatch = useDispatch();
    const onSubmit = async (input) => {
        input.departmentid = selectedDepartmentId;
        if (input) {
            if (
                userState.userInfo &&
                userState.userInfo.acc &&
                userState.userInfo.acc[0] &&
                userState.userInfo.acc[0].Id
            ) {
                var ret = await dispatch(UserRegistration(input));
                Swal.fire(
                    ret.result,
                    ret.message,
                    ret.result === "Success" ? "success" : "error"
                );
                if (ret.result === "Success") {
                    handleRefresh();
                    handleClose();
                }
            }
        }
    };
    useEffect(() => {
        dispatch(fetchUnitByDepartmentId(selectedDepartmentId))
    }, [selectedDepartmentId])
    return (
        <React.Fragment>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="sm"
                fullWidth
            >
                <form onSubmit={handleSubmit(onSubmit)} id="register-user">
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        User Registration
                    </DialogTitle>
                    <DialogContent dividers>
                        <FormGroup style={{ padding: '10px 0 10px 0' }}>
                            <FormGroup>
                                <InputLabel>Department</InputLabel>
                                <Select
                                    fullWidth
                                    className="output-category-margin"
                                    name="departmentid"
                                    onChange={(e) => setSelectedDepartmentId(e.target.value)}
                                    value={selectedDepartmentId}
                                >
                                    {appState.departments.map((department, id) => {
                                        return (
                                            <MenuItem key={id} value={department.Id}>
                                                {department.Name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>
                                    {errors.departmentid ? errors.departmentid.message : ""}
                                </FormHelperText>
                            </FormGroup>
                            <FormGroup style={{ padding: '10px 0 10px 0' }}>
                                <InputLabel>Unit</InputLabel>
                                <Controller
                                    control={control}
                                    name="unitid"
                                    rules={{
                                        required: {
                                            value: false,
                                            message: "This field is required",
                                        },
                                    }}
                                    as={
                                        <Select
                                            label="Unit"
                                            fullWidth
                                            className="output-category-margin"
                                            name="unitid"
                                        >
                                            {
                                                appState.unitsByActiveDepartment.data && Array.isArray(appState.unitsByActiveDepartment.data) && appState.unitsByActiveDepartment.data.map(d => {
                                                    return (
                                                        <MenuItem value={d.Id} key={`units-${d.DepartmentId}-${d.id}`}>
                                                            {d.Name}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    }
                                />
                                <FormHelperText>
                                    {errors.departmentid ? errors.departmentid.message : ""}
                                </FormHelperText>
                            </FormGroup>
                            <FormGroup style={{ padding: '10px 0 10px 0' }}>
                                <InputLabel>Role</InputLabel>
                                <Controller
                                    control={control}
                                    name="roleid"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "This field is required",
                                        },
                                    }}
                                    as={
                                        <Select
                                            label="Role"
                                            fullWidth
                                            className="output-category-margin"
                                            name="roleid"
                                        >
                                            {
                                                appState.roleList && Array.isArray(appState.roleList) && appState.roleList.map(r => {
                                                    return <MenuItem value={r.Id}>{r.Name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    }
                                />
                                <FormHelperText>
                                    {errors.roleid ? errors.roleid.message : ""}
                                </FormHelperText>
                            </FormGroup>

                            <Controller style={{ padding: '10px 0 10px 0' }}
                                control={control}
                                name="username"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }}
                                as={
                                    <TextField
                                        label="Username"
                                        name="username"
                                        className="output-margin"
                                        variant="outlined"
                                        size="small"
                                        error={errors.username != null}
                                        helperText={errors.username ? errors.username.message : ""}
                                    />
                                }
                            />

                            <Controller style={{ padding: '10px 0 10px 0' }}
                                control={control}
                                name="password"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }}
                                as={
                                    <TextField
                                        label="Password"
                                        type="password"
                                        name="password"
                                        className="output-margin"
                                        variant="outlined"
                                        size="small"
                                        error={errors.password != null}
                                        helperText={errors.password ? errors.password.message : ""}
                                    />
                                }
                            />
                            <Controller style={{ padding: '10px 0 10px 0' }}
                                control={control}
                                name="firstname"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }}
                                as={
                                    <TextField
                                        label="First Name"
                                        name="firstname"
                                        className="output-margin"
                                        variant="outlined"
                                        size="small"
                                        error={errors.firstname != null}
                                        helperText={errors.firstname ? errors.firstname.message : ""}
                                    />
                                }
                            />
                            <Controller style={{ padding: '10px 0 10px 0' }}
                                control={control}
                                name="middlename"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }}
                                as={
                                    <TextField
                                        label="Middle Name"
                                        name="middlename"
                                        className="output-margin"
                                        variant="outlined"
                                        size="small"
                                        error={errors.middlename != null}
                                        helperText={errors.middlename ? errors.middlename.message : ""}
                                    />
                                }
                            />
                            <Controller style={{ padding: '10px 0 10px 0' }}
                                control={control}
                                name="surname"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }}
                                as={
                                    <TextField
                                        label="Last Name"
                                        name="surname"
                                        className="output-margin"
                                        variant="outlined"
                                        size="small"
                                        error={errors.surname != null}
                                        helperText={errors.surname ? errors.surname.message : ""}
                                    />
                                }
                            />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="output-margin"
                            variant="contained"
                            style={{ width: "100%" }}
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )
}
import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { changePassword } from '../../../actions/userActions';
export default () => {

    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    //react hook form
    const { handleSubmit, errors, control, setValue, register, reset } = useForm();
    const onSubmit = async (input) => {
        if (input) {
            if (
                userState.userInfo &&
                userState.userInfo.acc &&
                userState.userInfo.acc[0] &&
                userState.userInfo.acc[0].Id
            ) {
                input.username = userState.userInfo.acc[0].Username;
                if (input.newpassword !== input.repeatnewpassword) {
                    Swal.fire(
                        "Failed",
                        "New password and Repeat New password should match",
                        "error"
                    );
                    return;
                }
                else {
                    var ret = await dispatch(changePassword(input));
                    Swal.fire(
                        ret ? ret.result : 'Failed',
                        ret ? ret.message : 'Query Failed, Please contact your system administrator',
                        ret.result === "Success" ? "success" : "error"
                    );
                }
            }
        }
        reset({
            currentpassword: "",
            newpassword: "",
            repeatnewpassword: ""
        }, {
            keepErrors: true,
            keepDirty: true,
            keepIsSubmitted: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false,
        });
    };
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Change Password</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Maintenance</a></li>
                                <li className="breadcrumb-item active">Change Password</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit(onSubmit)} id="add-kra">
                        <div className="row">
                            <div className="col-12 mb-3">
                                <Controller
                                    control={control} name="currentpassword"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "This field is required",
                                        },
                                    }}
                                    as={
                                        <TextField
                                            label="Current Password"
                                            name="currentpassword"
                                            rows={4}
                                            maxRows={4}
                                            className="output-margin form-control"
                                            variant="outlined"
                                            size="small"
                                        />
                                    }
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <Controller
                                    control={control} name="newpassword"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "This field is required",
                                        },
                                    }}
                                    as={
                                        <TextField
                                            label="New Password"
                                            name="newpassword"
                                            rows={4}
                                            maxRows={4}
                                            className="output-margin form-control"
                                            variant="outlined"
                                            size="small"
                                        />
                                    }
                                />
                            </div>

                            <div className="col-12 mb-3">
                                <Controller
                                    control={control}
                                    name="repeatnewpassword"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "This field is required",
                                        },
                                    }}
                                    as={
                                        <TextField
                                            label="Repeat new password"
                                            name="repeatnewpassword"
                                            rows={4}
                                            maxRows={4}
                                            className="output-margin form-control"
                                            variant="outlined"
                                            size="small"
                                        />
                                    }
                                />
                            </div>
                            <div class="float-right d-inline-flex">
                                <Button
                                    className="output-margin btn mr-3"
                                    variant="contained"

                                    color="primary"
                                    type="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
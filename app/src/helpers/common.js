export const hasAccess = (rolesAccess, actionId) => {
    const hasAccess = rolesAccess && Array.isArray(rolesAccess) && rolesAccess.find(r => r.ActionId === actionId);
    return hasAccess;
}

export const isOfficeAccessible = (userState, EntityOfficeId) => {
    return userState && userState.userInfo && userState.userInfo.acc && Array.isArray(userState.userInfo.acc) && userState.userInfo.acc[0] && userState.userInfo.acc[0].DepartmentId === EntityOfficeId;
}
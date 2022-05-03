export const hasAccess = (userState, actionId) => {
  const hasAccess =
    userState &&
    userState.userInfo &&
    userState.userInfo.role &&
    Array.isArray(userState.userInfo.role) &&
    userState.userInfo.role.find((r) => r.ActionId === actionId);
  return hasAccess || isUserSuperAdmin(userState);
};

export const isOfficeAccessible = (userState, EntityOfficeId) => {
  return (
    (userState &&
      userState.userInfo &&
      userState.userInfo.acc &&
      Array.isArray(userState.userInfo.acc) &&
      userState.userInfo.acc[0] &&
      userState.userInfo.acc[0].DepartmentId === EntityOfficeId) ||
    isUserSuperAdmin(userState)
  );
};

export const isUserSuperAdmin = (userState) => {
  return (
    userState &&
    userState.userInfo &&
    userState.userInfo.acc &&
    Array.isArray(userState.userInfo.acc) &&
    userState.userInfo.acc[0] &&
    userState.userInfo.acc[0].RoleId === 1
  );
};

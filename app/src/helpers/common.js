export const hasAccess = (rolesAccess, roleid, actionId) => {
    const hasAccess = rolesAccess && Array.isArray(rolesAccess) && rolesAccess.find(r => r.action_id === actionId && r.role_id === roleid);
    return hasAccess;
}
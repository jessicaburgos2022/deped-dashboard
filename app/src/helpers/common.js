export const hasAccess = (rolesAccess, actionId) => {
    const hasAccess = rolesAccess && Array.isArray(rolesAccess) && rolesAccess.find(r => r.ActionId === actionId);
    return hasAccess;
}
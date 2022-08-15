import useAxios from ".";
import { toFormData } from "../util/helpers";

export const get_workspace_data = () => {
  return useAxios.get("/workspaces");
};

export const create_workspace = (data) => {
  return useAxios.post("/workspaces", data);
};

export const update_workspace = (id, data) => {
  const formData = toFormData(data);
  return useAxios.patch(`/workspaces/${id}`, formData);
};

export const add_workspace_member = (id, email) => {
  return useAxios.put(`workspaces/${id}/add-team-members`, {
    userEmail: email,
  });
};

export const change_workspace_member_role = (spaceId, { id, role }) => {
  return useAxios.put(`workspaces/${spaceId}/member-role`, {
    memberId: id,
    requestFor: role,
  });
};

export const get_space_data = (spaceId) => {
  return useAxios.get(`/spaces`, {
    params: { workspaceId: spaceId },
  });
};

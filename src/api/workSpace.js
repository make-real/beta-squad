import useAxios from ".";
import { toFormData } from "../util/helpers";

export const get_workspace_data = () => {
  return useAxios.get("/workspaces");
};

export const get_single_workspace_data = (id) => {
  return useAxios.get(`/workspaces/${id}`);
};

export const leave_workspace = (id) => {
  return useAxios.put(`/workspaces/${id}/leave`);
};

export const archive_workspace = (id) => {
  return useAxios.delete(`/workspaces/${id}`);
};

export const create_workspace = (data) => {
  return useAxios.post("/workspaces", data);
};

export const update_workspace = (id, data) => {
  const formData = toFormData(data);
  return useAxios.patch(`/workspaces/${id}`, formData);
};

export const add_workspace_member = (id, email, designation) => {
  return useAxios.put(`workspaces/${id}/add-team-members`, {
    userEmail: email,
    guest: designation,
    role: designation,
  });
};

export const get_workspace_member = (id) => {
  return useAxios.get(`workspaces/${id}/team-members`);
};

export const change_workspace_member_role = (spaceId, { id, role }) => {
  return useAxios.put(`workspaces/${spaceId}/member-role`, {
    memberId: id,
    requestFor: role,
  });
};


export const change_workspace_member_designation = (spaceId, { id, designation}) => {
  return useAxios.patch(`workspaces/${spaceId}/team-members/${id}`, {
    designation: designation,
  });
};

export const transfer_ownership = (workspaceId, userId) => {
  return useAxios.patch(`workspaces/${workspaceId}/ownership-transfer`, {
    memberId: userId,
  });
};

export const get_space_data = (spaceId) => {
  return useAxios.get(`/spaces`, {
    params: { workspaceId: spaceId },
  });
};

export const delete_workspace = (workSpaceId) => {
  return useAxios.delete(`/workspaces/${workSpaceId}`);
};

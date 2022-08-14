import useAxios from ".";

export const get_workspace_data = (data) => {
  return useAxios.get("/workspaces");
};

export const get_space_data = (spaceId) => {
  return useAxios.get(`/spaces`, {
    params: { workspaceId: spaceId },
  });
};

import useAxios from ".";

export const get_tags = (spaceId) => {
  return useAxios.get(`workspaces/${spaceId}/tags`);
};

export const create_tag = ({ spaceId, name, color }) => {
  return useAxios.post(`workspaces/${spaceId}/tags`, {
    name,
    color,
  });
};

export const edit_tag = ({ spaceId, tagId, name, color }) => {
  return useAxios.patch(`workspaces/${spaceId}/tags/${tagId}`, {
    name,
    color,
  });
};

export const delete_tag = ({ spaceId, tagId }) => {
  return useAxios.delete(`workspaces/${spaceId}/tags/${tagId}`);
};

import useAxios from ".";



export const add_file_link = (spaceId,data) => {
    return useAxios.post(`/spaces/${spaceId}/files`,{
        title : data.title,
        link : data.link
    });
};


export const get_file_link = (spaceId) =>{
    return useAxios.get(`/spaces/${spaceId}/files`)
}


export const delete_file_link = (spaceId,spaceFileId ) => {
    
    return useAxios.delete(`spaces/${spaceId}/files/${spaceFileId}`);
};


export const update_file_link = (spaceId,spaceFileId,data ) => {
    return useAxios.patch(`spaces/${spaceId}/files/${spaceFileId}`,{
        title : data.title,
        link : data.link
    });
};


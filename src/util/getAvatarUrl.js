export const getAvatarUrl = (name) => {
    return `https://avatars.dicebear.com/api/initials/${name?.slice(0, 1)}.svg`;
};

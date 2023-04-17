export const BLOG_APP_BASE_URL = process.env.REACT_APP_BASE_URL || '';

export const APIS = {
    USERS_API: `${BLOG_APP_BASE_URL}/api/users`,
    BLOGS_API: `${BLOG_APP_BASE_URL}/api/blogs`
};

export const paginationPageSize = 7
export function getLinkImage(image: string) {
    // http://your-domain.com/storage/avatars/your-image-name.jpg
    return `${import.meta.env.VITE_API_URL}storage/${image}`;

}
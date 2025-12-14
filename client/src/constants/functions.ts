export function getLinkImage(image: string| null | undefined): string {
    // http://your-domain.com/storage/avatars/your-image-name.jpg
    if(!image){
        return "https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
    }
    return `${import.meta.env.VITE_API_URL}storage/${image}`;
}
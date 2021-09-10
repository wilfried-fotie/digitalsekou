const ALLOWED_EXTENSIONS = ['webp', 'svg', 'png', 'jpg', 'jpeg']

export const  allowOnlyPicture = (filename) => {

    let ext = (filename.name).split(".", -1)[1]
    if (ALLOWED_EXTENSIONS.includes(ext)) {
        return true
    }
    return false

}

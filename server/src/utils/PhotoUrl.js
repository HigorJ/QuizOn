export default function photoUrl(photo) {
    if(photo !== "") {
        return `http://localhost:3333/uploads/${photo}`;
    }
    
    return "";
}
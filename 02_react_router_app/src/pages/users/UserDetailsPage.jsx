import {useParams} from "react-router-dom";

export default function UserDetailsPage() {
    const {id} = useParams();
    return(
        <div>
            <h1>User Details Page: {id}</h1>
            <p>This is the user details page content.</p>
        </div>
    )
}
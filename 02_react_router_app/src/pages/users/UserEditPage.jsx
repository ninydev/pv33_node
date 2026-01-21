import {useParams} from "react-router-dom";

export default function UserEditPage() {
    const {id} = useParams();
    return(
        <div>
            <h1>User Edit Page: {id}</h1>
            <p>This is the user edit page content.</p>
        </div>
    )
}
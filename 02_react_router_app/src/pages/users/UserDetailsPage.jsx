import {useParams} from "react-router-dom";
import UserDetailsComponent from "../../components/UserComponents/ui/UserDetailsComponent.jsx";

export default function UserDetailsPage() {
    const {id} = useParams();
    return(
        <div>
            <h1>User Details Page: {id}</h1>
            <UserDetailsComponent userId={id} />
        </div>
    )
}
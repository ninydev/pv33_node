import {useParams} from "react-router-dom";
import UserUpdateComponent from "../../components/UserComponents/ui/UserUpdateComponent.jsx";

export default function UserEditPage() {
    const {id} = useParams();
    return(
        <div>
            <h1>User Edit Page: {id}</h1>
            <UserUpdateComponent userId={id} />
        </div>
    )
}
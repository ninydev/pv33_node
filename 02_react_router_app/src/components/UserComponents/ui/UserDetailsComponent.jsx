import {useUserById} from "../hooks/useUserById.js";
import {Link} from "react-router-dom";

export default function UserDetailsComponent( {userId}) {



    const {
        user,
        isLoading,
        error,
        refresh
    } = useUserById(userId)

    return(
        <div>
            <h2>User Details Component</h2>
            {isLoading && <p>Loading user data...</p>}
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
            {user && (
                <div>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={refresh} disabled={isLoading}>🔄 Refresh</button>
                    <Link  to={`/users/${user.id}/edit`} style={{textDecoration: 'none', marginLeft: '10px'}}>
                        <button style={{background: 'blue', color: 'white'}}>✏️ Edit</button>
                    </Link>
                    <Link to='/users' style={{textDecoration: 'none', marginLeft: '10px'}}>
                        <button style={{background: 'gray', color: 'white'}}>⬅️ Back to List</button>
                    </Link>
                </div>
            )}
        </div>
    )
}
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserFormInputs } from '../../types/UserFormInputs.ts';

interface UserListProps {
    onEdit: (user: UserFormInputs) => void;
}

const UserList: React.FC<UserListProps> = ({ onEdit }) => {
 return(
 <>
 </>
 );   
}


export default UserList;
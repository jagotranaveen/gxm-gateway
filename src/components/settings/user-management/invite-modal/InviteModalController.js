import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendInvites,getUserRoles } from './InviteModalSlice';
import MyEntityController from '../../../../Pages/MyEntities/MyEntityController'

const SendInviteController = () => {
    const dispatch = useDispatch();

    const { allentites } = MyEntityController();

    const inviteUsers = useSelector((state) => state.sendInvite);
    const userroles = useSelector((state) => state.inviteusers.userroles);
    

    useEffect(() => {
        dispatch(getUserRoles());
    }, [dispatch]);
    
    const handleSendInvites = (invites) => {
        dispatch(sendInvites(invites));
    };

    return {
        userroles,
        allentites,
        inviteUsers,
        handleSendInvites
    };
};

export default SendInviteController;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyEntites, downloadReports, fetchAllEntites, lastMonthReports } from './myEntitySlice';

const MyEntityController = () => {
    const dispatch = useDispatch();
    
    const myEntities = useSelector((state) => state.myentities.myEntities);
    const allentites = useSelector((state) => state.myentities.allentites);
    const entitycountrylist = useSelector((state) => state.myentities.entitycountrylist);
    const entitydatelist = useSelector((state) => state.myentities.entitydatelist);
    const headcount = useSelector((state) => state.myentities.headcount);
    const detection_rate = useSelector((state) => state.myentities.detection_rate);
    const gross_cost = useSelector((state) => state.myentities.gross_cost);
    const accuracy_rate = useSelector((state) => state.myentities.accuracy_rate);

    useEffect(() => {
        dispatch(getMyEntites());
        dispatch(fetchAllEntites());
        dispatch(lastMonthReports());
    }, [dispatch]);

    const handleChangeEntity = (e) => {
        console.log('entity value-------->', e.value);
    };

    const handleChangeCountry = (e) => {
        console.log('country value-------->', e.value);
    };

    const handleDownloadReport = () => {
        dispatch(downloadReports());
    };

    return {
        myEntities,
        allentites,
        entitycountrylist,
        entitydatelist,
        headcount,
        detection_rate,
        gross_cost,
        accuracy_rate,
        handleChangeEntity,
        handleChangeCountry,
        handleDownloadReport,
    };
};

export default MyEntityController;
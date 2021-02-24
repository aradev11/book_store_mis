import React, { useEffect ,useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';
// ERROR Component
import Error from '../../../../utils/error';

// protect unAuthorized Users
import { protect } from '../../../../utils/protect';  

// Control Panle
import { ControlPanel } from '../../../../components/controlpanel/controlpanel';

// ANT
import { Empty } from 'antd';

// Table Component
import { Table } from '../../../../components/table/Table';


// import Employee Table Layout
import { data } from '../../../../data/layout/layout-config';


const UnitView = ( { history } ) => {
    const { url } = useRouteMatch();
    const [privateData, setPrivateData] = useState([]);

    // Check if not value or no result
    const noData = !privateData || (privateData && privateData.length === 0);

    // Create Columns of Tables
    const { unitTable } = data;

    const FetchPrivateDate = async () => {
      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("auth-token")}`
          }
      }
      try {
          const { data } = await axios.get("/api/unit", config);
          if(data && data.data) 
          setPrivateData(data.data)
      } catch (err) {
          Error.notification.error(err.response.data.error);
      }
    }


    const addHandler = () => {
       history.push(`${url}/add`);
    }

    const deleteHandler = () => {
      alert("delet Hander");
    }

    useEffect(() => {
        protect(history);
        FetchPrivateDate();
    }, [history]);

    return  (
    <>
      <ControlPanel type="view" />
      {noData ? (<Empty />) : ( <Table 
      columns={unitTable} 
      data={privateData} 
      addHandler={addHandler} 
      deleteHandler={deleteHandler}
      selectionType='radio'
      />)} 
    </>
    )
} 


export default UnitView;

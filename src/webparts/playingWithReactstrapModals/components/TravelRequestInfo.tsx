import * as React from "react";
import { Web } from 'sp-pnp-js';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import {Row, Col, Button, Table} from 'reactstrap';
import ModalWithDynamicData from "./ModalWithDyanmicData";
import ManageApiRequestInModal from "./ManageApiReuestInModal";
import FormInModal from "./FormInModal";
import ModalWithTransition from "./ModalWithTransition";

const TravelRequestInfo = (props) =>{
    const [currUserData, setCurrUserData] = React.useState([]);
    const [user, setUser]= React.useState([]);

    React.useEffect(()=>{
        let web = new Web(props.siteUrl);
        
        web.currentUser.get().then((user) => {
            console.log("user", user);
            setUser(user);
            web.lists.getByTitle("Travel requests").items.filter(`RequesterId eq '${user.Id}'`).get().then((items)=>{
                console.log("filtered data is ", items);
                setCurrUserData(items);
            })  
           
          });
    },[])
    console.log("props of travel request", props.siteUrl)
    const [dynamicdataModal, setDynamicdataModal] = React.useState(false);
    const [displayModalwithApi, setDisplayModalwithApi] = React.useState(false);
    const [displayFormInModal, setDisplayFormInModal] = React.useState(false);
    const [modalwithtransition, setModalwithtransition] = React.useState(false);
    const [remainingExpense, setRemainingExpens] = React.useState('');

    const dynamicdataModaltoggle = ()=>{
        setDynamicdataModal(!dynamicdataModal);
    }

    const displayModalwithApitoggle = ()=>{
        setDisplayModalwithApi(!displayModalwithApi);
    }

    const displayFormInModaltoggle = ()=>{
        setDisplayFormInModal(!displayFormInModal);
    }

    const modalwithtransitionToggle = ()=>{
        setModalwithtransition(!modalwithtransition);
    }
    
    const getExpense =(bal)=>{
        console.log("remaining expense is", bal);
        setRemainingExpens(bal);
    }

    return(
        <>
         <Table bordered>
      <thead>
        <tr>
          <th>Playing with reactsrap modal in SPFx</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        
          <td><Button color="primary" onClick={()=>setDynamicdataModal(true)}>Display Dynamic Data in Modal</Button>{' '}</td>
          <td><Button color="primary" onClick={()=>setDisplayModalwithApi(true)}>Managing API call in Reactstrap modal</Button>{' '}</td>
          <td><Button color="primary">Syncing two Reactstrap modal</Button>{' '}</td>
          <td><Button color="primary" onClick={()=>setDisplayFormInModal(true)}>Creating a form in Reactstrap modal</Button>{' '}</td>
          <td><Button color="primary">Implementing nested Reactstrap modal</Button>{' '}</td>
          <td><Button color="primary" onClick={()=>setModalwithtransition(true)}>Modal with custom timeout</Button>{' '}</td>
          
        </tr>
      </tbody>
    </Table>
            {/* <Row>
                <Col>
                <Button color="primary" onClick={()=>setDynamicdataModal(true)}>Display Dynamic Data in Modal</Button>{' '}
                </Col>
                <Col>
                <Button color="primary" onClick={()=>setDisplayModalwithApi(true)}>Managing API call in Reactstrap modal</Button>{' '}
                </Col>
                <Col>
                <Button color="primary">Syncing two Reactstrap modal</Button>{' '}
                </Col>
                <Col>
                <Button color="primary" onClick={()=>setDisplayFormInModal(true)}>Creating a form in Reactstrap modal</Button>{' '}
                </Col>   
            </Row>
            <Row>
                <Col>
                <Button color="primary">Implementing nested Reactstrap modal</Button>{' '}
                </Col>
                <Col>
                <Button color="primary" onClick={()=>setModalwithtransition(true)}>Modal with custom timeout</Button>{' '}
                </Col>
                <Col>
                <Button color="primary">Modal controlled by external button</Button>{' '}
                </Col>
                
            </Row> */}
        {
            dynamicdataModal==true
            ?<ModalWithDynamicData modal={dynamicdataModal} hide={dynamicdataModaltoggle} currUserData={currUserData} remainingExpense={remainingExpense}/>
            :null
        }
        {
            displayModalwithApi==true
            ?<ManageApiRequestInModal siteUrl={props.siteUrl} modal={displayModalwithApi} hide={displayModalwithApitoggle} 
            currUserData={currUserData} user={user} getExpense={getExpense}/>
            :null
        }
         {
            displayFormInModal==true
            ?<FormInModal modal={displayFormInModal} hide={displayFormInModaltoggle} context={props.context} siteUrl={props.siteUrl}/>
            :null
        }
        {
            modalwithtransition==true
            ?<ModalWithTransition modal={modalwithtransition} hide={modalwithtransitionToggle} />
            :null
        }
        </>
    )
}
export default TravelRequestInfo;
import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, FormGroup,Input, Label } from 'reactstrap';
import { Web } from 'sp-pnp-js';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";

  import {
    PeoplePicker,
    PrincipalType,
  } from "@pnp/spfx-controls-react/lib/PeoplePicker";

const FormInModal = ({modal, hide, context, siteUrl}) =>{
    const[travelReason, setTravelReason] = React.useState('');
    const[travelLocation, setTravelLocation] = React.useState('');
    const[travelStartDate, setTravelStartDate] = React.useState('');
    const[travelEndDate, setTravelEndDate] = React.useState('');
    const [defaultpeople, setDefaultpeople] = React.useState([]);
    const [selectedpeople, setSelectedpeople] = React.useState([]);
    const [estimatedAirfare, setEstimatedAirfare] = React.useState('');
    const [estimatedHotelfare, setEstimatedHotelfare] = React.useState('');
    const [tripTitle, setTripTitle] = React.useState('');

    const getPeoplePickerItems=(items)=>{
        console.log("people picker items are: ", items);
        setSelectedpeople(items);
      }
      console.log("requestor is", selectedpeople);
    
    return (
      <div>
          {
              console.log("All states of form are", travelEndDate, " ", travelReason, " ", travelStartDate, " ", travelLocation)
          }
        <Modal isOpen={modal} toggle={hide}>
          <ModalHeader toggle={hide}>Travel Request Form</ModalHeader>
          <ModalBody>
            <Form>
            <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="travelTitle">Trip Title</Label>
                    <Input
                      type="text"
                      name="text"
                      id="travelTitle"
                      onChange={(e)=>setTripTitle(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="travelReason">Travel Reason</Label>
                    <Input
                      type="text"
                      name="text"
                      id="travelReason"
                      onChange={(e)=>setTravelReason(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="travelLocation">Travel Location</Label>
                    <Input
                      onChange={(e)=>{setTravelLocation(e.target.value)}}
                      type="text"
                      name="text"
                      id="travelLocation"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="examplePeople">People*</Label>
                  <PeoplePicker
                    context={context}
                    personSelectionLimit={10}
                    groupName={""} //leave blank incase you want to filter from all users
                    showtooltip={true}
                    required={true}
                    disabled={false}
                    onChange={(items)=>{getPeoplePickerItems(items)}}
                    showHiddenInUI={false}
                    principalTypes={[PrincipalType.User]}
                    resolveDelay={1000}
                    ensureUser={true}
                    defaultSelectedUsers={defaultpeople}
                    suggestionsLimit={30}
                  />
                </FormGroup>
              </Col>
            </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="travelStartDate">Travel Start Date</Label>
                    <Input
                      onChange={(e)=>{setTravelStartDate(e.target.value)}}
                      type="date"
                      name="text"
                      id="travelStartDate"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label htmlFor="travelEndDate">Travel Start Date</Label>
                    <Input
                      onChange={(e)=>{setTravelEndDate(e.target.value)}}
                      type="date"
                      name="text"
                      id="travelEndDate"
                    />
                  </FormGroup>
                </Col>
              </Row>
                <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="estimatedairfare">Estimated Airfare</Label>
                    <Input
                      onChange={(e)=>{setEstimatedAirfare(e.target.value)}}
                      type="text"
                      name="text"
                      id="estimatedairfare"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label htmlFor="estimatedhotelfare">Estimated Hotelfare</Label>
                    <Input
                      onChange={(e)=>{setEstimatedHotelfare(e.target.value)}}
                      type="text"
                      name="text"
                      id="estimatedhotelfare"
                    />
                  </FormGroup>
                </Col>
                </Row>
                <Row style={{paddingTop:"20px"}}>
                <Col>
                  <Button onClick={()=>{
                    let web = new Web(siteUrl);
                    web.lists.getByTitle("Travel requests").items.add({
                      Title: tripTitle,
                      ReasonForTravel: travelReason,
                      Requester: selectedpeople,
                      TravelStartDate: new Date(travelStartDate),
                      TravelEndDate: new Date(travelEndDate),
                      EstimatedAirfare: estimatedAirfare,
                      EstimatedHotelfare: estimatedHotelfare,
                      Destination: travelLocation
                    }).then(()=>{
                      console.log("a new item is added")
                    })
              
                  }}
                  style={{paddingTop:"20px"}}
                  >Submit</Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
}

export default FormInModal;
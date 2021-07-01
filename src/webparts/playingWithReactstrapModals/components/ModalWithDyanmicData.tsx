import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, FormGroup,Input, Label } from 'reactstrap';
import * as moment from "moment";
import NestedModal from './NestedModal';

const ModalWithDynamicData = ({modal, hide, currUserData, remainingExpense}) =>{
   
    const [displayNestedModal, setDisplayNestedModal] = React.useState(false);
    const toggle=()=>{
      setDisplayNestedModal(!displayNestedModal);
    }
  
    return (
      <div>
        {
          currUserData.map((data,i)=>{
            return (
              <Modal isOpen={modal} toggle={hide}>
                <ModalHeader toggle={hide}>Tavel Information</ModalHeader>
                <ModalBody>
                  <Form>
                  <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="travelTitle">Travel Title</Label>
                          <Input
                            disabled
                            value={data.Title}
                            type="text"
                            name="text"
                            id="travelTitle"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="travelReason">Travel Reason</Label>
                          <Input
                            disabled
                            value={data.ReasonForTravel}
                            type="text"
                            name="text"
                            id="travelReason"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="travelLocation">
                            Travel Location
                          </Label>
                          <Input
                            disabled
                            value={data.DispName}
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
                          <Label htmlFor="travelStartDate">
                            Travel Start Date
                          </Label>
                          <Input
                            disabled
                            value={moment(data.TravelStartDate).format(
                              "YYYY/MM/DD"
                            )}
                            type="text"
                            name="text"
                            id="travelStartDate"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="travelEndDate">
                            Travel Start Date
                          </Label>
                          <Input
                            disabled
                            value={moment(data.TravelEndDate).format(
                              "YYYY/MM/DD"
                            )}
                            type="text"
                            name="text"
                            id="travelEndDate"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="travelExpense">
                            Travel Expense Remaining
                          </Label>
                          <Input
                            disabled
                            value={remainingExpense}
                            type="text"
                            name="text"
                            id="travelExpense"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row style={{paddingTop:"20px"}}>
                      <Col>
                        <Button onClick={()=>{setDisplayNestedModal(true)}} style={{marginLeft: "160px"}}>Display Status</Button>
                      </Col>
                    </Row>
                  </Form>
                </ModalBody>
              </Modal>
            );
          })
        }
        {
          displayNestedModal==true 
          ? <NestedModal currUserData={currUserData} modal={displayNestedModal} hide={toggle}/>
          :null
        }
      </div>
    );
}
export default ModalWithDynamicData;
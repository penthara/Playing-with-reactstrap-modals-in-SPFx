import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, FormGroup,Input, Label } from 'reactstrap';

const NestedModal = ({modal, hide, currUserData}) =>{
    return (
      <div>
        {
            currUserData.map((data,i)=>{
                return (
                  <Modal isOpen={modal} toggle={hide}>
                    <ModalHeader toggle={hide}>
                      Travel Request Status
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <Row>
                          <Col>
                            <FormGroup>
                              <Label htmlFor="travelStatus">
                                Travel Request Status
                              </Label>
                              <Input
                                disabled
                                value={data.ApprovalStatus}
                                type="text"
                                name="text"
                                id="travelStatus"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                );
            })
        }
      </div>
    );
}

export default NestedModal;
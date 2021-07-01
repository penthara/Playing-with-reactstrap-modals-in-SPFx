import * as React from 'react';
import { Web } from 'sp-pnp-js';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, FormGroup,Input, Label } from 'reactstrap';

const ManageApiRequestInModal = ({siteUrl, modal, hide, currUserData, user, getExpense}) =>{

    const [approvedData, setApprovedData] = React.useState([]);
    const [totalExpense, setTotalExpense] = React.useState([]);
    const [expenseUsed, setExpenseUsed] = React.useState('');
    const [displayExpense, setDisplayExpense] = React.useState(false);

    React.useEffect(()=>{
        let web = new Web(siteUrl);
        web.lists.getByTitle("Travel Expense").items.get().then((items)=>{
            console.log("travel expense items are", items);
            setTotalExpense(items);
            web.lists
              .getByTitle("Travel requests")
              .items.filter(`RequesterId eq '${user.Id}' and Approved eq 1`)
              .get()
              .then((items) => {
                console.log("Approved items are", items)
                setExpenseUsed(items.EstimatedAirfare+items.EstimatedHotelCost)
                setApprovedData(items);
              });    
            
        })
    },[])
    var totalExpenseBal;
    totalExpense.map((data)=>{
        totalExpenseBal = data.TotalExpense;
    })

    console.log("Approved data is", approvedData);

    const balConsumed = [];
    approvedData.map((item)=>{
        balConsumed.push({
            ExpenseUsed: item.EstimatedAirfare+item.EstimatedHotelCost
        })
    })

    const getRemExpense =()=>{
      getExpense(totalExpenseBal-balConsumed.reduce((totalExpenseUsed, item)=>totalExpenseUsed+item.ExpenseUsed,0));
    }
    
    
    
    return (
      <div>
        <Modal isOpen={modal} toggle={hide}>
          <ModalHeader toggle={hide}>Travel Expense</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="travelExpense">Travel Expense</Label>
                    <Input
                      disabled
                      value={totalExpenseBal}
                      type="text"
                      name="text"
                      id="travelExpense"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="travelExpenseused">
                      Travel Expense Used
                    </Label>
                    <Input
                      disabled
                      value={balConsumed.reduce(
                        (totalExpenseUsed, item) =>
                          totalExpenseUsed + item.ExpenseUsed,
                        0
                      )}
                      type="text"
                      name="text"
                      id="travelExpenseused"
                    />
                  </FormGroup>
                </Col>
              </Row>
              {displayExpense == true ? (
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="travelExpenseRem">
                        Travel Expense Remaning
                      </Label>
                      <Input
                        disabled
                        value={
                          totalExpenseBal -
                          balConsumed.reduce(
                            (totalExpenseUsed, item) =>
                              totalExpenseUsed + item.ExpenseUsed,
                            0
                          )
                        }
                        type="text"
                        name="text"
                        id="travelExpenseRem"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              ) : null}
            </Form>
            <Row style={{paddingTop:"20px"}}>
            <Button
              onClick={() => {
                setDisplayExpense(true);
                getRemExpense();
              }}
              style={{paddingTop:"20px"}}
            >
              Calculate Expense
            </Button>
            </Row>
            
          </ModalBody>
        </Modal>
      </div>
    );
}

export default ManageApiRequestInModal;
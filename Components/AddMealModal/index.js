import React, { useEffect, useState } from "react";
import RecipeDayCard from "../RecipeDayCard";
import { Modal, Button } from "@nextui-org/react";

export function AddMealModal({ email, setData, day, currentData }) {
  const [ids, setIds] = useState(null);
  const [curData, setCurData] = useState();
  // const [email, setEmail] = useState(null);
  // if (user) {
  //   setEmail(user.email);
  // }
  // const email = user.email;
  useEffect(() => {
    async function getSavedRecipesIDs() {
      const res = await fetch(
        `https://dev-backend-phantom-kitchen.herokuapp.com/users/${email}/favourites/`
      );
      const data = await res.json();
      setIds(data.payload[0].saved_recipes);
    }
    getSavedRecipesIDs();
  }, []);
  const [visible, setVisible] = useState(false);
  const handler = () => {
    setVisible(true);
    setCurData(currentData);
  };

  const closeHandler = () => {
    setVisible(false);
  };
  const cancelHandler = () => {
    setData(curData);
    closeHandler();
  };
  return (
    <div>
      <Button auto shadow onClick={handler}>
        Add
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body>
          <div>
            {ids?.map((id) => {
              return (
                <>
                  <RecipeDayCard id={id} key={id} setData={setData} day={day} />
                  <br />
                </>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto css={{ background: "$ourGrey" }} onClick={cancelHandler}>
            Cancel
          </Button>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
// export default AddMealModal;

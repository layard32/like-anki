import React, { useEffect } from "react";
import DeckModel from "../model/DeckModel";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { editDeck } from "../state/DecksSlice";
import { removeDeckAndSync } from "../state/thunks";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

interface Props {
  deck: DeckModel;
}

const Deck: React.FC<Props> = ({ deck }: Props) => {
  // gestione dell'edit con due stati:
  // uno stato per tenere conto se il deck è in modalità edit
  // uno stato per tenere traccia del testo inserito
  const [editable, setEditable] = React.useState<boolean>(false);
  const [newText, setNewText] = React.useState<string>(deck.name);
  const handleEditable = () => {
    if (editable) setEditable(false);
    else setEditable(true);
  };
  useEffect(() => {
    setNewText(deck.name);
  }, [deck.name]);

  // prendo la dispatch dallo store per fare edit e remove di deck
  const dispatch = useDispatch<AppDispatch>();

  // funzione per reindirizzare alla vista delle cards di un deck o della ripetizione
  const navigate = useNavigate();
  const handleRedirectionToDeckCards = () => {
    navigate(`/deck/${deck.id}/cards`);
  };
  const handleRedirectionToDeckLearn = () => {
    navigate(`/deck/${deck.id}/learn`);
  };

  // inizializziamo il context menu (libreria react-contexify)
  const { show } = useContextMenu({
    id: deck.id.toString(),
  });

  // TODO: RIMUOVERE QUANDO SI CAMBIA DROPDOWN
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest(".dropdown-toggle") ||
        e.target.closest(".dropdown-menu") ||
        e.target.closest(".CiEdit"))
    ) {
      return;
    }
    handleRedirectionToDeckLearn();
  };

  return (
    <>
      <Menu id={deck.id.toString()} animation="fade" theme="dark">
        <Item onClick={handleRedirectionToDeckCards}>See cards</Item>
        <Item onClick={handleEditable}>Edit deck name</Item>
      </Menu>

      <div
        style={{ cursor: "pointer" }}
        className="card w-100 mb-3"
        onContextMenu={(e) => show({ event: e })}
        onClick={handleCardClick}
      >
        <div className="card-body d-flex align-items-center justify-content-between">
          <div style={{ maxWidth: "70%" }}>
            {editable ? (
              <div className="w-100" onClick={(e) => e.stopPropagation()}>
                <InputFieldAdd
                  name={newText}
                  setName={setNewText}
                  handleAction={() => {
                    dispatch(editDeck({ id: deck.id, text: newText }));
                    handleEditable();
                  }}
                  actionName="Modify"
                />
              </div>
            ) : (
              <div className="h4 m-0 text-wrap">{deck.name}</div>
            )}
          </div>
          <div className="d-flex flex-wrap ms-2" style={{ gap: "14px" }}>
            <div className="h4 m-0 text-primary">{deck.newCards}</div>
            <div className="h4 m-0 text-danger">{deck.learningCards}</div>
            <div className="h4 m-0 text-success">{deck.completedCards}</div>
            <MdDelete
              className="text-danger"
              style={{ cursor: "pointer", fontSize: "2rem" }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeDeckAndSync(deck.id));
              }}
            />
            {/* <Dropdown>
              <Dropdown.Toggle variant="secondary" size="sm">
                <CiEdit
                  style={{ cursor: "pointer", fontSize: "1.4rem" }}
                  onClick={(e) => e.stopPropagation()}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditable();
                  }}
                >
                  Edit deck name
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRedirectionToDeckCards();
                  }}
                >
                  See cards
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Deck;

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { FaTrashAlt } from "react-icons/fa";
import { MdFormatLineSpacing } from "react-icons/md";

const DNDlist = ({
  componentType,
  Formik,
  content,
  updateContent,
  saveDNDHandler,
}) => {
  const removeListItemHandler = (item) => {
    let newContent = content.filter((currentItem) => currentItem.id != item.id);
    updateContent([...newContent]);
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          saveDNDHandler(result, content, updateContent);
        }}
      >
        <Droppable droppableId={componentType}>
          {(provided) => (
            <>
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="m-0 p-0"
              >
                <div className="text-danger mh-25">
                  {Formik.touched.ingredient &&
                    Formik.errors.ingredient &&
                    Formik.errors.ingredient}
                </div>

                {content.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="bg-white border-top border-bottom my-auto"
                        >
                          <span variant="secondary">
                            <MdFormatLineSpacing className="ingredient-icon p-1 mt-1 text-yellow" />
                          </span>
                          {componentType == "ingredients" ? (
                            <>
                              {item.quantity} {item.measuringUnit}{" "}
                              {item.ingredientName} {item.state}
                            </>
                          ) : (
                            <>{item.instruction}</>
                          )}
                          <span
                            variant="secondary"
                            className="float-left"
                            onClick={removeListItemHandler.bind(null, item)}
                          >
                            <FaTrashAlt className="ingredient-icon p-1ingredient-icon p-1 mt-1 text-yellow" />
                          </span>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default DNDlist;

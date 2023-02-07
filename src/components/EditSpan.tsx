import React, { useState, FC, ChangeEvent } from "react";

type EditSpanPropsType = {
  OLDtitle: string;
  callback: (newTitle: string) => void;
};
export const EditSpan: FC<EditSpanPropsType> = ({ OLDtitle, callback }) => {
  const [title, setNewTitle] = useState(OLDtitle);
  const [edit, setEdit] = useState(false);
  const editFuncHandler = () => {
    setEdit(!edit);
    callback(title);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };
  return edit ? (
    <input
      value={title}
      onBlur={editFuncHandler}
      onChange={onChangeHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={editFuncHandler}>{title}</span>
  );
};

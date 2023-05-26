import React, { useEffect, useState } from "react";
import { styles } from '../styles.scss'

export default function SelectUserModal(props) {
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(props.users);
  },[])
  const handleGoBack = ()=>{
    props.changeFormLevel({formFillLevel: 1})
  }

  const onCheck = (userId, roomNo)=>{
    const idxUser = users.findIndex((user) => user.userId === userId);
    const usersCopy = [...users];
    usersCopy[idxUser].room = roomNo;
    props.updateState({users: usersCopy});
    setUsers(usersCopy);
  }

  const onUncheck = (userId, roomNo)=>{
    const idxUser = users.findIndex((user) => user.userId === userId);
    const usersCopy = [...users];
    usersCopy[idxUser].room = 0;
    props.updateState({users: usersCopy});
    setUsers(usersCopy);
  }

  const onChage = (userId, roomNo)=>{
    return (ev) => {
      const check = ev.target.checked;
      if (check) {
        return onCheck(userId, roomNo);
      }
      return onUncheck(userId, roomNo);
    };
  }

  return (
    <div className="select-user-modal">
      <div className="select-user-list">
      {
        users.map((obj, idx) => {
          return <div className={styles.userBox}>
            <span className={styles.round}>
              <input
                type="checkbox"
                id={`itemId${idx}`}
                defaultChecked={obj.room === props.openRoom}
                onChange={onChage(obj.userId, props.openRoom)}
              />
              <label htmlFor={`itemId${idx}`}>
                <input
                  type="checkbox"
                  id={`itemId${idx}`}
                  defaultChecked={obj.room === props.openRoom}
                  onChange={onChage(obj.userId, props.openRoom)}
                />
              </label>
            </span>
            <span className={styles.userNameLabel}>{obj.room ==0  ? obj.userName : obj.userName +"   ["+ obj.room+"]"}</span>
          </div>
        })
      }
      </div>
      <div className={styles.smBottomDiv}>
        <button className={styles.create1} onClick={handleGoBack}>Done</button>
      </div>
    </div>
  )
}
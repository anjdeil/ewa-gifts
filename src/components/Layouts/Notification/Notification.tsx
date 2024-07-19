import React, { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

interface NotificationPropsType {
    children: ReactNode
}

const Notification: FC<NotificationPropsType> = ({ children }) => {
    return (
        <div className={styles['notification']}>
            {children}
        </div>
    );
}

export default Notification;
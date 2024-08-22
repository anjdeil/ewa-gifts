import React, { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

interface NotificationPropsType {
    children: ReactNode,
    type?: "success" | "warning" | "danger"
}

const Notification: FC<NotificationPropsType> = ({ children, type }) => {
    return (
        <div className={`${styles['notification']} ${type ? styles[`notification_${type}`] : ""}`}>
            {children}
        </div>
    );
}

export default Notification;
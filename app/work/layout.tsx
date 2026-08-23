import { ReactNode } from "react";
import styles from "./work.module.css";

export default function WorkLayout({ children }: { children: ReactNode }) {
    return (
        <article className={styles.article}>
            {children}
        </article>
    );
}

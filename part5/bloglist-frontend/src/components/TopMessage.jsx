import styles from '../styling/topMessage.module.css';

const TopMessage = ({msg, mode}) => { // mode is either 'normal' or 'error'
    return (
        <>
            <div className={`${styles.topMessage} ${styles[mode]}`}>
                <p className={styles.content}>{msg}</p>
            </div>
        </>
    )
}

export default TopMessage
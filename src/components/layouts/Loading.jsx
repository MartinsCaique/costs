// Css e imagens
import styles from './Loading.module.css'
import loading from '../../assets/images/loading.svg'

function Loading() {
    return (
        <div className={styles.loaderContainer}>
            <img className={styles.loader} src={loading} alt="Loading" />
        </div>
    );
}

export default Loading;
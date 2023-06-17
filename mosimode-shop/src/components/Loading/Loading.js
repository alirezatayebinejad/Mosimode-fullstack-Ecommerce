import React from 'react'
import styles from "./Loading.module.css"
import LinearProgress from '@mui/material/LinearProgress';
import Image from 'next/image';

const Loading = ({ spinnerType }) => {
    return (
        <>
            <div className={styles.loading_container}>
                {spinnerType === "progress" ? <LinearProgress color="inherit" /> :
                    <div className={styles.loading_part}>
                        {spinnerType === "spinner1" && <Image src={"/assets/loaders/spinner1.svg"} width={100} height={100} alt={"spinner icon animated"} />}
                        {spinnerType === "spinner2" && <Image src={"/assets/loaders/spinner2.svg"} width={100} height={100} alt={"spinner icon animated"} />}
                    </div>
                }
            </div>
        </>
    )
}

export default Loading
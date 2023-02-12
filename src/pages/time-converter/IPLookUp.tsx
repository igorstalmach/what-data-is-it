import React, {useEffect} from "react";
import styles from "./assets/IPLookUp.module.scss";
import axios from "axios";
import { UTC } from "./assets/timeZoneValues";

export default function IPLookUp() {
    const [publicIP, setPublicIP] = React.useState<string>("");
    const [timeZone, setTimeZone] = React.useState<string>("");

    const getIP = async () => {
        const res = await axios.get('https://geolocation-db.com/json/');
        setPublicIP(res.data.IPv4);

        const res2 = await axios.get('http://ip-api.com/json/' + publicIP + '?fields=offset');
        setTimeZone(getTimeZone(res2.data.offset));
    }

    const getTimeZone = (offset: number) => {
        let val: string = ""

        UTC.map(item => {
            if (item.value === (offset / 60).toString()) {
                return val = item.label;
            }
        });

        return val;
    }

    useEffect(() => {
        getIP();
    }, []);

    return(
        <div className={styles.container}>
            Hint: Your IP (<span className={styles.text}>{publicIP}</span>) matches: <span className={styles.text}>{timeZone}</span>
        </div>
    );
}
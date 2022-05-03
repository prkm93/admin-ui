import axios from "axios";
import { config } from "../config/constant";
import { data } from "../data";

/**
  *  Function to fetch users details calling users API
  */
 const fetchUsersAPI = async (setUsersData, setUsersDataList) => {
    try {
        const response = await axios.get(`${config.url}`);
        if (response.status === 200) {
            setUsersData(response.data.map(item => {
                return {
                    ...item,
                    isSelected: false,
                    ifEdit: false,
                    show: true
                }
            }));
            setUsersDataList(response.data.map(item => {
                return {
                    ...item,
                    isSelected: false,
                    ifEdit: false,
                    show: true
                }
            }));
        }
    } catch (err) {
        setUsersData(data);
        setUsersDataList(data);
    }
}

export { fetchUsersAPI };
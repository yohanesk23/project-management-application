import appconfig from "../appconfig"

const API_ADDRESS = appconfig.workUrl;

const GET_WORK = "/user/";
const PUT_WORK = "/insert";

export const getWork = async () => {
    let url = new URL(API_ADDRESS + GET_WORK);
    let header = new Headers();
    header.append("Access-Control-Allow-Origin", "*");

    let response = await fetch(url, {
        headers : header
    })

    if(response.ok) {
        let result = await response.json();
        return result
    }
};

export const putWork = async (facility, equipmentId, priority, timeComplete) => {
    let url = new URL(API_ADDRESS + PUT_WORK);

    url.searchParams.append("Facility", facility);
    url.searchParams.append("EquipmentId", equipmentId);
    url.searchParams.append("Priority", priority);
    url.searchParams.append("TimeComplete", timeComplete);

    let response = await fetch(url,
        {
            method: "PUT"
        });
    
        if (response.ok) {
            let result = await response.json();
            return result;
        }
}
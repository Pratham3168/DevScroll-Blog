import { toast } from "react-toastify";

export const handleSuccess = (msg) =>{

    toast.success(msg,{
        position:'top-right'
    })

}


export const handleError = (msg) =>{

    toast.error(msg,{
        position:'top-right'
    })

}

export const safeJson = async (response) => {
    try {
        const text = await response.text();
        if (!text) return null;
        return JSON.parse(text);
    } catch (err) {
        return null;
    }
};
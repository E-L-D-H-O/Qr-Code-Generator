import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { Button } from "react-bootstrap";
import { API_URL } from "../common/constants";


const handleDonate = async () => {
    try {
        const res = await axios.post(`${API_URL.BASE_URL}/create-checkout-session`);
        window.location.href = res.data.url;
    } catch (err) {
        console.error("Error:", err);
    }
};

const DonateButton = () => {
    return (
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-3" >
            <Button variant="danger" size="lg" className="rounded-pill" onClick={handleDonate}>
                <FaHeart className="me-2" /> Donate Now
            </Button>
        </div >
    );
};

export default DonateButton;
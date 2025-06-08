import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const goToMall = () => {
        navigate("/mall/mallHome");
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "linear-gradient(135deg, #f0f9ff 0%, #e6f4ff 100%)"
        }}>
            <div style={{ textAlign: "center" }}>
                <Button
                    type="primary"
                    onClick={goToMall}
                    style={{
                        height: "50px",
                        width: "200px",
                        fontSize: "18px",
                        fontWeight: 600,
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #1890ff, #096dd9)",
                        boxShadow: "0 6px 15px rgba(24, 144, 255, 0.4)",
                        border: "none",
                        transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.boxShadow = "0 8px 20px rgba(24, 144, 255, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "0 6px 15px rgba(24, 144, 255, 0.4)";
                    }}
                >
                    浏览商城主页
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css";  // ✅ Import Scoped CSS

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const password_pattern = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[\W_]).{6,}$/;

const validateNewPassword = (values) => {
    const errors = {};

    if (!values.email || !email_pattern.test(values.email)) {
        errors.email = "Please enter a valid email";
    }

    if (!values.newPassword || values.newPassword.trim() === "") {
        errors.newPassword = "New password should not be empty";
    } else if (!password_pattern.test(values.newPassword)) {
        errors.newPassword = "Password must contain at least 6 characters, including uppercase, lowercase, special character, and number";
    }

    if (!values.confirmNewPassword || values.confirmNewPassword.trim() === "") {
        errors.confirmNewPassword = "Confirm password should not be empty";
    } else if (values.confirmNewPassword !== values.newPassword) {
        errors.confirmNewPassword = "Passwords do not match";
    }

    return errors;
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/auth/reset-password-form", {
                email,
                password
            });

            if (response.data.status === "Success") {
                toast.success("Password updated successfully!");
                navigate("/login");
            } else {
                toast.error(response.data.message || "Failed to reset password.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="reset-password-page">
            <div className="reset-password-container">
                <h3 className="reset-password-title">Reset Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="reset-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="reset-password-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="reset-form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="reset-password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="reset-btn">Update Password</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
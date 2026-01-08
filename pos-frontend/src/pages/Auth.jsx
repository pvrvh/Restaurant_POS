import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import restaurantBg from "../assets/images/restaurant-img.jpg";
import { login } from "../https/index";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await login(formData);
      const { _id, name, email, role } = response.data.data;
      
      dispatch(setUser({ _id, name, email, role }));
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${restaurantBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {/* Login Box */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Glass-morphism Card */}
          <div className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-[#343434]/50">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#f5f5f5] mb-2">Restro POS</h1>
              <p className="text-[#ababab]">Welcome back! Please login to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}
              
              {/* Email Input */}
              <div>
                <label className="block text-[#f5f5f5] mb-2 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-[#ababab]" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@restro.com"
                    className="w-full bg-[#262626] text-[#f5f5f5] rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#02ca3a] transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-[#f5f5f5] mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-[#ababab]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-[#262626] text-[#f5f5f5] rounded-xl pl-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-[#02ca3a] transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#ababab] hover:text-[#f5f5f5]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-[#ababab] cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 rounded accent-[#02ca3a]"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-[#02ca3a] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#02ca3a] text-white font-bold py-3 rounded-xl hover:bg-[#01a030] transition-all shadow-lg hover:shadow-[#02ca3a]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#343434]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#1a1a1a]/80 text-[#ababab]">
                  Demo Credentials
                </span>
              </div>
            </div>

            {/* Demo Info */}
            <div className="bg-[#262626]/50 rounded-xl p-4 text-sm">
              <p className="text-[#ababab] mb-2">For testing, use:</p>
              <p className="text-[#f5f5f5]">📧 Email: <span className="text-[#02ca3a]">admin@restro.com</span></p>
              <p className="text-[#f5f5f5]">🔑 Password: <span className="text-[#02ca3a]">admin123</span></p>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-[#ababab]">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#02ca3a] hover:underline font-semibold"
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-[#ababab] mt-6 text-sm">
            © 2026 Restro POS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
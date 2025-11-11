import React from "react";

const AccountPage = () => {
  return (
    <div>
      {/* Floating Profile Icon (bottom-right) */}
      <Link
        to={userInfo ? "/profile" : "/login"}
        className="fixed bottom-5 right-5 bg-gradient-to-r from-[#1C1F26] to-[#1E3A5F] p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-spin-slow z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
          className="w-6 h-6 md:w-7 md:h-7"
        >
          <path
            stroke="white"
            strokeWidth="1"
            d="M8.72493 0.742188C9.74932 0.742188 10.7318 1.14912 11.4561 1.87348C12.1805 2.59783 12.5874 3.58026 12.5874 4.60465C12.5874 5.62904 12.1805 6.61148 11.4561 7.33583C10.7318 8.06018 9.74932 8.46712 8.72493 8.46712C7.70054 8.46712 6.71811 8.06018 5.99376 7.33583C5.2694 6.61148 4.86247 5.62904 4.86247 4.60465C4.86247 3.58026 5.2694 2.59783 5.99376 1.87348C6.71811 1.14912 7.70054 0.742188 8.72493 0.742188ZM8.72493 11.6484C11.0745 11.6484 13.1759 12.1252 14.6715 12.873C16.1968 13.6356 16.9499 14.597 16.9499 15.5108V17.1921H0.5V15.5108C0.5 14.597 1.25304 13.6356 2.77838 12.873C4.27394 12.1252 6.3754 11.6484 8.72493 11.6484Z"
          />
        </svg>
      </Link>
    </div>
  );
};

export default AccountPage;

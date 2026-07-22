import React from 'react';

const Logo = ({ width = 120, height = 120, className = "" }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                {/* Gradient màu vàng đồng / kim bảo */}
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE082" />
                    <stop offset="50%" stopColor="#FFB300" />
                    <stop offset="100%" stopColor="#FF8F00" />
                </linearGradient>

                {/* Gradient nền đỏ đô truyền thống */}
                <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#5c1212" />
                    <stop offset="100%" stopColor="#2b0505" />
                </radialGradient>
            </defs>

            {/* Nền hình tròn đỏ đô */}
            <circle cx="100" cy="100" r="96" fill="url(#bgGradient)" stroke="url(#goldGradient)" strokeWidth="4" />

            {/* Vòng viền Họa tiết Phong Thủy outer ring */}
            <circle cx="100" cy="100" r="88" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="4 2" />

            {/* Họa tiết Cánh Sen Thần Linh ở Tâm */}
            <g stroke="url(#goldGradient)" strokeWidth="2.5" fill="none">
                {/* Cánh sen chính giữa */}
                <path d="M100 45 C115 65 115 85 100 105 C85 85 85 65 100 45 Z" fill="url(#goldGradient)" fillOpacity="0.2" />
                {/* Cánh sen trái */}
                <path d="M100 105 C80 90 65 70 70 55 C85 60 95 80 100 105 Z" />
                {/* Cánh sen phải */}
                <path d="M100 105 C120 90 135 70 130 55 C115 60 105 80 100 105 Z" />
                {/* Đế tòa sen */}
                <path d="M75 110 Q100 120 125 110 Q115 122 85 122 Z" fill="url(#goldGradient)" />
            </g>

            {/* Chữ QUYẾT PHƯƠNG */}
            <text
                x="100"
                y="145"
                textAnchor="middle"
                fill="url(#goldGradient)"
                fontSize="16"
                fontWeight="bold"
                fontFamily="serif"
                letterSpacing="1"
            >
                QUYẾT PHƯƠNG
            </text>

            {/* Chữ phụ GỐM SỨ */}
            <text
                x="100"
                y="162"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="500"
                fontFamily="sans-serif"
                letterSpacing="2"
                opacity="0.9"
            >
                GỐM SỨ BÁT TRÀNG
            </text>

            {/* Chấm tròn phong thủy điểm xuyết */}
            <circle cx="100" cy="172" r="2" fill="url(#goldGradient)" />
        </svg>
    );
};

export default Logo;
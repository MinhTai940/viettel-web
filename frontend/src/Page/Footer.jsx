function Footer() {

    return (

        <div>

            {/* Phần thông tin */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "40px 80px",
                    background: "#f5f5f5",
                    alignItems: "center"
                }}
            >

                {/* Đơn vị cung cấp */}

                <div>

                    <h3>Đơn vị cung cấp</h3>

                    <h1 style={{ color: "#e60023", margin: "10px 0" }}>
                        viettel
                    </h1>

                    <p>Theo cách của bạn</p>

                </div>


                {/* Liên hệ */}

                <div>

                    <h3>Liên hệ</h3>

                    <p>📞 Tổng đài 18008168</p>

                    <p>🏠 Giang Văn Minh, Ba Đình, HN</p>

                </div>

            </div>


            {/* Thanh bản quyền */}

            <div
                style={{
                    background: "#e60023",
                    color: "white",
                    textAlign: "center",
                    padding: 15
                }}
            >

                © 2024 viettelup.vn. All rights reserved

            </div>

        </div>

    )

}

export default Footer
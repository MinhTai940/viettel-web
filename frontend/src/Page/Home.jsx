import { useEffect, useState } from "react"
import API from "../services/api"
import PlanCard from "./PlanCard"
import Header from "./Header"
import Footer from "./Footer"

function Home() {

    const [categories, setCategories] = useState([])
    const [packages, setPackages] = useState([])
    const [openCategory, setOpenCategory] = useState(null)

    useEffect(() => {

        fetchCategories()
        fetchPackages()

    }, [])

    const fetchCategories = async () => {

        const res = await API.get("/categories")
        setCategories(res.data)

    }

    const fetchPackages = async () => {

        const res = await API.get("/packages")
        setPackages(res.data)

    }

    const toggleCategory = (id) => {

        if (openCategory === id) {

            setOpenCategory(null)

        } else {

            setOpenCategory(id)

        }

    }

    return (

        <div>

            <Header />

            <div style={{ padding: "40px 80px" }}>

                {categories.map(category => (

                    <div key={category._id} style={{ marginBottom: 60 }}>

                        {/* Tiêu đề */}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer"
                            }}

                            onClick={() => toggleCategory(category._id)}

                        >

                            <h1 style={{
                                fontSize: 48,
                                fontWeight: 700,
                                margin: 0
                            }}>

                                {category.name.toUpperCase()}

                            </h1>

                            <div
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: "50%",
                                    background: "#f3f3f3",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 20
                                }}
                            >

                                {openCategory === category._id ? "▲" : "▼"}

                            </div>

                        </div>


                        {/* DANH SÁCH GÓI */}

                        {openCategory === category._id && (

                            <div
                                style={{
                                    marginTop: 30,
                                    display: "flex",
                                    gap: 30,
                                    flexWrap: "wrap"
                                }}
                            >

                                {packages
                                    .filter(p => p.category === category._id)
                                    .map(p => (

                                        <PlanCard
                                            key={p._id}
                                            planName={p.name}
                                            dataValue={p.data}
                                            dataUnit=""
                                            price={p.price}
                                            duration={p.duration}
                                            smsCode={p.sms_code}
                                        />

                                    ))}

                            </div>

                        )}

                    </div>

                ))}

            </div>
            <Footer />

        </div>

    )

}

export default Home
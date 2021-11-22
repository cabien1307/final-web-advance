import RightBar from "../../components/RightBar/RightBar"
import "./FacultyDetail"

function FacultyDetail() {
    return (
        <>
            <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 sm:gap-0 grid grid-cols-12 space-y-3">
                <div className="col-span-12 h-60 bg-green-500">
                    <h1>Profile Faculty</h1>
                </div>

                <div className="col-start-9 col-span-4 border-l-2">
                    <RightBar />
                </div>

            </div>

        </>
    )
}

export default FacultyDetail
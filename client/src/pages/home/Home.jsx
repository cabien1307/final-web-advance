import RightBar from "../../components/RightBar/RightBar"
import Status from "../../components/Status/Status";

function Home() {

    return (
        <>
            <div className="col-span-6 2xl:col-span-6 xl:col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 sm:gap-0">
                <Status />
            </div>
            <RightBar />
        </>
    )
}

export default Home
import RightBar from "../../components/RightBar/RightBar"
import "./FacultyDetail"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getDataAPI } from "../../utils/fetchData"
import LoadIcon from "../../images/loading.gif";
import Post from "../../components/Post/Post";
import NoPost from "../../images/post.svg";

function FacultyDetail() {

    const params = useParams()
    const { homePosts } = useSelector((state) => state);
    const [notifies, setNotifies] = useState([])

    useEffect(() => {
        getDataAPI(`notification/${params.id}/faculty`)
            .then(res => {

                setNotifies(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [params.id])
    console.log(homePosts);


    return (
        <>
            <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 sm:gap-0 grid grid-cols-12 space-y-3">
                <div className="col-span-12 h-60 bg-green-500">
                    <h1>Profile Faculty</h1>
                </div>

                <div className="col-start-1 col-span-8 border-l-2">
                    {homePosts.loading ? (
                        <img
                            src={LoadIcon}
                            alt="loading"
                            className="block mx-auto"
                        />
                    ) : homePosts.result === 0 ? (
                        <div
                            className="list-posts mx-7 my-5 xl:mx-auto lg:mx-2 md:mx-2 sm:mx-1 xs:mx-1"
                        >
                            <img
                                src={NoPost}
                                alt="NoPost"
                                className="w-1/2 h-auto object-cover mx-auto"
                            />
                            <h1 className="text-center text-xl mt-2 text-red-500 font-semibold">
                                Publish new post to see something !
                            </h1>
                        </div>
                    ) : (
                        homePosts.posts.map((post, index) => <Post key={index} post={post} />)
                    )}
                </div>

                <div className="col-start-9 col-span-4 border-l-2">
                    <RightBar notifications={notifies} />
                </div>

            </div>

        </>
    )
}

export default FacultyDetail
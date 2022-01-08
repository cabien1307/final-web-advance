import RightBar from "../../components/RightBar/RightBar"
import "./FacultyDetail"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

import { getDataAPI } from "../../utils/fetchData"
import LoadIcon from "../../images/loading.gif";
import Post from "../../components/Post/Post";
import NoPost from "../../images/post.svg";
import HeaderFacultyDetail from "./HeaderFacultyDetail/HeaderFacultyDetail";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { POST_TYPES } from "../../store/actions/postAction";

function FacultyDetail() {

    const { homePosts } = useSelector((state) => state);
    const dispatch = useDispatch()
    const params = useParams()

    const [notifies, setNotifies] = useState([])
    const [faculty, setFaculty] = useState({})
    const [loadingPosts, setLoadingPosts] = useState(false)

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(2);
    const [oldResult, setOldResult] = useState(0)

    useEffect(() => {
        getDataAPI(`notification/${params.id}/faculty`)
            .then(res => {

                setNotifies(res.data)
            })
            .catch(err => {
                console.log(err);
            })

        getDataAPI(`faculty/${params.id}`)
            .then(res => {
                console.log(res.data);
                setFaculty(res.data)
            })
            .catch(err => {
                console.log(err);
            })

        const getPosts = async () => {
            setLoadingPosts(true)
            const res = await getDataAPI(`post/faculty/${params.id}?limit=10`)

            dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });

            setLoadingPosts(false)
        }
        getPosts()
    }, [params.id, dispatch])

    const fetchPosts = async () => {
        const res = await getDataAPI(`post/faculty/${params.id}?limit=${page * 10}`);
        return res.data;
    };

    const fetchMoreData = async () => {

        const posts = await fetchPosts();
        dispatch({ type: POST_TYPES.GET_POSTS, payload: posts });

        if (homePosts.result < 10 * (page - 1)) {
            setHasMore(false)
        }

        if (oldResult === posts.result) {
            setHasMore(false)
        }

        setPage(page + 1)
        setOldResult(posts.result)

    };

    return (
        <>
            <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 sm:gap-0 grid grid-cols-12 space-y-3">
                <div className="col-span-12 mb-20">
                    <HeaderFacultyDetail user={faculty} />
                </div>

                <div className="col-start-1 col-span-8 border-l-2 lg:col-span-12 md:col-span-12 sm:col-span-12">
                    {loadingPosts ? (
                        <img
                            src={LoadIcon}
                            alt="loading"
                            className="block mx-auto"
                        />
                    ) : homePosts.posts.length === 0 ? (
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
                        <InfiniteScroll
                            dataLength={homePosts.posts.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={
                                <h4 className="text-center font-semibold text-xl">
                                    Loading...
                                </h4>
                            }
                            scrollableTarget="load-infinite"
                            endMessage={
                                <p className="text-center font-semibold text-xl">
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            {
                                homePosts.posts.map((post, index) =>
                                    <Post key={index} post={post} />
                                )
                            }
                        </InfiniteScroll>
                    )}
                </div>

                <div className="col-start-9 col-span-4 border-l-2 lg:hidden md:hidden sm:hidden">
                    <RightBar notifications={notifies} />
                </div>

            </div>

        </>
    )
}

export default FacultyDetail
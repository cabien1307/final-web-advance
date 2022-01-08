import RightBar from "../../components/RightBar/RightBar";
import Status from "../../components/Status/Status";
import { useDispatch, useSelector } from "react-redux";
import LoadIcon from "../../images/loading.gif";
import Post from "../../components/Post/Post";
import NoPost from "../../images/post.svg";
import './home.css'

import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { getDataAPI } from "../../utils/fetchData";
import { getPosts, POST_TYPES } from "../../store/actions/postAction";
import { useEffect } from "react";

function Home() {
    const { homePosts, token } = useSelector((state) => state);
    const dispatch = useDispatch()
    const { notifications } = useSelector((state) => state.notify)

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(2);
    const [oldResult, setOldResult] = useState(0)

    // Get posts
    useEffect(() => {
        if (token) dispatch(getPosts(token));
    }, [dispatch, token]);

    const fetchPosts = async () => {
        const res = await getDataAPI(`post?limit=${page*10}`);
        return res.data;
    };

    const fetchMoreData = async () => {

        const posts = await fetchPosts();
        dispatch({ type: POST_TYPES.GET_POSTS, payload: posts });

        if(homePosts.result < 10 * (page - 1)) {
            setHasMore(false)
        }

        if(oldResult === posts.result) {
            setHasMore(false)
        }

        setPage(page + 1)
        setOldResult(posts.result)
    };

    return (
        <>
            <div className="col-span-6 2xl:col-span-6 xl:col-span-6 lg:col-span-10 md:col-span-10 sm:col-span-10 sm:gap-0 border-r-2">
                <Status />
                <div id="load-infinite">

                    {homePosts.loading ? (
                        <img
                            src={LoadIcon}
                            alt="loading"
                            className="block mx-auto"
                        />
                    ) : (homePosts.posts.length === 0) ? (
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
                    ) :
                        (
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
                        )
                    }
                </div>
            </div>
            <RightBar notifications={notifications} />
        </>
    );
}

export default Home;

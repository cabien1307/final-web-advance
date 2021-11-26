import RightBar from "../../components/RightBar/RightBar";
import Status from "../../components/Status/Status";
import { useSelector } from "react-redux";
import LoadIcon from "../../images/loading.gif";
import Post from "../../components/Post/Post";
import NoPost from "../../images/post.svg";
import './home.css'

import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

function Home() {
    const { homePosts } = useSelector((state) => state);
    const { notifications } = useSelector((state) => state.notify)

    const [posts, setPosts] = useState(
        {
            hasMore: true,
            items:
                (homePosts.result !== 0 || homePosts.posts.length !== 0)
                && homePosts.posts.slice(0, 1)
        }
    )

    const fetchMoreData = () => {

        if (posts.items.length >= homePosts.posts.length) {
            setPosts({
                hasMore: false,
                items: [...posts.items]
            })
            return;
        }

        setTimeout(() => {
            setPosts({
                hasMore: true,
                items: [
                    ...posts.items,
                    ...homePosts.posts.slice(posts.items.length, posts.items.length + 1)
                ]
            })
        }, 1500);
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
                    ) : (posts.items.length === 0) ? (
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
                        posts.items && (
                            <InfiniteScroll
                                dataLength={posts.items.length}
                                next={fetchMoreData}
                                hasMore={posts.hasMore}
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
                                    posts.items.map((post, index) =>
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

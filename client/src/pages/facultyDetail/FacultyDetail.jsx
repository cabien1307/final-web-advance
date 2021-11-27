import RightBar from "../../components/RightBar/RightBar"
import "./FacultyDetail"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

import { getDataAPI } from "../../utils/fetchData"
import LoadIcon from "../../images/loading.gif";
import Post from "../../components/Post/Post";
import NoPost from "../../images/post.svg";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

function FacultyDetail() {

    const { homePosts } = useSelector((state) => state);
    const params = useParams()

    const [notifies, setNotifies] = useState([])
    const [faculty, setFaculty] = useState({})
    const [loadingPosts, setLoadingPosts] = useState(false)
    const [posts, setPost] = useState([])

    const [postsView, setPostsView] = useState({})

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

                setFaculty(res.data)
            })
            .catch(err => {
                console.log(err);
            })

        const getPosts = () => {
            setLoadingPosts(true)
            const posts = homePosts.posts.filter((post) => post.userID._id === params.id)
            setPost(posts)
            setPostsView({
                hasMore: true,
                items:
                    (posts.length !== 0) && posts.slice(0, 1)
            })
            getDataAPI(`post/faculty/${params.id}`)
                .then(res => {
                    setPost(res.data)
                    setPostsView({
                        hasMore: true,
                        items:
                            (res.data.length !== 0) && res.data.slice(0, 5)
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            setLoadingPosts(false)
        }
        getPosts()
    }, [params.id, homePosts])

    const fetchMoreData = async () => {
        if (postsView.items.length >= posts.length) {
            setPostsView({
                hasMore: false,
                items: [...postsView.items]
            })
            return;
        }

        setTimeout(() => {
            setPostsView({
                hasMore: true,
                items: [
                    ...postsView.items,
                    ...posts.slice(postsView.items.length, postsView.items.length + 5)
                ]
            })
        }, 1000);
    };

    return (
        <>
            <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 sm:gap-0 grid grid-cols-12 space-y-3">
                <div className="col-span-12">
                    <ProfileHeader user={faculty} />
                </div>

                <div className="col-start-1 col-span-8 border-l-2">
                    {loadingPosts ? (
                        <img
                            src={LoadIcon}
                            alt="loading"
                            className="block mx-auto"
                        />
                    ) : posts.length === 0 ? (
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
                        homePosts.post.length !== 0 && postsView.items &&
                        <InfiniteScroll
                            dataLength={postsView.items.length}
                            next={fetchMoreData}
                            hasMore={postsView.hasMore}
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
                                postsView.items.map((post, index) =>
                                    <Post key={index} post={post} />
                                )
                            }
                        </InfiniteScroll>
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
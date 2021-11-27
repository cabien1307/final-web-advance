import { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import RightBar from "../../components/RightBar/RightBar";
import LoadIcon from "../../images/loading.gif";
import { getDataAPI } from "../../utils/fetchData";
import NoPost from "../../images/post.svg";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import { useParams } from "react-router";
import EditForm from "../../components/EditForm";
import Status from "../../components/Status/Status";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

function Profile(){
    const { auth, homePosts } = useSelector((state) => state);
    const params = useParams()

    const [notifies, setNotifies] = useState([])
    const [loadingPosts, setLoadingPosts] = useState(false)
    const [posts, setPost] = useState([])
    const [user, setUser] = useState([])

    const [postsView, setPostsView] = useState({})

    useEffect(() => {
        getDataAPI(`user/${params.id}/getByID`)
        .then(res => {
            getDataAPI(`notification/${res.data.faculty.slug}/faculty`)
            .then(res => {
                setNotifies(res.data)
            })
            .catch(err => {
                console.log(err);
            })

            if(auth.user._id === params.id){
                setUser(auth.user)
            } else {
                setUser(res.data)
            }
            
        })
        .catch(err => {
            console.log(err);
        })

        const getPosts = async () => {
            setLoadingPosts(true)
            const posts = homePosts.posts.filter((post) => post.userID._id === params.id)
            setPost(posts)
            setPostsView({
                hasMore: true,
                items:
                    (posts.length !== 0) && posts.slice(0, 5)
            })
            // await getDataAPI(`post/${params.id}/timeline`)
            // .then(res => {
            //     setPost(res.data)
            //     setPostsView({
            //         hasMore: true,
            //         items:
            //             (res.data.length !== 0) && res.data.slice(0, 1)
            //     })
            // })
            // .catch(err => {
            //     console.log(err);
            // })
            setLoadingPosts(false)
        }
        getPosts()

    }, [params.id, auth.user, homePosts])

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
                    <ProfileHeader user={user} />
                    {/* <!-- Introduction --> */}
                    <div
                        class="introduction col-span-4 xl:col-span-4 lg:col-span-5 md:col-span-12 sm:col-span-12 xs:col-span-12 rounded-lg px-1"
                    >
                        <EditForm user={user} />
                    </div>
                </div>


                <div className="col-start-1 col-span-8 border-l-2">
                    {
                        auth.user._id === params.id &&
                        <Status />
                    }
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
                        postsView.items &&
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

export default Profile
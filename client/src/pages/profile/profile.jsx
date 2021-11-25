import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import RightBar from "../../components/RightBar/RightBar";
import LoadIcon from "../../images/loading.gif";
import { getDataAPI } from "../../utils/fetchData";
import NoPost from "../../images/post.svg";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";

function Profile(){
    const { auth } = useSelector((state) => state);
    const [notifies, setNotifies] = useState([])
    const [loadingPosts, setLoadingPosts] = useState(false)
    const [posts, setPost] = useState([])

    useEffect(() => {
        getDataAPI(`notification/${auth.user.faculty.slug}/faculty`)
            .then(res => {
                setNotifies(res.data)
            })
            .catch(err => {
                console.log(err);
            })

        const getPosts = () => {
            setLoadingPosts(true)
            getDataAPI(`post/${auth.user._id}/timeline`)
            .then(res => {
                setPost(res.data)
            })
            .catch(err => {
                console.log(err);
            })
            setLoadingPosts(false)
        }
        getPosts()
    }, [auth.user.faculty, auth.user._id])

    return (
        <>
            <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 sm:gap-0 grid grid-cols-12 space-y-3">
                <div className="col-span-12">
                    <ProfileHeader user={auth.user} />
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
                        posts.map((post, index) => <Post key={index} post={post} />)
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
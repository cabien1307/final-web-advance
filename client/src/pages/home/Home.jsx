import RightBar from "../../components/RightBar/RightBar";
import Status from "../../components/Status/Status";
import { useSelector } from "react-redux";
import LoadIcon from "../../images/loading.gif";
import Post from "../../components/Post/Post";
import NoPost from "../../images/post.svg";

function Home() {
    const { homePosts } = useSelector((state) => state);

    return (
        <>
            <div className="col-span-6 2xl:col-span-6 xl:col-span-6 lg:col-span-10 md:col-span-10 sm:col-span-10 sm:gap-0">
                <Status />
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
            <RightBar />
        </>
    );
}

export default Home;

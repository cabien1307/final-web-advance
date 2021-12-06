import { useSelector } from "react-redux";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import "./caroursel.css";

const Carousel = ({ images, id, videos }) => {
    const newArr = [...images, ...videos];
    const isActive = (index) => {
        if (index === 0) return "active";
    };

    const { theme } = useSelector((state) => state);

    return (
        <div id={`image${id}`} className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {newArr.map((img, index) => (
                    <li
                        key={index}
                        data-target={`#image${id}`}
                        data-slide-to={index}
                        className={isActive(index)}
                    ></li>
                ))}
            </ol>
            <div className="carousel-inner">
                {newArr.map((item, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${isActive(index)}`}
                    >
                        {item.public_id ? (
                            <img
                                src={item.url}
                                className="d-block w-full"
                                alt={item.url}
                                style={{
                                    filter: theme ? "invert(1)" : "invert(0)",
                                }}
                            />
                        ) : (
                            <div className="w-full ytb">
                                <YoutubeEmbed embedId={item} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <a
                className="carousel-control-prev"
                href={`#image${id}`}
                role="button"
                data-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
            </a>
            <a
                className="carousel-control-next"
                href={`#image${id}`}
                role="button"
                data-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
};

export default Carousel;

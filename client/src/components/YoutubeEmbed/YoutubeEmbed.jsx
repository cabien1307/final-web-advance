import './YoutubeEmbed.css';

const YoutubeEmbed = ({ embedId }) => {
    return (
        <iframe
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            height="320"
        />
    );
}


export default YoutubeEmbed;
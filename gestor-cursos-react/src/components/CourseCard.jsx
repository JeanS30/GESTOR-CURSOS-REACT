import { sanitizeText } from "../utils/sanitize";
import PropTypes from "prop-types";

const CourseCard = ({ course, isFavorite, onToggleFavorite }) => {

    const safeTitle = sanitizeText(course.title);
    const safeDescription = sanitizeText(course.description);

    return (
        <article className="course-card">
            <h2>{safeTitle}</h2>

            <p>{safeDescription}</p>

            <small>Docente ID: {course.teacherId}</small>

            <button
                type="button"
                onClick={() => onToggleFavorite(course)}
                className={isFavorite ? "btn favorite" : "btn"}
            >
                {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>
        </article>
    );
};

CourseCard.propTypes = {
    course: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        teacherId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
};

export default CourseCard;
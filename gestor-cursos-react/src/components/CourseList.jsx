import PropTypes from "prop-types";
import CourseCard from "./CourseCard";

const CourseList = ({ courses, favorites, onToggleFavorite }) => {
    if (courses.length === 0) {
        return <p className="message">No se encontraron cursos.</p>;
    }

    return (
        <section className="course-list">
            {courses.map((course) => {
                const isFavorite = favorites.some((fav) => fav.id === course.id);

                return (
                    <CourseCard
                        key={course.id}
                        course={course}
                        isFavorite={isFavorite}
                        onToggleFavorite={onToggleFavorite}
                    />
                );
            })}
        </section>
    );
};

CourseList.propTypes = {
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            teacherId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        })
    ).isRequired,
    favorites: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        })
    ).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
};

export default CourseList; 
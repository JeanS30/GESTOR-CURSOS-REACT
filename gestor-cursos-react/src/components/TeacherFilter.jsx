import PropTypes from "prop-types";

const TeacherFilter = ({ teachers, selectedTeacher, onTeacherChange, favoritesByTeacher }) => {
    return (
        <div className="teacher-filter-container">
            <label htmlFor="teacher-filter">Filtrar por docente:</label>
            <select
                id="teacher-filter"
                value={selectedTeacher}
                onChange={(event) => onTeacherChange(event.target.value)}
            >
                <option value="">Todos los docentes</option>
                {teachers.map((teacherId) => (
                    <option key={teacherId} value={teacherId}>
                        Docente ID: {teacherId} ({favoritesByTeacher[teacherId] || 0} favoritos)
                    </option>
                ))}
            </select>
        </div>
    );
};

TeacherFilter.propTypes = {
    teachers: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    ).isRequired,
    selectedTeacher: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onTeacherChange: PropTypes.func.isRequired,
    favoritesByTeacher: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default TeacherFilter;

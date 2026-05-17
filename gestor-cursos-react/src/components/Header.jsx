import PropTypes from "prop-types";

const Header = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <header className="header">
            <div className="header-content">
                <div>
                    <h1>Gestor de Cursos React</h1>
                    <p>SPA con API, LocalStorage, componentes y buenas prácticas de
                        seguridad.</p>
                </div>
                <button 
                    type="button" 
                    className="dark-mode-btn"
                    onClick={toggleDarkMode}
                    aria-label={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
                >
                    {isDarkMode ? "☀️" : "🌙"}
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    toggleDarkMode: PropTypes.func.isRequired,
};

export default Header; 
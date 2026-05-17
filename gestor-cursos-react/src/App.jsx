import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TeacherFilter from "./components/TeacherFilter";
import CourseList from "./components/CourseList";
import { getCourses } from "./services/courseService";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useDarkMode } from "./hooks/useDarkMode";
function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [favorites, setFavorites] = useLocalStorage("favoriteCourses", []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      setError(error.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const init = async () => {
      await loadCourses();
    };

    void init();
  }, [loadCourses]);

  const availableTeachers = useMemo(() => {
    const teacherSet = new Set(courses.map((course) => course.teacherId));
    return Array.from(teacherSet).sort((a, b) => a - b);
  }, [courses]);

  const favoritesByTeacher = useMemo(() => {
    const count = {};
    
    const courseMap = new Map(courses.map((course) => [course.id, course]));
    
    availableTeachers.forEach((teacherId) => {
      count[teacherId] = favorites.reduce((acc, fav) => {
        const course = courseMap.get(fav.id);
        return course?.teacherId === teacherId ? acc + 1 : acc;
      }, 0);
    });
    
    return count;
  }, [availableTeachers, favorites, courses]);

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(normalizedSearch);
      const matchesTeacher = selectedTeacher === "" || course.teacherId.toString() === selectedTeacher;
      return matchesSearch && matchesTeacher;
    });
  }, [courses, searchTerm, selectedTeacher]);


  const handleToggleFavorite = (course) => {
    const exists = favorites.some((fav) => fav.id === course.id);

    if (exists) {
      const updatedFavorites = favorites.filter((fav) => fav.id !==
        course.id);
      setFavorites(updatedFavorites);
      return;
    }

    setFavorites([...favorites, course]);
  };

  return (
    <main className="app">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <section className="summary">
        <p>Total de cursos: {courses.length}</p>
        <p>Favoritos: {favorites.length}</p>
      </section>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}
      />

      <TeacherFilter 
        teachers={availableTeachers}
        selectedTeacher={selectedTeacher}
        onTeacherChange={setSelectedTeacher}
        favoritesByTeacher={favoritesByTeacher}
      />

      {loading && <p className="message">Cargando cursos...</p>}

      {error && (
        <div className="error">
          <p>{error}</p>
          <button type="button" onClick={loadCourses}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <CourseList
          courses={filteredCourses}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </main>
  );
}

export default App; 
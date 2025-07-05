import React,{useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { learningCourses } from './learningData';

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const course = learningCourses.find(item => item.id === parseInt(id)); 

  if (!course) return <p className="p-6">Course not found</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#2d3150] text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">{course.title}</h2>
        <button onClick={() => navigate("/learning")} className="bg-orange-500 px-3 py-1 rounded">
          Back
        </button>
      </div>
      <div className="p-6 flex justify-center">
        <iframe
          width="100%"
          height="500"
          src={course.videoUrl}
          title={course.title}
          allowFullScreen
          className="rounded shadow-lg max-w-4xl w-full max-sm:h-50"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPage;

import  { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      {/* Header Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 max-w-4xl">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={profilePic || 'https://via.placeholder.com/100'}
              alt="User Avatar"
              className="w-24 h-24 rounded-full shadow-md object-cover"
            />
            <label
              htmlFor="profile-pic"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-400"
            >
              <i className="fas fa-camera"></i>
              <input
                type="file"
                id="profile-pic"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
            <p className="text-gray-500">Full-Stack Developer | Open to Opportunities</p>
            <div className="flex mt-2 gap-4">
              <a href="#" className="text-blue-500 text-xl hover:text-blue-700">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-800 text-xl hover:text-gray-900">
                <FaGithub />
              </a>
              <a href="#" className="text-red-500 text-xl hover:text-red-700">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-11/12 max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
        <p className="text-gray-600 mt-2">
          Passionate full-stack developer with 5+ years of experience in building scalable web applications. Skilled in React, Node.js, and cloud technologies. Eager to learn and grow in innovative projects.
        </p>
      </div>

      {/* Resume Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-11/12 max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-800">Resume</h2>
        <div className="mt-4">
          <label htmlFor="resume" className="block text-lg font-medium text-gray-700">
            Upload Resume (PDF, Word, etc.)
          </label>
          <input
            type="file"
            id="resume"
            accept=".pdf,.docx,.doc"
            onChange={handleResumeChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full md:w-1/2"
          />
          {resume && (
            <div className="mt-4">
              <p className="text-lg text-gray-600">Selected File: {resume.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tags Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-11/12 max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">React</span>
          <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm">Node.js</span>
          <span className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-sm">JavaScript</span>
          <span className="bg-purple-100 text-purple-800 py-1 px-3 rounded-full text-sm">Tailwind CSS</span>
          <span className="bg-gray-100 text-gray-800 py-1 px-3 rounded-full text-sm">Git</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;

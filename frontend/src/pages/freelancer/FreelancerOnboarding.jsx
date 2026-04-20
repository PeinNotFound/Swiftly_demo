import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaFileUpload, FaCheck, FaArrowRight, FaIdCard, FaUserTie, FaPlus, FaTrashAlt, FaExclamationTriangle, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import pdfToText from 'react-pdftotext';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import countryList from 'country-list';

// Predefined Options
const countryOptions = countryList.getData().map(c => ({ value: c.name, label: c.name }));

const degreeOptions = [
  { value: 'High School', label: 'High School' },
  { value: 'Associate Degree', label: 'Associate Degree' },
  { value: 'Bachelor\'s Degree', label: 'Bachelor\'s Degree' },
  { value: 'Master\'s Degree', label: 'Master\'s Degree' },
  { value: 'Doctorate (PhD)', label: 'Doctorate (PhD)' },
  { value: 'Bootcamp / Certificate', label: 'Bootcamp / Certificate' }
];

const commonFields = [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Business Administration', label: 'Business Administration' },
    { value: 'Graphic Design', label: 'Graphic Design' },
    { value: 'Marketing', label: 'Marketing' },
].sort((a,b) => a.label.localeCompare(b.label));

const commonJobs = [
    { value: 'Software Engineer', label: 'Software Engineer' },
    { value: 'Frontend Developer', label: 'Frontend Developer' },
    { value: 'Backend Developer', label: 'Backend Developer' },
    { value: 'Full Stack Developer', label: 'Full Stack Developer' },
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Data Scientist', label: 'Data Scientist' },
].sort((a,b) => a.label.localeCompare(b.label));

const levelOptions = [
    { value: 'fresher', label: 'Fresher' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'expert', label: 'Expert' }
];

// React Select Custom Styling for Premium Dark Mode
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#111827', // gray-900
    borderColor: state.isFocused ? '#eab308' : '#374151', // border-gray-700
    boxShadow: state.isFocused ? '0 0 0 1px #eab308' : 'none',
    '&:hover': { borderColor: '#eab308' },
    color: 'white',
    padding: '2px',
    borderRadius: '0.5rem'
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#1f2937',
    zIndex: 9999,
    borderRadius: '0.5rem',
    overflow: 'hidden'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#374151' : '#1f2937',
    color: 'white',
    '&:active': { backgroundColor: '#eab308', color: 'black' }
  }),
  singleValue: (provided) => ({ ...provided, color: 'white' }),
  input: (provided) => ({ ...provided, color: 'white' }),
  placeholder: (provided) => ({ ...provided, color: '#9ca3af' })
};


const FreelancerOnboarding = () => {
    const { user, updateUser, refreshUser } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Resume State
    const [resumeFile, setResumeFile] = useState(null);
    const [parseError, setParseError] = useState(null);

    // Verification State
    const [idFile, setIdFile] = useState(null);

    // Profile Data State
    const [profileData, setProfileData] = useState({
        phone: '',
        freelancer_level: 'beginner',
        skills: '', 
        education: [{ school: '', location: '', degree: '', field: '', start_date: '', end_date: '' }],
        experience: [{ company: '', sector: '', location: '', title: '', start_date: '', end_date: '', description: '' }],
    });

    const variants = {
        enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 }),
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleClientSideParsing = async () => {
        if (!resumeFile) return;
        setLoading(true);
        setParseError(null);

        const formData = new FormData();
        formData.append('resume', resumeFile);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:8000/api/freelancers/resume/parse', formData, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
            });

            if (res.data.success && res.data.data) {
                const { skills, email, experience_years } = res.data.data;
                const skillsString = Array.isArray(skills) ? skills.join(', ') : '';
                
                let expLevel = profileData.freelancer_level;
                if (experience_years > 5) expLevel = 'expert';
                else if (experience_years > 2) expLevel = 'intermediate';
                
                setProfileData(prev => ({
                    ...prev,
                    phone: prev.phone || '', // Keep existing or empty
                    skills: skillsString,
                    freelancer_level: expLevel
                }));
                toast.success("Resume parsed! We've pre-filled some data.");
            } else {
                 toast.info("Resumed processed, but please fill in your details manually.");
            }
        } catch (error) {
            console.error("PDF Parsing error:", error);
            setParseError("Could not automatically read the file. Please enter details manually.");
            toast.warning("Could not read PDF. Manual entry enabled.");
        } finally {
            setLoading(false);
            nextStep();
        }
    };

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    // Education Handlers
    const addEducation = () => {
        setProfileData({ ...profileData, education: [{ school: '', location: '', degree: '', field: '', start_date: '', end_date: '' }, ...profileData.education] });
    };
    const removeEducation = (index) => {
        const newEdu = [...profileData.education];
        newEdu.splice(index, 1);
        setProfileData({ ...profileData, education: newEdu });
    };
    const updateEducation = (index, field, value) => {
        const newEdu = [...profileData.education];
        newEdu[index][field] = value;
        if (field === 'is_current' && value === true) {
            newEdu[index].end_date = '';
        }
        setProfileData({ ...profileData, education: newEdu });
    };

    // Experience Handlers
    const addExperience = () => {
        setProfileData({ ...profileData, experience: [{ company: '', sector: '', location: '', title: '', start_date: '', end_date: '', description: '' }, ...profileData.experience] });
    };
    const removeExperience = (index) => {
        const newExp = [...profileData.experience];
        newExp.splice(index, 1);
        setProfileData({ ...profileData, experience: newExp });
    };
    const updateExperience = (index, field, value) => {
        const newExp = [...profileData.experience];
        newExp[index][field] = value;
        if (field === 'is_current' && value === true) {
            newExp[index].end_date = '';
        }
        setProfileData({ ...profileData, experience: newExp });
    };

    const handleComplete = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            const skillsArray = profileData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
            const payload = {
                ...profileData,
                skills: skillsArray
            };

            // Submit Verification if file exists
            if (idFile) {
                const formData = new FormData();
                formData.append('id_document', idFile);
                await axios.post('http://localhost:8000/api/freelancers/verification/request', formData, {
                    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
                });
            }

            // Complete Onboarding
            await axios.post('http://localhost:8000/api/freelancers/onboarding/complete', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Welcome to Swiftly, " + user?.name + "!");

            // Aggressively fetch latest data from backend so verification status updates
            await refreshUser();

            navigate("/dashboard/freelancer");

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-yellow-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full"></div>
            </div>

            <div className={`z-10 w-full ${step === 2 ? 'max-w-5xl' : 'max-w-4xl'}`}>
                {step !== 2 && (
                   <div className="mb-4 text-center">
                       <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">
                           Let's Build Your Profile
                       </h1>
                       <p className="text-gray-400">Complete your details to start finding top clients.</p>
                   </div>
                )}

                <div className={`relative transition-all duration-500 ${step === 2 ? 'h-[85vh]' : 'min-h-[500px]'} bg-gray-900/60 backdrop-blur-2xl border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col`}>
                    <AnimatePresence initial={false} custom={step} mode="wait">

                        {/* STEP 1: RESUME */}
                        {step === 1 && (
                            <motion.div key="step1" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col h-full items-center justify-center">
                                <div className="text-center mb-8">
                                    <div className="inline-flex p-5 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-2xl text-yellow-500 mb-6 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                                        <FaFileUpload size={48} />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-3">Upload your Resume</h2>
                                    <p className="text-gray-400 max-w-md mx-auto">Skip the tedious typing. We'll extract your skills and info directly on your browser.</p>
                                </div>

                                <div className="w-full max-w-xl mx-auto border-2 border-dashed border-gray-700/80 rounded-2xl p-14 text-center hover:border-yellow-500 hover:bg-yellow-500/5 transition-all cursor-pointer relative group mb-8 bg-gray-900/50">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setResumeFile(e.target.files[0])}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="text-gray-500 group-hover:text-yellow-500 transition-colors flex flex-col items-center">
                                         <FaCheck className={`mb-4 text-4xl ${resumeFile ? 'text-yellow-500' : 'text-gray-600 group-hover:text-yellow-500'}`} />
                                        <p className="font-semibold text-lg text-white">{resumeFile ? resumeFile.name : "Drag & Drop PDF here"}</p>
                                        {!resumeFile && <p className="text-sm mt-2">or click to browse</p>}
                                    </div>
                                </div>

                                <div className="flex gap-4 justify-center mt-auto w-full max-w-xl">
                                    <button onClick={() => nextStep()} className="px-6 py-3 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors flex-1 font-medium">
                                        Skip / Manual Entry
                                    </button>
                                    <button
                                        onClick={handleClientSideParsing}
                                        disabled={!resumeFile || loading}
                                        className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50 flex-1 transition-all"
                                    >
                                        {loading ? "Reading PDF..." : "Next Step"}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: PROFILE DETAILS */}
                        {step === 2 && (
                            <motion.div key="step2" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col h-full">
                                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-800">
                                     <div>
                                        <h2 className="text-3xl font-extrabold">Your Professional Profile</h2>
                                        <p className="text-gray-400 mt-1">Make yourself stand out to top clients.</p>
                                     </div>
                                     <button onClick={nextStep} className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-colors flex items-center gap-2">
                                         Next Step <FaArrowRight size={12} />
                                     </button>
                                </div>

                                {parseError && (
                                    <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl mb-6 flex items-start gap-4 text-yellow-500">
                                        <FaExclamationTriangle className="mt-1 flex-shrink-0" size={20} />
                                        <p className="text-sm">{parseError}</p>
                                    </div>
                                )}

                                <div className="flex-1 overflow-y-auto pr-4 space-y-10 custom-scrollbar pb-10">
                                    
                                    {/* Personal Info & Skills */}
                                    <section>
                                         <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                                            <FaUserTie className="text-yellow-500" /> Basic Information
                                         </h3>
                                         <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                                                    <input type="text" name="phone" value={profileData.phone} onChange={handleProfileChange} className="w-full bg-[#111827] border border-gray-700 focus:border-yellow-500 rounded-lg p-3 text-white outline-none transition-colors" placeholder="+1 234 567 8900" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Experience Level</label>
                                                    <Select 
                                                        styles={customStyles}
                                                        options={levelOptions}
                                                        value={levelOptions.find(o => o.value === profileData.freelancer_level) || levelOptions[1]}
                                                        onChange={(sel) => setProfileData({...profileData, freelancer_level: sel.value})}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Key Skills (Comma Separated)</label>
                                                <input type="text" name="skills" value={profileData.skills} onChange={handleProfileChange} className="w-full bg-[#111827] border border-gray-700 focus:border-yellow-500 rounded-lg p-3 text-white outline-none transition-colors" placeholder="e.g. React, UI Design, Laravel" />
                                            </div>
                                         </div>
                                    </section>

                                    {/* Education */}
                                    <section>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                                <FaGraduationCap className="text-blue-500" /> Education Background
                                            </h3>
                                            <button onClick={addEducation} type="button" className="text-sm px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2">
                                                <FaPlus size={12}/> Add Education
                                            </button>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            {profileData.education.map((edu, index) => (
                                                <div key={index} className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 relative group">
                                                    <button onClick={() => removeEducation(index)} className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 scale-90 hover:scale-100">
                                                        <FaTrashAlt size={14} />
                                                    </button>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                        <div>
                                                            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">School / University</label>
                                                            <input placeholder="E.g. Harvard University" value={edu.school} onChange={(e) => updateEducation(index, 'school', e.target.value)} className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3 text-sm outline-none focus:border-yellow-500 transition-colors" />
                                                        </div>
                                                        <div style={{zIndex: 50 - index}}>
                                                            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Location (Country)</label>
                                                            <Select styles={customStyles} options={countryOptions} value={countryOptions.find(c => c.value === edu.location) || null} onChange={(s) => updateEducation(index, 'location', s ? s.value : '')} placeholder="Select Country..." />
                                                        </div>
                                                        <div style={{zIndex: 49 - index}}>
                                                            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Degree</label>
                                                            <Select styles={customStyles} options={degreeOptions} value={degreeOptions.find(d => d.value === edu.degree) || null} onChange={(s) => updateEducation(index, 'degree', s ? s.value : '')} placeholder="Select Degree..." />
                                                        </div>
                                                        <div style={{zIndex: 48 - index}}>
                                                            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Field of Study</label>
                                                            <CreatableSelect styles={customStyles} options={commonFields} value={edu.field ? { label: edu.field, value: edu.field } : null} onChange={(s) => updateEducation(index, 'field', s ? s.value : '')} placeholder="E.g. Computer Science..." />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 md:col-span-2">
                                                            <div>
                                                                <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Start Date</label>
                                                                <input type="date" value={edu.start_date} onChange={(e) => updateEducation(index, 'start_date', e.target.value)} className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3 text-sm outline-none focus:border-yellow-500 transition-colors [color-scheme:dark]" />
                                                            </div>
                                                            <div>
                                                                <label className="flex justify-between items-center text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">
                                                                    <span>End Date</span>
                                                                    <label className="flex items-center gap-1.5 lowercase normal-case tracking-normal text-gray-400 cursor-pointer hover:text-white transition-colors">
                                                                        <input type="checkbox" checked={edu.is_current || false} onChange={(e) => updateEducation(index, 'is_current', e.target.checked)} className="accent-yellow-500" />
                                                                        I currently study here
                                                                    </label>
                                                                </label>
                                                                <input type="date" value={edu.end_date} disabled={edu.is_current} onChange={(e) => updateEducation(index, 'end_date', e.target.value)} className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3 text-sm outline-none focus:border-yellow-500 transition-colors [color-scheme:dark] disabled:opacity-50 disabled:cursor-not-allowed" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {profileData.education.length === 0 && <p className="text-gray-500 italic text-sm text-center py-4 bg-gray-800/20 rounded-xl border border-dashed border-gray-700">No education entries added.</p>}
                                        </div>
                                    </section>

                                    {/* Experience */}
                                    <section>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                                <FaBriefcase className="text-emerald-500" /> Professional Experience
                                            </h3>
                                            <button onClick={addExperience} type="button" className="text-sm px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors flex items-center gap-2">
                                                <FaPlus size={12}/> Add Experience
                                            </button>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            {profileData.experience.map((exp, index) => (
                                                <div key={index} className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 relative group">
                                                    <button onClick={() => removeExperience(index)} className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 scale-90 hover:scale-100">
                                                        <FaTrashAlt size={14} />
                                                    </button>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                                        <div>
                                                            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Company Name</label>
                                                            <input placeholder="E.g. Google" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3 text-sm outline-none focus:border-yellow-500 transition-colors" />
                                                        </div>
                                                        <div style={{zIndex: 50 - index}}>
                                                            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Job Title</label>
                                                            <CreatableSelect styles={customStyles} options={commonJobs} value={exp.title ? { label: exp.title, value: exp.title } : null} onChange={(s) => updateExperience(index, 'title', s ? s.value : '')} placeholder="E.g. Frontend Developer..." />
                                                        </div>
                                                        <div style={{zIndex: 49 - index}}>
                                                            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Location (Country)</label>
                                                            <Select styles={customStyles} options={countryOptions} value={countryOptions.find(c => c.value === exp.location) || null} onChange={(s) => updateExperience(index, 'location', s ? s.value : '')} placeholder="Select Country..." />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Sector / Industry</label>
                                                            <input placeholder="E.g. Technology" value={exp.sector} onChange={(e) => updateExperience(index, 'sector', e.target.value)} className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3 text-sm outline-none focus:border-yellow-500 transition-colors" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 md:col-span-2">
                                                            <div>
                                                                <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Start Date</label>
                                                                <input type="date" value={exp.start_date} onChange={(e) => updateExperience(index, 'start_date', e.target.value)} className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3 text-sm outline-none focus:border-yellow-500 transition-colors [color-scheme:dark]" />
                                                            </div>
                                                            <div>
                                                                <label className="flex justify-between items-center text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">
                                                                    <span>End Date</span>
                                                                    <label className="flex items-center gap-1.5 lowercase normal-case tracking-normal text-gray-400 cursor-pointer hover:text-white transition-colors">
                                                                        <input type="checkbox" checked={exp.is_current || false} onChange={(e) => updateExperience(index, 'is_current', e.target.checked)} className="accent-yellow-500" />
                                                                        I currently work here
                                                                    </label>
                                                                </label>
                                                                <input type="date" value={exp.end_date} disabled={exp.is_current} onChange={(e) => updateExperience(index, 'end_date', e.target.value)} className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3 text-sm outline-none focus:border-yellow-500 transition-colors [color-scheme:dark] disabled:opacity-50 disabled:cursor-not-allowed" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Description</label>
                                                        <textarea placeholder="Describe your responsibilities and achievements..." value={exp.description} onChange={(e) => updateExperience(index, 'description', e.target.value)} className="w-full bg-[#111827] border border-gray-700 rounded-lg p-4 text-sm outline-none focus:border-yellow-500 transition-colors h-28 resize-y" />
                                                    </div>
                                                </div>
                                            ))}
                                            {profileData.experience.length === 0 && <p className="text-gray-500 italic text-sm text-center py-4 bg-gray-800/20 rounded-xl border border-dashed border-gray-700">No experience entries added.</p>}
                                        </div>
                                    </section>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: VERIFICATION */}
                        {step === 3 && (
                            <motion.div key="step3" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col h-full bg-gray-900/0">
                                <div className="flex-1 flex flex-col items-center justify-center py-10">
                                    <div className="text-center mb-8">
                                        <div className="inline-block p-6 bg-blue-500/10 rounded-3xl text-blue-500 mb-6 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                                            <FaIdCard size={56} />
                                        </div>
                                        <h2 className="text-3xl font-bold mb-3">Get Verified (Optional)</h2>
                                        <p className="text-gray-400 max-w-sm mx-auto">Verified freelancers are 3x more likely to be hired. Upload a government ID to get your badge.</p>
                                    </div>

                                    <div className="border border-gray-700 rounded-2xl p-8 bg-gray-800/50 w-full max-w-lg mx-auto text-center hover:border-blue-500/50 transition-colors relative">
                                        <label className="block text-sm font-semibold text-gray-300 mb-4 uppercase tracking-widest">Government ID / Passport</label>
                                        <div className="relative">
                                             <input 
                                                type="file" 
                                                accept="image/*,.pdf"
                                                onChange={(e) => setIdFile(e.target.files[0])}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="bg-[#111827] border border-gray-700 rounded-xl p-4 text-gray-400 group-hover:text-white transition-colors">
                                                {idFile ? <span className="text-blue-400 font-medium">{idFile.name}</span> : <span>Click to select ID Document</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-auto pt-6 border-t border-gray-800">
                                    <button onClick={prevStep} className="px-6 py-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors font-medium">Back to Profile</button>
                                    <button 
                                        onClick={handleComplete} 
                                        disabled={loading}
                                        className="flex items-center gap-2 px-10 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-extrabold rounded-full hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] transition-all disabled:opacity-50"
                                    >
                                        {loading ? "Finishing Up..." : "Complete Setup"}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
                
                {/* Step Indicators */}
                <div className="flex justify-center gap-3 mt-8">
                    <div className={`h-2.5 rounded-full transition-all duration-500 ${step >= 1 ? 'w-12 bg-yellow-500 shadow-[0_0_10px_#eab308]' : 'w-3 bg-gray-800'}`}></div>
                    <div className={`h-2.5 rounded-full transition-all duration-500 ${step >= 2 ? 'w-12 bg-yellow-500 shadow-[0_0_10px_#eab308]' : 'w-3 bg-gray-800'}`}></div>
                    <div className={`h-2.5 rounded-full transition-all duration-500 ${step >= 3 ? 'w-12 bg-yellow-500 shadow-[0_0_10px_#eab308]' : 'w-3 bg-gray-800'}`}></div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerOnboarding;

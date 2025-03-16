import React, { useState } from 'react';
import logo from "./logo.jpg";
const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      {showLogin ? (
        <LoginPage onSignUpClick={() => setShowLogin(false)} />
      ) : (
        <SignupPage onLoginClick={() => setShowLogin(true)} />
      )}
    </div>
  );
};

const LoginPage = ({ onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">LiveWell</h1>
        <p className="text-gray-600 mt-2">AI-Powered Healthcare Platform</p>
        <img src={logo} alt="App Logo" className="logo" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="youremail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-700 text-sm font-semibold" htmlFor="password">
              Password
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          Sign In
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSignUpClick}
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

const SignupPage = ({ onLoginClick }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    weight: '',
    height: '',
    fitnessGoals: [],
    healthConditions: []
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Handle final form submission
      console.log('Form submitted with data:', formData);
      // Redirect to dashboard or show success message
    }
  };

  const fitnessGoalOptions = [
    'Weight Loss', 
    'Muscle Gain', 
    'Increased Endurance', 
    'Better Flexibility',
    'Stress Reduction'
  ];

  const healthConditionOptions = [
    'None', 
    'Diabetes', 
    'Hypertension', 
    'Heart Disease',
    'Asthma', 
    'Arthritis'
  ];

  const toggleOption = (field, option) => {
    setFormData(prev => {
      const currentOptions = [...prev[field]];
      if (currentOptions.includes(option)) {
        return { ...prev, [field]: currentOptions.filter(item => item !== option) };
      } else {
        return { ...prev, [field]: [...currentOptions, option] };
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">LiveWell</h1>
        <p className="text-gray-600 mt-2">Create your account</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className={`h-2.5 w-full rounded-full ${currentStep === 1 ? 'bg-blue-200' : 'bg-blue-600'} mr-2`}></div>
          <div className={`h-2.5 w-full rounded-full ${currentStep === 2 ? 'bg-blue-600' : 'bg-blue-200'}`}></div>
        </div>
        <p className="text-center text-gray-600 text-sm">
          Step {currentStep} of 2: {currentStep === 1 ? 'Account Details' : 'Health Information'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(123) 456-7890"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="youremail@example.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="30"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="weight">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => updateFormData('weight', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="height">
                Height (cm)
              </label>
              <input
                id="height"
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="175"
                value={formData.height}
                onChange={(e) => updateFormData('height', e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Fitness Goals (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {fitnessGoalOptions.map(goal => (
                  <div key={goal} className="flex items-center">
                    <input
                      id={`goal-${goal}`}
                      type="checkbox"
                      className="mr-2"
                      checked={formData.fitnessGoals.includes(goal)}
                      onChange={() => toggleOption('fitnessGoals', goal)}
                    />
                    <label htmlFor={`goal-${goal}`} className="text-sm">{goal}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Health Conditions (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {healthConditionOptions.map(condition => (
                  <div key={condition} className="flex items-center">
                    <input
                      id={`condition-${condition}`}
                      type="checkbox"
                      className="mr-2"
                      checked={formData.healthConditions.includes(condition)}
                      onChange={() => toggleOption('healthConditions', condition)}
                    />
                    <label htmlFor={`condition-${condition}`} className="text-sm">{condition}</label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between">
          {currentStep === 2 && (
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className={`${currentStep === 1 ? 'w-full' : ''} bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200`}
          >
            {currentStep === 1 ? 'Continue' : 'Create Account'}
          </button>
        </div>

        {currentStep === 1 && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onLoginClick}
                className="text-blue-600 hover:underline font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
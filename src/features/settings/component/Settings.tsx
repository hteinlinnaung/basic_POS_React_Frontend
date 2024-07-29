import React, { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Profile schema
const profileSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
});

// Account schema
const accountSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Form data types
type ProfileFormData = z.infer<typeof profileSchema>;
type AccountFormData = z.infer<typeof accountSchema>;

const Settings: React.FC = () => {
  const [section, setSection] = useState<'profile' | 'account' | 'app'>('profile');

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerAccount,
    handleSubmit: handleSubmitAccount,
    formState: { errors: accountErrors },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
  });

  const onSubmitProfile = (data: ProfileFormData) => {
    console.log(data);
    // Handle profile form submission
  };

  const onSubmitAccount = (data: AccountFormData) => {
    console.log(data);
    // Handle account form submission
  };

  const getErrorMessage = (error: FieldErrors<ProfileFormData | AccountFormData>) => {
    if (error) {
      if (typeof error === 'string') {
        return error;
      }
    }
    return '';
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="mb-6">
        <button
          className={`px-4 py-2 mr-2 ${section === 'profile' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setSection('profile')}
        >
          Profile Settings
        </button>
        <button
          className={`px-4 py-2 mr-2 ${section === 'account' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setSection('account')}
        >
          Account Settings
        </button>
        <button
          className={`px-4 py-2 ${section === 'app' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setSection('app')}
        >
          App Settings
        </button>
      </div>
      {section === 'profile' && (
        <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              {...registerProfile('username')}
            />
            {profileErrors.username && <p className="text-red-600">{getErrorMessage(profileErrors.username)}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="email"
              {...registerProfile('email')}
            />
            {profileErrors.email && <p className="text-red-600">{getErrorMessage(profileErrors.email)}</p>}
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md" type="submit">Save Profile</button>
        </form>
      )}
      {section === 'account' && (
        <form onSubmit={handleSubmitAccount(onSubmitAccount)}>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="password"
              {...registerAccount('password')}
            />
            {accountErrors.password && <p className="text-red-600">{getErrorMessage(accountErrors.password)}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="password"
              {...registerAccount('confirmPassword')}
            />
            {accountErrors.confirmPassword && <p className="text-red-600">{getErrorMessage(accountErrors.confirmPassword)}</p>}
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md" type="submit">Save Account</button>
        </form>
      )}
      {section === 'app' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Theme</label>
            <select className="mt-1 p-2 w-full border rounded-md">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Notifications</label>
            <select className="mt-1 p-2 w-full border rounded-md">
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md">Save App Settings</button>
        </div>
      )}
    </div>
  );
};

export default Settings;

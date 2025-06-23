'use client';

import { useState } from 'react';
import { User, Phone, Lock, Eye, EyeOff, Car, MapPin, Navigation, Zap, ArrowRight, Shield } from 'lucide-react';

export default function AuthForm({
    type, onSubmit, onToggleMode,
}: { 
    type: 'login' | 'register'; 
    onSubmit: (data: { name: string; phone: string; password: string; role?: string }) => void;
    onToggleMode?: () => void;
}) {
    const [formData, setFormData] = useState({
        name: '', phone: '', password: '', role: 'RIDER',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10">
                    <Car className="w-8 h-8 text-blue-600 animate-pulse" style={{animationDelay: '0s'}} />
                </div>
                <div className="absolute bottom-32 right-16">
                    <Navigation className="w-6 h-6 text-blue-600 animate-pulse" style={{animationDelay: '1s'}} />
                </div>
                <div className="absolute top-1/3 right-8">
                    <MapPin className="w-7 h-7 text-blue-600 animate-pulse" style={{animationDelay: '2s'}} />
                </div>
                <div className="absolute bottom-20 left-20">
                    <Shield className="w-6 h-6 text-blue-600 animate-pulse" style={{animationDelay: '1.5s'}} />
                </div>
            </div>

            {/* Main container */}
            <div className="relative z-10 w-full max-w-md">
                {/* App branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <div className="relative">
                            <Car className="w-8 h-8 text-white" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center">
                                <Zap className="w-1.5 h-1.5 text-white" />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Hop On</h1>
                    <p className="text-gray-500 text-sm">Your journey starts here</p>
                </div>

                {/* Form card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
                    {/* Dynamic form header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {type === 'login' ? 'Welcome Back!' : 'Join RideShare'}
                        </h2>
                        <p className="text-gray-600 text-sm">
                            {type === 'login' 
                                ? 'Sign in to continue your journey' 
                                : 'Create your account and start riding'}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Show name and role only for register */}
                        {type === 'register' && (
                            <>
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="block text-gray-700 text-sm font-medium">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'name' ? 'text-blue-600' : 'text-gray-400'}`} />
                                        </div>
                                        <input 
                                            type='text'
                                            placeholder='Enter your full name'
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField('')}
                                            required
                                            className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                                        />
                                    </div>
                                </div>

                                {/* Role Selection */}
                                <div className="space-y-3">
                                    <label className="block text-gray-700 text-sm font-medium">How will you use RideShare?</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div 
                                            onClick={() => setFormData({...formData, role: 'RIDER'})}
                                            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                                formData.role === 'RIDER' 
                                                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                                                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                                                    formData.role === 'RIDER' ? 'bg-blue-100' : 'bg-white'
                                                }`}>
                                                    <User className={`w-6 h-6 ${formData.role === 'RIDER' ? 'text-blue-600' : 'text-gray-600'}`} />
                                                </div>
                                                <div className="text-center">
                                                    <span className={`font-medium text-sm block ${formData.role === 'RIDER' ? 'text-blue-700' : 'text-gray-700'}`}>
                                                        I need rides
                                                    </span>
                                                    <span className="text-gray-500 text-xs">Book and travel</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div 
                                            onClick={() => setFormData({...formData, role: 'DRIVER'})}
                                            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                                formData.role === 'DRIVER' 
                                                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                                                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                                                    formData.role === 'DRIVER' ? 'bg-blue-100' : 'bg-white'
                                                }`}>
                                                    <Car className={`w-6 h-6 ${formData.role === 'DRIVER' ? 'text-blue-600' : 'text-gray-600'}`} />
                                                </div>
                                                <div className="text-center">
                                                    <span className={`font-medium text-sm block ${formData.role === 'DRIVER' ? 'text-blue-700' : 'text-gray-700'}`}>
                                                        I want to drive
                                                    </span>
                                                    <span className="text-gray-500 text-xs">Earn money</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Phone Input - Always shown */}
                        <div className="space-y-2">
                            <label className="block text-gray-700 text-sm font-medium">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'phone' ? 'text-blue-600' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    onFocus={() => setFocusedField('phone')}
                                    onBlur={() => setFocusedField('')}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password Input - Always shown */}
                        <div className="space-y-2">
                            <label className="block text-gray-700 text-sm font-medium">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'password' ? 'text-blue-600' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder={type === 'login' ? 'Enter your password' : 'Create a secure password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField('')}
                                    required
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors duration-200"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onSubmit(formData);
                            }}
                            className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 overflow-hidden group mt-8"
                        >
                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                <span>
                                    {type === 'login' ? 'Sign In to RideShare' : 'Create My Account'}
                                </span>
                                <ArrowRight className="w-5 h-5" />
                            </span>
                        </button>

                        {/* Forgot password for login */}
                        {type === 'login' && (
                            <div className="text-center">
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
                                    Forgot your password?
                                </button>
                            </div>
                        )}

                        {/* Security note for register */}
                        {/* {type === 'register' && (
                            <div className="flex items-start space-x-3 text-gray-600 text-xs bg-gray-50 p-4 rounded-xl">
                                <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                                <div>
                                    <p className="font-medium text-gray-700 mb-1">Your privacy is protected</p>
                                    <p>We use bank-level encryption and never share your personal information with third parties.</p>
                                </div>
                            </div>
                        )} */}

                        {/* Footer */}
                        <div className="text-center pt-6 border-t border-gray-200">
                            <p className="text-gray-600 text-sm">
                                {type === 'login' 
                                    ? "Don't have an account? " 
                                    : "Already have an account? "
                                }
                                <button 
                                    onClick={onToggleMode}
                                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 underline-offset-2 hover:underline"
                                >
                                    {type === 'login' ? 'Sign up here' : 'Sign in instead'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trust indicators */}
                {/* <div className="flex items-center justify-center space-x-8 mt-8 text-gray-400 text-xs">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>256-bit SSL</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>5M+ Users</span>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
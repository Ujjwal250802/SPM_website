import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, Calendar, User, Phone, Mail, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface AppointmentFormData {
  name: string;
  phone: string;
  email?: string;
  serviceType: 'bridal' | 'party' | 'normal';
  details?: string;
  preferredDate?: string;
}

const AppointmentForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AppointmentFormData>();

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/appointments', data);
      toast.success('Appointment request sent successfully!');
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send appointment request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="py-20 bg-gradient-to-br from-primary-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Book Your Appointment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your look? Schedule your appointment with our expert beauticians today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 mr-2 text-primary-500" />
                  Full Name *
                </label>
                <input
                  {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
                  type="text"
                  className="input-field"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 mr-2 text-primary-500" />
                  Phone Number *
                </label>
                <input
                  {...register('phone', { required: 'Phone number is required', minLength: { value: 10, message: 'Phone number must be at least 10 digits' } })}
                  type="tel"
                  className="input-field"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 mr-2 text-primary-500" />
                  Email Address
                </label>
                <input
                  {...register('email', { 
                    pattern: { 
                      value: /^\S+@\S+$/i, 
                      message: 'Please enter a valid email address' 
                    } 
                  })}
                  type="email"
                  className="input-field"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                  Preferred Date
                </label>
                <input
                  {...register('preferredDate')}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type *
              </label>
              <select
                {...register('serviceType', { required: 'Please select a service type' })}
                className="input-field"
              >
                <option value="">Select Service Type</option>
                <option value="bridal">Bridal Makeup</option>
                <option value="party">Party Makeup</option>
                <option value="normal">Normal/Regular Service</option>
              </select>
              {errors.serviceType && (
                <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="h-4 w-4 mr-2 text-primary-500" />
                Additional Details
              </label>
              <textarea
                {...register('details')}
                rows={4}
                className="input-field resize-none"
                placeholder="Tell us more about what you're looking for..."
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-4 px-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Appointment Request</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentForm;
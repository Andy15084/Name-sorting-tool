'use client';

import { useState } from 'react';
import { X, Plus, Mail, Phone, Trash2 } from 'lucide-react';
import { Person, ContactInfo, SocialMedia } from '@/types';

interface AddPersonModalProps {
  onClose: () => void;
  onAdd: (person: Omit<Person, 'id'>) => void;
  availableProfessions: string[];
  availableSchools: string[];
  onAddNewProfession: (profession: string) => void;
}

const socialPlatforms = [
  'Facebook',
  'Instagram',
  'Twitter',
  'LinkedIn',
  'TikTok',
  'YouTube',
  'GitHub',
  'Discord',
  'Snapchat',
  'WhatsApp',
];

export default function AddPersonModal({
  onClose,
  onAdd,
  availableProfessions,
  availableSchools,
  onAddNewProfession,
}: AddPersonModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    whenWeMet: '',
    school: '',
    professionText: '',
  });
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [newProfessionInput, setNewProfessionInput] = useState('');
  const [showAddProfession, setShowAddProfession] = useState(false);
  const [showSchoolSuggestions, setShowSchoolSuggestions] = useState(false);
  const [showContactType, setShowContactType] = useState(false);
  const [showSocialMediaForm, setShowSocialMediaForm] = useState(false);
  const [newContact, setNewContact] = useState<ContactInfo>({ type: 'email', value: '' });
  const [newSocial, setNewSocial] = useState<SocialMedia>({ platform: 'Facebook', url: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dateOfBirth || !formData.whenWeMet) {
      alert('Please fill in all required fields');
      return;
    }

    onAdd({
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      whenWeMet: formData.whenWeMet,
      school: formData.school || undefined,
      professionText: formData.professionText || undefined,
      professions: selectedProfessions,
      contacts: contacts,
      socialMedia: socialMedia,
      comments: [],
    });

    onClose();
  };

  const toggleProfession = (profession: string) => {
    if (selectedProfessions.includes(profession)) {
      setSelectedProfessions(selectedProfessions.filter((p) => p !== profession));
    } else {
      setSelectedProfessions([...selectedProfessions, profession]);
    }
  };

  const handleAddNewProfession = () => {
    if (newProfessionInput.trim()) {
      onAddNewProfession(newProfessionInput.trim());
      setSelectedProfessions([...selectedProfessions, newProfessionInput.trim()]);
      setNewProfessionInput('');
      setShowAddProfession(false);
    }
  };

  const handleSchoolSelect = (school: string) => {
    setFormData({ ...formData, school });
    setShowSchoolSuggestions(false);
  };

  const handleAddContact = () => {
    if (newContact.value.trim()) {
      setContacts([...contacts, newContact]);
      setNewContact({ type: 'email', value: '' });
      setShowContactType(false);
    }
  };

  const handleRemoveContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleAddSocialMedia = () => {
    if (newSocial.url.trim()) {
      setSocialMedia([...socialMedia, newSocial]);
      setNewSocial({ platform: 'Facebook', url: '' });
      setShowSocialMediaForm(false);
    }
  };

  const handleRemoveSocialMedia = (index: number) => {
    setSocialMedia(socialMedia.filter((_, i) => i !== index));
  };

  const filteredSchools = availableSchools.filter(school =>
    school.toLowerCase().includes(formData.school.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-3xl sm:rounded-4xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-peach-500 px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center rounded-t-3xl sm:rounded-t-4xl z-10">
          <h2 className="text-lg sm:text-2xl font-bold text-white">Add New Contact</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
            title="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Name <span className="text-peach-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3.5 border-2 border-peach-200 rounded-3xl focus:ring-2 focus:ring-peach-400 focus:border-peach-400 outline-none transition-all duration-200 text-gray-900"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
              Date of Birth <span className="text-peach-500">*</span>
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="w-full px-5 py-3.5 border-2 border-peach-200 rounded-3xl focus:ring-2 focus:ring-peach-400 focus:border-peach-400 outline-none transition-all duration-200 text-gray-900"
              required
            />
          </div>

          {/* When We Met */}
          <div>
            <label htmlFor="whenWeMet" className="block text-sm font-semibold text-gray-700 mb-2">
              When We Met <span className="text-peach-500">*</span>
            </label>
            <textarea
              id="whenWeMet"
              value={formData.whenWeMet}
              onChange={(e) => setFormData({ ...formData, whenWeMet: e.target.value })}
              className="w-full px-5 py-3.5 border-2 border-peach-200 rounded-3xl focus:ring-2 focus:ring-peach-400 focus:border-peach-400 outline-none resize-none transition-all duration-200 text-gray-900"
              placeholder="Describe how and when you met..."
              rows={3}
              required
            />
          </div>

          {/* School with Autocomplete */}
          <div className="relative">
            <label htmlFor="school" className="block text-sm font-semibold text-gray-700 mb-2">
              School
            </label>
            <input
              id="school"
              type="text"
              value={formData.school}
              onChange={(e) => {
                setFormData({ ...formData, school: e.target.value });
                setShowSchoolSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSchoolSuggestions(formData.school.length > 0)}
              className="w-full px-5 py-3.5 border-2 border-sage-200 rounded-3xl focus:ring-2 focus:ring-sage-400 focus:border-sage-400 outline-none transition-all duration-200 text-gray-900"
              placeholder="Enter school name"
            />
            
            {showSchoolSuggestions && filteredSchools.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-sage-200 rounded-3xl shadow-lg max-h-48 overflow-y-auto">
                {filteredSchools.map((school) => (
                  <button
                    key={school}
                    type="button"
                    onClick={() => handleSchoolSelect(school)}
                    className="w-full text-left px-5 py-3 hover:bg-sage-50 transition-colors first:rounded-t-3xl last:rounded-b-3xl"
                  >
                    {school}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contact Information Section */}
          <div className="border-2 border-blue-200 rounded-3xl p-5 bg-blue-50/30">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Contact Information
            </label>
            
            {/* Display existing contacts */}
            {contacts.length > 0 && (
              <div className="space-y-2 mb-3">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-full border border-blue-200">
                    {contact.type === 'email' ? (
                      <Mail className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Phone className="w-4 h-4 text-blue-600" />
                    )}
                    <span className="flex-1 text-sm text-gray-700">{contact.value}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveContact(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Contact Form */}
            {!showContactType ? (
              <button
                type="button"
                onClick={() => setShowContactType(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-blue-600 hover:bg-blue-100 rounded-3xl transition-all duration-200 font-medium border border-blue-300"
              >
                <Plus className="w-4 h-4" />
                Add Contact
              </button>
            ) : (
              <div className="space-y-3">
                <select
                  value={newContact.type}
                  onChange={(e) => setNewContact({ ...newContact, type: e.target.value as 'email' | 'phone' })}
                  className="w-full px-4 py-2.5 border-2 border-blue-200 rounded-3xl outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone Number</option>
                </select>
                <div className="flex gap-3">
                  <input
                    type={newContact.type === 'email' ? 'email' : 'tel'}
                    value={newContact.value}
                    onChange={(e) => setNewContact({ ...newContact, value: e.target.value })}
                    placeholder={newContact.type === 'email' ? 'Enter email address' : 'Enter phone number'}
                    className="flex-1 px-5 py-2.5 border-2 border-blue-200 rounded-3xl focus:ring-2 focus:ring-blue-400 outline-none text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddContact}
                    className="px-5 py-2.5 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition-all duration-200 font-medium shadow-md"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowContactType(false);
                      setNewContact({ type: 'email', value: '' });
                    }}
                    className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-3xl hover:bg-gray-300 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Social Media Section */}
          <div className="border-2 border-purple-200 rounded-3xl p-5 bg-purple-50/30">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Social Media
            </label>
            
            {/* Display existing social media */}
            {socialMedia.length > 0 && (
              <div className="space-y-2 mb-3">
                {socialMedia.map((social, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-full border border-purple-200">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {social.platform}
                    </span>
                    <span className="flex-1 text-sm text-gray-700 truncate">{social.url}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSocialMedia(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Social Media Form */}
            {!showSocialMediaForm ? (
              <button
                type="button"
                onClick={() => setShowSocialMediaForm(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-purple-600 hover:bg-purple-100 rounded-3xl transition-all duration-200 font-medium border border-purple-300"
              >
                <Plus className="w-4 h-4" />
                Add Social Media
              </button>
            ) : (
              <div className="space-y-3">
                <select
                  value={newSocial.platform}
                  onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-purple-200 rounded-3xl outline-none focus:ring-2 focus:ring-purple-400 text-gray-900"
                >
                  {socialPlatforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={newSocial.url}
                    onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                    placeholder="Enter profile URL"
                    className="flex-1 px-5 py-2.5 border-2 border-purple-200 rounded-3xl focus:ring-2 focus:ring-purple-400 outline-none text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddSocialMedia}
                    className="px-5 py-2.5 bg-purple-500 text-white rounded-3xl hover:bg-purple-600 transition-all duration-200 font-medium shadow-md"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSocialMediaForm(false);
                      setNewSocial({ platform: 'Facebook', url: '' });
                    }}
                    className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-3xl hover:bg-gray-300 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profession Text */}
          <div>
            <label htmlFor="professionText" className="block text-sm font-semibold text-gray-700 mb-2">
              Profession Description
            </label>
            <textarea
              id="professionText"
              value={formData.professionText}
              onChange={(e) => setFormData({ ...formData, professionText: e.target.value })}
              className="w-full px-5 py-3.5 border-2 border-peach-200 rounded-3xl focus:ring-2 focus:ring-peach-400 focus:border-peach-400 outline-none resize-none transition-all duration-200 text-gray-900"
              placeholder="Describe their profession..."
              rows={2}
            />
          </div>

          {/* Select Professions */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Professions
            </label>
            <div className="flex flex-wrap gap-3 mb-4">
              {availableProfessions.map((profession) => (
                <button
                  key={profession}
                  type="button"
                  onClick={() => toggleProfession(profession)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                    selectedProfessions.includes(profession)
                      ? 'bg-sage-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {profession}
                </button>
              ))}
            </div>

            {/* Add New Profession */}
            {!showAddProfession ? (
              <button
                type="button"
                onClick={() => setShowAddProfession(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-peach-600 hover:bg-peach-50 rounded-3xl transition-all duration-200 font-medium border border-peach-300"
              >
                <Plus className="w-4 h-4" />
                Add New Profession
              </button>
            ) : (
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newProfessionInput}
                  onChange={(e) => setNewProfessionInput(e.target.value)}
                  placeholder="Enter new profession"
                  className="flex-1 px-5 py-2.5 border-2 border-peach-200 rounded-3xl focus:ring-2 focus:ring-peach-400 focus:border-peach-400 outline-none transition-all duration-200 text-gray-900"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddNewProfession();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddNewProfession}
                  className="px-5 py-2.5 bg-sage-500 text-white rounded-3xl hover:bg-sage-600 transition-all duration-200 font-medium shadow-md"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProfession(false);
                    setNewProfessionInput('');
                  }}
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-3xl hover:bg-gray-300 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Selected Professions Display */}
          {selectedProfessions.length > 0 && (
            <div className="bg-sage-50 p-5 rounded-3xl border border-sage-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">Selected Professions:</p>
              <div className="flex flex-wrap gap-2">
                {selectedProfessions.map((profession) => (
                  <span
                    key={profession}
                    className="px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-medium shadow-sm border border-sage-200"
                  >
                    {profession}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3.5 border-2 border-gray-300 text-gray-700 rounded-3xl hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3.5 bg-peach-500 text-white rounded-3xl hover:bg-peach-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

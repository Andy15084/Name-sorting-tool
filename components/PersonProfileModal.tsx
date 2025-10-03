'use client';

import { useState } from 'react';
import { X, Calendar, GraduationCap, Briefcase, User, Mail, Phone, Link as LinkIcon, Edit2, Save, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { Person, Comment } from '@/types';

interface PersonProfileModalProps {
  person: Person;
  onClose: () => void;
  onUpdate: (updatedPerson: Person) => void;
  onDelete: (personId: string) => void;
}

export default function PersonProfileModal({ person, onClose, onUpdate, onDelete }: PersonProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPerson, setEditedPerson] = useState<Person>({
    ...person,
    comments: person.comments || [],
    contacts: person.contacts || [],
    socialMedia: person.socialMedia || [],
    professions: person.professions || [],
  });
  const [newComment, setNewComment] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactInfo, setNewContactInfo] = useState<{ type: 'email' | 'phone'; value: string }>({ type: 'email', value: '' });
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [newSocialInfo, setNewSocialInfo] = useState({ platform: 'Facebook', url: '' });

  const handleSave = () => {
    onUpdate(editedPerson);
    setIsEditing(false);
    setShowAddContact(false);
    setShowAddSocial(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${editedPerson.name}? This action cannot be undone.`)) {
      onDelete(editedPerson.id);
      onClose();
    }
  };

  const handleAddContactInfo = () => {
    if (newContactInfo.value.trim()) {
      setEditedPerson({
        ...editedPerson,
        contacts: [...editedPerson.contacts, newContactInfo],
      });
      setNewContactInfo({ type: 'email', value: '' });
      setShowAddContact(false);
    }
  };

  const handleRemoveContactInfo = (index: number) => {
    setEditedPerson({
      ...editedPerson,
      contacts: editedPerson.contacts.filter((_, i) => i !== index),
    });
  };

  const handleAddSocialInfo = () => {
    if (newSocialInfo.url.trim()) {
      setEditedPerson({
        ...editedPerson,
        socialMedia: [...editedPerson.socialMedia, newSocialInfo],
      });
      setNewSocialInfo({ platform: 'Facebook', url: '' });
      setShowAddSocial(false);
    }
  };

  const handleRemoveSocialInfo = (index: number) => {
    setEditedPerson({
      ...editedPerson,
      socialMedia: editedPerson.socialMedia.filter((_, i) => i !== index),
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        text: newComment.trim(),
        timestamp: new Date().toISOString(),
      };
      const updatedPerson = {
        ...editedPerson,
        comments: [...editedPerson.comments, comment],
      };
      setEditedPerson(updatedPerson);
      onUpdate(updatedPerson);
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId: string) => {
    const updatedPerson = {
      ...editedPerson,
      comments: editedPerson.comments.filter(c => c.id !== commentId),
    };
    setEditedPerson(updatedPerson);
    onUpdate(updatedPerson);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-3xl sm:rounded-4xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-peach-400 to-sage-400 px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center rounded-t-3xl sm:rounded-t-4xl z-10">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center text-peach-600 font-bold text-lg sm:text-2xl shadow-lg flex-shrink-0">
              {editedPerson.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl font-bold text-white truncate">{editedPerson.name}</h2>
              <p className="text-white/90 text-xs sm:text-sm">Contact Profile</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full transition-all duration-200"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-sage-600 hover:bg-white/90 rounded-full transition-all duration-200 font-semibold text-sm"
              >
                <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
              title="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <div className="bg-peach-50 rounded-3xl p-5 border border-peach-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-peach-600" />
              Basic Information
            </h3>
            <div className="space-y-3">
              {isEditing ? (
                <>
                  <div>
                    <label className="text-xs text-gray-600 font-medium block mb-1">Name</label>
                    <input
                      type="text"
                      value={editedPerson.name}
                      onChange={(e) => setEditedPerson({ ...editedPerson, name: e.target.value })}
                      className="w-full px-3 py-2 border border-peach-300 rounded-2xl focus:ring-2 focus:ring-peach-400 outline-none text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 font-medium block mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={editedPerson.dateOfBirth}
                      onChange={(e) => setEditedPerson({ ...editedPerson, dateOfBirth: e.target.value })}
                      className="w-full px-3 py-2 border border-peach-300 rounded-2xl focus:ring-2 focus:ring-peach-400 outline-none text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 font-medium block mb-1">School</label>
                    <input
                      type="text"
                      value={editedPerson.school || ''}
                      onChange={(e) => setEditedPerson({ ...editedPerson, school: e.target.value })}
                      className="w-full px-3 py-2 border border-peach-300 rounded-2xl focus:ring-2 focus:ring-peach-400 outline-none text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 font-medium block mb-1">When We Met</label>
                    <textarea
                      value={editedPerson.whenWeMet}
                      onChange={(e) => setEditedPerson({ ...editedPerson, whenWeMet: e.target.value })}
                      className="w-full px-3 py-2 border border-peach-300 rounded-2xl focus:ring-2 focus:ring-peach-400 outline-none text-sm resize-none text-gray-900"
                      rows={3}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-peach-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Date of Birth</p>
                      <p className="text-sm text-gray-900">{editedPerson.dateOfBirth}</p>
                    </div>
                  </div>
                  
                  {editedPerson.school && (
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-sage-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600 font-medium">School</p>
                        <p className="text-sm text-gray-900">{editedPerson.school}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium">When We Met</p>
                      <p className="text-sm text-gray-900 italic">"{editedPerson.whenWeMet}"</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-3xl p-5 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Contact Information
            </h3>
            
            {editedPerson.contacts && editedPerson.contacts.length > 0 && (
              <div className="space-y-2 mb-4">
                {editedPerson.contacts.map((contact, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl">
                    {contact.type === 'email' ? (
                      <Mail className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Phone className="w-4 h-4 text-blue-600" />
                    )}
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-medium capitalize">{contact.type}</p>
                      <p className="text-sm text-gray-900">{contact.value}</p>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveContactInfo(idx)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {isEditing && (
              <>
                {!showAddContact ? (
                  <button
                    onClick={() => setShowAddContact(true)}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-100 rounded-full transition-all duration-200 font-medium text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Contact Info
                  </button>
                ) : (
                  <div className="space-y-2">
                    <select
                      value={newContactInfo.type}
                      onChange={(e) => setNewContactInfo({ ...newContactInfo, type: e.target.value as 'email' | 'phone' })}
                      className="w-full px-3 py-2 border border-blue-300 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-900"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone Number</option>
                    </select>
                    <div className="flex gap-2">
                      <input
                        type={newContactInfo.type === 'email' ? 'email' : 'tel'}
                        value={newContactInfo.value}
                        onChange={(e) => setNewContactInfo({ ...newContactInfo, value: e.target.value })}
                        placeholder={newContactInfo.type === 'email' ? 'Enter email' : 'Enter phone number'}
                        className="flex-1 px-3 py-2 border border-blue-300 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none text-sm text-gray-900"
                      />
                      <button
                        onClick={handleAddContactInfo}
                        className="px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-200 font-medium text-sm"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowAddContact(false);
                          setNewContactInfo({ type: 'email', value: '' });
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-200 font-medium text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Professions */}
          <div className="bg-sage-50 rounded-3xl p-5 border border-sage-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-sage-600" />
              Professions
            </h3>
            
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600 font-medium block mb-1">Description</label>
                  <textarea
                    value={editedPerson.professionText || ''}
                    onChange={(e) => setEditedPerson({ ...editedPerson, professionText: e.target.value })}
                    className="w-full px-3 py-2 border border-sage-300 rounded-2xl focus:ring-2 focus:ring-sage-400 outline-none text-sm resize-none text-gray-900"
                    rows={2}
                  />
                </div>
              </div>
            ) : (
              <>
                {editedPerson.professionText && (
                  <div className="mb-4 bg-white px-4 py-3 rounded-2xl">
                    <p className="text-xs text-gray-600 font-medium mb-1">Description</p>
                    <p className="text-sm text-gray-900">{editedPerson.professionText}</p>
                  </div>
                )}

                {editedPerson.professions.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-2">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {editedPerson.professions.map((profession) => (
                        <span
                          key={profession}
                          className="px-4 py-2 bg-sage-200 text-sage-900 rounded-full text-sm font-medium"
                        >
                          {profession}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Social Media */}
          <div className="bg-purple-50 rounded-3xl p-5 border border-purple-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-purple-600" />
              Social Media
            </h3>

            {editedPerson.socialMedia && editedPerson.socialMedia.length > 0 && (
              <div className="space-y-2 mb-4">
                {editedPerson.socialMedia.map((social, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl">
                    <LinkIcon className="w-4 h-4 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-medium">{social.platform}</p>
                      {isEditing ? (
                        <p className="text-sm text-gray-900 truncate">{social.url}</p>
                      ) : (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-700 hover:text-purple-900 truncate block"
                        >
                          {social.url}
                        </a>
                      )}
                    </div>
                    {isEditing ? (
                      <button
                        onClick={() => handleRemoveSocialInfo(idx)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-4 h-4 text-gray-400 hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {isEditing && (
              <>
                {!showAddSocial ? (
                  <button
                    onClick={() => setShowAddSocial(true)}
                    className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-100 rounded-full transition-all duration-200 font-medium text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Social Media
                  </button>
                ) : (
                  <div className="space-y-2">
                    <select
                      value={newSocialInfo.platform}
                      onChange={(e) => setNewSocialInfo({ ...newSocialInfo, platform: e.target.value })}
                      className="w-full px-3 py-2 border border-purple-300 rounded-2xl outline-none focus:ring-2 focus:ring-purple-400 text-sm text-gray-900"
                    >
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="TikTok">TikTok</option>
                      <option value="YouTube">YouTube</option>
                      <option value="GitHub">GitHub</option>
                      <option value="Discord">Discord</option>
                      <option value="Snapchat">Snapchat</option>
                      <option value="WhatsApp">WhatsApp</option>
                    </select>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newSocialInfo.url}
                        onChange={(e) => setNewSocialInfo({ ...newSocialInfo, url: e.target.value })}
                        placeholder="Enter profile URL"
                        className="flex-1 px-3 py-2 border border-purple-300 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none text-sm text-gray-900"
                      />
                      <button
                        onClick={handleAddSocialInfo}
                        className="px-4 py-2 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition-all duration-200 font-medium text-sm"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowAddSocial(false);
                          setNewSocialInfo({ platform: 'Facebook', url: '' });
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-200 font-medium text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Comments Section */}
          <div className="bg-yellow-50 rounded-3xl p-5 border border-yellow-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-yellow-600" />
              Comments & Notes
            </h3>

            {/* Add Comment */}
            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a note or comment..."
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none text-sm resize-none text-gray-900"
                rows={3}
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="mt-2 flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add Comment
              </button>
            </div>

            {/* Comments List */}
            {editedPerson.comments && editedPerson.comments.length > 0 ? (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {editedPerson.comments.map((comment) => (
                  <div key={comment.id} className="bg-white rounded-2xl p-4 border border-yellow-200">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs text-gray-500">{formatDate(comment.timestamp)}</p>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No comments yet. Add your first note above!</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 rounded-b-4xl">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all duration-200 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

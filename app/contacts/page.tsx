'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, UserPlus, LogOut, GraduationCap, Briefcase, Calendar, User, Grid3x3, List, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Person, SearchType } from '@/types';
import AddPersonModal from '@/components/AddPersonModal';
import PersonProfileModal from '@/components/PersonProfileModal';

export default function ContactsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [contacts, setContacts] = useState<Person[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Person[]>([]);
  const [searchType, setSearchType] = useState<SearchType>('name');
  const [searchValue, setSearchValue] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'bubbles' | 'table'>('bubbles');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [availableProfessions, setAvailableProfessions] = useState<string[]>([
    'Engineer',
    'Doctor',
    'Teacher',
    'Designer',
    'Developer',
  ]);
  const [availableSchools, setAvailableSchools] = useState<string[]>([]);

  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated');
    const name = sessionStorage.getItem('userName');
    
    if (!auth) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
      setUserName(name || '');
      
      // Fetch contacts from database
      fetchContacts();
      
      // Load professions and schools from localStorage (non-critical data)
      const savedProfessions = localStorage.getItem('professions');
      const savedSchools = localStorage.getItem('schools');
      
      if (savedProfessions) {
        setAvailableProfessions(JSON.parse(savedProfessions));
      }

      if (savedSchools) {
        setAvailableSchools(JSON.parse(savedSchools));
      }
    }
  }, [router]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      if (response.ok) {
        const data = await response.json();
        const normalizedContacts = data.map((c: Person) => ({
          ...c,
          comments: c.comments || [],
          contacts: c.contacts || [],
          socialMedia: c.socialMedia || [],
          professions: c.professions || [],
        }));
        setContacts(normalizedContacts);
        setFilteredContacts(normalizedContacts);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  useEffect(() => {
    let filtered = [...contacts];

    if (searchValue) {
      switch (searchType) {
        case 'name':
          filtered = filtered.filter((contact) =>
            contact.name.toLowerCase().includes(searchValue.toLowerCase())
          );
          break;
        case 'dateOfBirth':
          filtered = filtered.filter((contact) =>
            contact.dateOfBirth === searchValue
          );
          break;
        case 'school':
          filtered = filtered.filter((contact) =>
            contact.school?.toLowerCase().includes(searchValue.toLowerCase())
          );
          break;
        case 'profession':
          filtered = filtered.filter((contact) =>
            contact.professions.some(p => 
              p.toLowerCase().includes(searchValue.toLowerCase())
            ) ||
            contact.professionText?.toLowerCase().includes(searchValue.toLowerCase())
          );
          break;
      }
    }

    setFilteredContacts(filtered);
  }, [searchValue, searchType, contacts]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userName');
    router.push('/');
  };

  const handleAddContact = async (person: Omit<Person, 'id'>) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...person,
          comments: [],
        }),
      });

      if (response.ok) {
        // Refresh contacts from database
        await fetchContacts();
        
        // Update schools list
        if (person.school && !availableSchools.includes(person.school)) {
          const updatedSchools = [...availableSchools, person.school];
          setAvailableSchools(updatedSchools);
          localStorage.setItem('schools', JSON.stringify(updatedSchools));
        }
      }
    } catch (error) {
      console.error('Failed to add contact:', error);
      alert('Failed to add contact. Please try again.');
    }
  };

  const handleUpdatePerson = async (updatedPerson: Person) => {
    try {
      const response = await fetch(`/api/contacts/${updatedPerson.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPerson),
      });

      if (response.ok) {
        // Update local state immediately for better UX
        const updatedContacts = contacts.map(c => 
          c.id === updatedPerson.id ? updatedPerson : c
        );
        setContacts(updatedContacts);
        
        const updatedFiltered = filteredContacts.map(c => 
          c.id === updatedPerson.id ? updatedPerson : c
        );
        setFilteredContacts(updatedFiltered);
        setSelectedPerson(updatedPerson);
      }
    } catch (error) {
      console.error('Failed to update contact:', error);
      alert('Failed to update contact. Please try again.');
    }
  };

  const handleDeletePerson = async (personId: string) => {
    try {
      const response = await fetch(`/api/contacts/${personId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        const updatedContacts = contacts.filter(c => c.id !== personId);
        setContacts(updatedContacts);
        
        const updatedFiltered = filteredContacts.filter(c => c.id !== personId);
        setFilteredContacts(updatedFiltered);
        
        // Close the modal
        setSelectedPerson(null);
      }
    } catch (error) {
      console.error('Failed to delete contact:', error);
      alert('Failed to delete contact. Please try again.');
    }
  };

  const addNewProfession = (profession: string) => {
    if (!availableProfessions.includes(profession)) {
      const updated = [...availableProfessions, profession];
      setAvailableProfessions(updated);
      localStorage.setItem('professions', JSON.stringify(updated));
    }
  };

  const handleSchoolSelect = (school: string) => {
    setSearchValue(school);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-peach-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-peach-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-peach-600">My Contacts</h1>
              <p className="text-xs text-gray-600">Welcome, {userName}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-gray-700 hover:bg-peach-50 rounded-full transition-all duration-200 border border-peach-200 text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto w-full">
        {/* Search Section */}
        <div className="w-full bg-white rounded-3xl shadow-md p-3 sm:p-4 mb-4 border border-peach-100">
          <div className="flex flex-col gap-3">
            {/* Search Bar with Type Selector and View Toggle */}
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-start">
              {/* Search Type Selector */}
              <div className="flex-shrink-0">
                <select
                  value={searchType}
                  onChange={(e) => {
                    setSearchType(e.target.value as SearchType);
                    setSearchValue('');
                  }}
                  className="w-full sm:w-auto pl-3 pr-8 py-2 bg-peach-500 text-white rounded-full font-medium shadow-sm cursor-pointer outline-none hover:bg-peach-600 transition-all duration-200 text-sm appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%23fff%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.25rem_center] bg-no-repeat"
                >
                  <option value="name">Name</option>
                  <option value="dateOfBirth">Date of Birth</option>
                  <option value="school">School</option>
                  <option value="profession">Profession</option>
                </select>
              </div>

              {/* Search Input */}
              <div className="flex-1 flex gap-2">
                {searchType === 'dateOfBirth' ? (
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-peach-500" />
                    <input
                      type="date"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-peach-200 rounded-full focus:ring-2 focus:ring-peach-400 focus:border-peach-400 outline-none transition-all duration-200 text-sm text-gray-900"
                    />
                  </div>
                ) : (
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-peach-500" />
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder={`Search by ${searchType}...`}
                      className="w-full pl-9 pr-3 py-2 border border-peach-200 rounded-full focus:ring-2 focus:ring-peach-400 focus:border-peach-400 outline-none transition-all duration-200 text-sm text-gray-900"
                    />
                  </div>
                )}
                
                {/* View Toggle and Add Button */}
                <div className="flex gap-2 flex-shrink-0">
                  <div className="flex gap-1 border border-gray-200 rounded-full p-0.5">
                    <button
                      onClick={() => setViewMode('bubbles')}
                      className={`p-1.5 rounded-full transition-all duration-200 ${
                        viewMode === 'bubbles' ? 'bg-peach-500 text-white' : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-1.5 rounded-full transition-all duration-200 ${
                        viewMode === 'table' ? 'bg-peach-500 text-white' : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      title="Table View"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-sage-500 text-white rounded-full hover:bg-sage-600 transition-all duration-200 font-medium shadow-sm text-sm"
                    title="Add Contact"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* School Bubbles */}
            {searchType === 'school' && availableSchools.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-600 mb-2">Schools:</p>
                <div className="flex flex-wrap gap-1.5">
                  {availableSchools.map((school) => (
                    <button
                      key={school}
                      onClick={() => handleSchoolSelect(school)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        searchValue === school
                          ? 'bg-peach-500 text-white shadow-sm'
                          : 'bg-peach-100 text-peach-800 hover:bg-peach-200'
                      }`}
                    >
                      {school}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Profession Bubbles */}
            {searchType === 'profession' && availableProfessions.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-600 mb-2">Professions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {availableProfessions.map((profession) => (
                    <button
                      key={profession}
                      onClick={() => setSearchValue(profession)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        searchValue === profession
                          ? 'bg-sage-500 text-white shadow-sm'
                          : 'bg-sage-100 text-sage-800 hover:bg-sage-200'
                      }`}
                    >
                      {profession}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Active Search Indicator */}
            {searchValue && (
              <div className="flex items-center gap-2 px-3 py-1 bg-peach-100 rounded-full w-fit">
                <span className="text-xs font-medium text-gray-700">
                  {searchType}: {searchValue}
                </span>
                <button
                  onClick={() => setSearchValue('')}
                  className="hover:bg-peach-200 rounded-full p-0.5 transition-all duration-200"
                >
                  <svg className="w-3 h-3 text-peach-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contacts Display */}
        {viewMode === 'bubbles' ? (
          /* Bubble View */
          <div className="w-full max-w-4xl">
            {filteredContacts.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-peach-200 rounded-full mb-4">
                  <User className="w-10 h-10 text-peach-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No contacts found</h3>
                <p className="text-gray-500">
                  {contacts.length === 0 ? 'Add your first contact to get started!' : 'Try adjusting your search.'}
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 scrollbar-thin">
                {filteredContacts.map((contact, index) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedPerson(contact)}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-3 border border-peach-100 hover:border-peach-300 animate-slideUp cursor-pointer"
                    style={{ animationDelay: `${index * 20}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 bg-peach-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>

                      {/* Contact Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm text-gray-900 mb-1">{contact.name}</h3>
                        <div className="flex flex-wrap gap-1 mb-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-peach-50 text-peach-800 rounded-full text-[10px] font-medium">
                            <Calendar className="w-2.5 h-2.5" />
                            {contact.dateOfBirth}
                          </span>
                          {contact.school && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sage-50 text-sage-800 rounded-full text-[10px] font-medium">
                              <GraduationCap className="w-2.5 h-2.5" />
                              {contact.school}
                            </span>
                          )}
                          {contact.professions.slice(0, 2).map((profession) => (
                            <span
                              key={profession}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-sage-100 text-sage-800 rounded-full text-[10px] font-medium"
                            >
                              <Briefcase className="w-2.5 h-2.5" />
                              {profession}
                            </span>
                          ))}
                          {contact.professions.length > 2 && (
                            <span className="text-[10px] text-gray-500">+{contact.professions.length - 2}</span>
                          )}
                        </div>
                        
                        {/* Contact Details */}
                        {contact.contacts && contact.contacts.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-1">
                            {contact.contacts.slice(0, 2).map((contactInfo, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-800 rounded-full text-[10px] font-medium"
                              >
                                {contactInfo.type === 'email' ? (
                                  <Mail className="w-2.5 h-2.5" />
                                ) : (
                                  <Phone className="w-2.5 h-2.5" />
                                )}
                                <span className="truncate max-w-[100px]">{contactInfo.value}</span>
                              </span>
                            ))}
                            {contact.contacts.length > 2 && (
                              <span className="text-[10px] text-gray-500">+{contact.contacts.length - 2}</span>
                            )}
                          </div>
                        )}

                        {/* Social Media */}
                        {contact.socialMedia && contact.socialMedia.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {contact.socialMedia.slice(0, 3).map((social, idx) => (
                              <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-800 rounded-full text-[10px] font-medium hover:bg-purple-100 transition-colors"
                              >
                                <LinkIcon className="w-2.5 h-2.5" />
                                {social.platform}
                              </a>
                            ))}
                            {contact.socialMedia.length > 3 && (
                              <span className="text-[10px] text-gray-500">+{contact.socialMedia.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Table View */
          <div className="w-full bg-white rounded-4xl shadow-lg border border-peach-100 overflow-hidden">
            {filteredContacts.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-peach-200 rounded-full mb-4">
                  <User className="w-10 h-10 text-peach-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No contacts found</h3>
                <p className="text-gray-500">
                  {contacts.length === 0 ? 'Add your first contact to get started!' : 'Try adjusting your search.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <table className="w-full min-w-[768px]">
                  <thead className="bg-peach-100 border-b-2 border-peach-200">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-peach-800 whitespace-nowrap">Name</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-peach-800 whitespace-nowrap">Date of Birth</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-peach-800 whitespace-nowrap">Contact</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-peach-800 whitespace-nowrap">School</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-peach-800 whitespace-nowrap">Professions</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-peach-800 whitespace-nowrap">Social Media</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredContacts.map((contact, index) => (
                      <tr
                        key={contact.id}
                        onClick={() => setSelectedPerson(contact)}
                        className="hover:bg-peach-50 transition-colors duration-200 animate-fadeIn cursor-pointer"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-peach-400 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                              {contact.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-900 text-xs sm:text-sm">{contact.name}</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{contact.dateOfBirth}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="space-y-1">
                            {contact.contacts && contact.contacts.length > 0 ? (
                              contact.contacts.map((contactInfo, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-700">
                                  {contactInfo.type === 'email' ? (
                                    <Mail className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                  ) : (
                                    <Phone className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                  )}
                                  <span className="truncate max-w-[100px] sm:max-w-[120px]">{contactInfo.value}</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{contact.school || '-'}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex flex-wrap gap-1">
                            {contact.professions.length > 0 ? (
                              contact.professions.map((profession) => (
                                <span
                                  key={profession}
                                  className="px-2 py-0.5 sm:py-1 bg-sage-100 text-sage-800 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap"
                                >
                                  {profession}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex flex-wrap gap-1">
                            {contact.socialMedia && contact.socialMedia.length > 0 ? (
                              contact.socialMedia.map((social, idx) => (
                                <a
                                  key={idx}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-2 py-0.5 sm:py-1 bg-purple-100 text-purple-800 rounded-full text-[10px] sm:text-xs font-medium hover:bg-purple-200 transition-colors whitespace-nowrap"
                                >
                                  {social.platform}
                                </a>
                              ))
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Person Modal */}
      {showAddModal && (
        <AddPersonModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddContact}
          availableProfessions={availableProfessions}
          availableSchools={availableSchools}
          onAddNewProfession={addNewProfession}
        />
      )}

      {/* Person Profile Modal */}
      {selectedPerson && (
        <PersonProfileModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
          onUpdate={handleUpdatePerson}
          onDelete={handleDeletePerson}
        />
      )}
    </div>
  );
}
